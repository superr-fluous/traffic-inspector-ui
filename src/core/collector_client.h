#ifndef __COLLECTOR_CLIENT__
#define __COLLECTOR_CLIENT__

#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>

typedef struct {
    int socket_fd;
    struct sockaddr_in* addr;
} collector_client_t;

collector_client_t* init_collector_client(const char* addr, const int port);

void close_collector_client(collector_client_t* handle);

void send_to_collector(collector_client_t* handle, const char* message, uint32_t message_len);

#endif /* __COLLECTOR_CLIENT__ */