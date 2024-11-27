#include "collector_client.h"

#include <stdlib.h>
#include <unistd.h>

collector_client_t*
init_collector_client(const char* addr, const int port) {
    collector_client_t* handle = NULL;

    if (!(handle = (collector_client_t*)calloc(1, sizeof(collector_client_t)))) {
        return NULL;
    }

    if (!(handle->addr = (struct sockaddr_in*)calloc(1, sizeof(struct sockaddr_in)))) {
        free(handle);
        return NULL;
    }
    handle->addr->sin_addr.s_addr = inet_addr(addr);
    handle->addr->sin_port = htons(port);
    handle->addr->sin_family = AF_INET;

    if ((handle->socket_fd = socket(AF_INET, SOCK_DGRAM, 0)) == -1) {
        free(handle->addr);
        free(handle);
        return NULL;
    }

    return handle;
}

void
close_collector_client(collector_client_t* handle) {
    close(handle->socket_fd);
    free(handle->addr);
    free(handle);
}

void
send_to_collector_client(collector_client_t* handle, const char* message, uint32_t message_len) {
    sendto(handle->socket_fd, message, message_len, 0, (const struct sockaddr*)handle->addr,
           sizeof(struct sockaddr_in));
}