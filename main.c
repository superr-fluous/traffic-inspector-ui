#include "ini.h"

#include <stdio.h>
#include <stdlib.h>
#include <threads.h>
#include <stdint.h>
#include <unistd.h>
#include <getopt.h>
#include <string.h>

typedef struct {
        uint8_t number_of_workers;
        const char *name_of_device;
} config_t;

void run_workers(void *arg) {

}

static int config_handler(void *user, const char *section, const char *name, const char *value) {
        config_t* config = (config_t*)user;
        #define MATCH(s, n) strcmp(section, s) == 0 && strcmp(name, n) == 0
        if (MATCH("common", "workers")) {
                config ->number_of_workers = atoi(value);
        } else if (MATCH("common", "device")) {
                config->name_of_device = strdup(value);
        } else {
                return -1;
        }
        return 1;
}

const char *HELP =
        "TrafficInspector - simple packet inspection solution based on nDPI\n"
        "\t-h           Help\n"
        "\t-c path      Path to config file.\n";

int main(int argc, char **argv) {
        int option = -1;
        config_t config;
        char *path_to_config = NULL;

        while ((option = getopt (argc, argv, "hc:")) != -1)
        {
                switch (option)
                {
                case 'c':
                        path_to_config = strdup(optarg);
                        break;
                case 'h':
                        printf("%s", HELP);
                        free(path_to_config);
                        return 0;
                case '?':
                        if (optopt == 'c') {
                                fprintf (stderr, "Option -%c requires an argument.\n", optopt);
                        } else {
                                fprintf(stderr, "Unknown option\n");
                        }
                        return 1;
                }
        }

        if (ini_parse(path_to_config, config_handler, &config) < 0) {
                fprintf (stderr, "Can't load '%s'.\n", path_to_config);
                free(path_to_config);
                return 1;
        }

        free(path_to_config);
        return 0;
}