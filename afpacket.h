#ifndef __AFPACKET_H__
#define __AFPACKET_H__

#include <linux/if_packet.h>
#include <stdatomic.h>
#include <stdint.h>
#include <sys/time.h>

struct afpacket_pkthdr {
    struct timeval ts;
    uint32_t caplen;
    uint32_t len;
};

typedef struct {
    int socket_fd;
    struct iovec* io;
} afpacket_t;

typedef void (*packet_handler)(uint8_t* const, struct afpacket_pkthdr const* const, uint8_t const* const);

afpacket_t* open_afpacket_socket(const char* name_of_device, int fanout_group_id);

void run_afpacket_loop(afpacket_t* handle, packet_handler callback, uint8_t* user_data);

void break_afpacket_loop();

void afpacket_close(afpacket_t* handle);

#endif /* __AFPACKET_H__ */