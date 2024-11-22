#include <getopt.h>
#include <signal.h>
#include <stdatomic.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <threads.h>
#include <unistd.h>

#include "ini.h"

#include "afpacket.h"
#include "ndpi_workflow.h"

#define MATCH(s, n) strcmp(section, s) == 0 && strcmp(name, n) == 0

const char* HELP = "TrafficInspector - simple packet inspection solution based on nDPI\n"
                   "\t-h           Help\n"
                   "\t-c path      Path to config file.\n";

typedef struct {
    uint8_t number_of_workers;
    char* name_of_device;
} config_t;

typedef struct {
    int thread_id;
    ndpi_workflow_t* workflow;
} worker_t;

static thrd_t* threads = NULL;
static worker_t* workers = NULL;

static atomic_bool shutdown_requested = false;

static int
run_worker(void* args) {
    worker_t* worker = (worker_t*)args;
    printf("Starting thread [%d]\n", worker->thread_id);
    run_afpacket_loop(worker->workflow->handle, ndpi_process_packet, (uint8_t*)worker->workflow);
    return 0;
}

static int
config_handler(void* user, const char* section, const char* name, const char* value) {
    config_t* config = (config_t*)user;
    if (MATCH("common", "workers")) {
        config->number_of_workers = atoi(value);
    } else if (MATCH("common", "device")) {
        config->name_of_device = strdup(value);
    } else {
        return -1;
    }
    return 1;
}

static void
sig_handler(int sig) {
    (void)sig;
    atomic_store(&shutdown_requested, true);
}

static int
setup_workers(config_t* config) {
    struct sigaction action;
    action.sa_handler = sig_handler;
    sigemptyset(&action.sa_mask);
    action.sa_flags = 0;
    sigaction(SIGINT, &action, NULL);

    if (!(threads = (thrd_t*)malloc(config->number_of_workers * sizeof(thrd_t)))) {
        fprintf(stderr, "Failed to allocate threads\n");
        return -1;
    }
    memset(threads, 0, config->number_of_workers * sizeof(thrd_t));

    if (!(workers = (worker_t*)malloc(config->number_of_workers * sizeof(worker_t)))) {
        free(threads);
        fprintf(stderr, "Failed to allocate workers\n");
        return -1;
    }
    memset(threads, 0, config->number_of_workers * sizeof(worker_t));

    for (int i = 0; i < config->number_of_workers; i++) {
        workers[i].thread_id = i;
        if (!(workers[i].workflow = init_workflow(config->name_of_device, config->number_of_workers))) {
            free(threads);
            free(workers);
            fprintf(stderr, "Failed to allocate workflow\n");
            return -1;
        }
    }

    for (int i = 0; i < config->number_of_workers; i++) {
        thrd_create(&threads[i], run_worker, &workers[i]);
    }
    return 0;
}

static void
stop_workers(config_t* config) {
    break_afpacket_loop();

    for (int i = 0; i < config->number_of_workers; i++) {
        thrd_join(threads[i], NULL);
        free_workflow(&workers[i].workflow);
    }
}

int
main(int argc, char** argv) {
    int option = -1;
    config_t config;
    char* path_to_config = NULL;

    while ((option = getopt(argc, argv, "hc:")) != -1) {
        switch (option) {
            case 'c': path_to_config = strdup(optarg); break;
            case 'h': printf("%s", HELP); return 0;
            case '?':
                if (optopt == 'c') {
                    fprintf(stderr, "Option -%c requires an argument.\n", optopt);
                } else {
                    fprintf(stderr, "Unknown option\n");
                }
                free(path_to_config);
                return 1;
        }
    }

    if (ini_parse(path_to_config, config_handler, &config) < 0) {
        fprintf(stderr, "Can't load '%s'.\n", path_to_config);
        free(path_to_config);
        return 1;
    }

    printf("Launching workers...\n");

    if (setup_workers(&config) == -1) {
        free(path_to_config);
        free(config.name_of_device);
        return 1;
    }

    while (!atomic_load(&shutdown_requested)) {
        sleep(1);
    }

    stop_workers(&config);

    free(path_to_config);
    free(config.name_of_device);
    return 0;
}