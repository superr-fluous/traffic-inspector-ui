#ifndef __NDPI_WORKFLOW_H__
#define __NDPI_WORKFLOW_H__

#include <ndpi_api.h>
#include <ndpi_main.h>
#include <ndpi_typedefs.h>

#include "afpacket.h"

typedef struct {
    afpacket_t* handle;
    ndpi_serializer json_serializer;
    uint64_t packets_captured;
    uint64_t packets_processed;
    uint64_t total_l4_data_len;
    uint64_t detected_flow_protocols;
    uint8_t number_of_threads;

    uint64_t last_idle_scan_time;
    uint64_t last_time;

    void** ndpi_flows_active;
    uint64_t max_active_flows;
    uint64_t cur_active_flows;
    uint64_t total_active_flows;

    void** ndpi_flows_idle;
    uint64_t max_idle_flows;
    uint64_t cur_idle_flows;
    uint64_t total_idle_flows;

    struct ndpi_detection_module_struct* ndpi_struct;
} ndpi_workflow_t;

ndpi_workflow_t* init_workflow(const char* name_of_device, int fanout_group_id);
void free_workflow(ndpi_workflow_t** const workflow);
void ndpi_process_packet(uint8_t* const args, struct afpacket_pkthdr const* const header, uint8_t const* const packet);

#endif /* __NDPI_WORKFLOW_H__ */