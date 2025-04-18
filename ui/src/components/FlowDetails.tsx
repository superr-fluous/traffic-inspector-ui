'use client';

import {
        Container,
        Paper,
        Typography,
        Chip,
        Box,
        Table,
        TableBody,
        TableRow,
        TableCell
} from '@mui/material';
import { FlowInfo } from '../types';
import {
        SwapHorizontalCircle as SwapIcon,
} from '@mui/icons-material';
import TrafficRatioBar from "./TrafficRatioBar"
import TlsDetails from "./TlsDetails"
import DnsDetails from './DnsDetails';
import ProtocolAnalysis from './ProtocolAnalysis';
import renderFlag from "../utils";

interface FlowDetailsProps {
        flow: FlowInfo;
}

export default function FlowDetails({ flow }: FlowDetailsProps) {
        return (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {/* Connection Flow Section */}
                        <TrafficRatioBar
                                source={flow.src_len_pkts}
                                destination={flow.dst_len_pkts}
                        />
                        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                                <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        flexWrap: 'wrap'
                                }}>
                                        {/* Source Block */}
                                        <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column-reverse',
                                                gap: 0.5,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                p: 1,
                                                bgcolor: 'background.paper',
                                                minWidth: 220,
                                                position: 'relative'
                                        }}>
                                                {/* Physical Layer (MAC) */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'grey.100',
                                                        border: '1px solid',
                                                        borderColor: 'grey.300',
                                                        borderRadius: 1
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Data Link Layer
                                                                </Typography>
                                                                <Chip label="MAC" size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                {flow.src_mac || '00:00:00:00:00:00'}
                                                        </Typography>
                                                </Box>

                                                {/* Network Layer (IP) */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'grey.50',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                        borderRadius: 1,
                                                        marginTop: -0.5,
                                                        zIndex: 1
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Network Layer
                                                                </Typography>
                                                                <Chip label={`IPv${flow.ipv}`} size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                {flow.src_ip}
                                                        </Typography>
                                                </Box>

                                                {/* Transport Layer */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'common.white',
                                                        border: '1px solid',
                                                        borderColor: 'grey.100',
                                                        borderRadius: 1,
                                                        marginTop: -0.5,
                                                        zIndex: 2
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Transport Layer
                                                                </Typography>
                                                                <Chip label={flow.proto} size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                Port: {flow.src_port}
                                                        </Typography>
                                                </Box>
                                        </Box>

                                        <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                flexDirection: { xs: 'column', md: 'row' }
                                        }}>
                                                {/* Source Country/ASN Table */}
                                                <Box sx={{
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1,
                                                        minWidth: 160,
                                                        textAlign: 'center'
                                                }}>
                                                        <Table size="small">
                                                                <TableBody>
                                                                        <TableRow>
                                                                                <TableCell sx={{
                                                                                        borderBottom: 'none',
                                                                                        py: 1,
                                                                                        textAlign: 'center',
                                                                                        verticalAlign: 'middle'
                                                                                }}>
                                                                                        <Box sx={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                gap: 1
                                                                                        }}>
                                                                                                {renderFlag(flow.src_country)}
                                                                                                <Typography variant="body2">
                                                                                                        {flow.src_country || 'N/A'}
                                                                                                </Typography>
                                                                                        </Box>
                                                                                </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                                <TableCell sx={{
                                                                                        py: 1,
                                                                                        textAlign: 'center',
                                                                                        verticalAlign: 'middle'
                                                                                }}>
                                                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                                                <Chip
                                                                                                        label={`${flow.src_as}`}
                                                                                                        size="small"
                                                                                                        sx={{
                                                                                                                fontFamily: 'monospace',
                                                                                                                maxWidth: '100%',
                                                                                                                display: 'flex',
                                                                                                                justifyContent: 'center'
                                                                                                        }}
                                                                                                />
                                                                                        </Box>
                                                                                </TableCell>
                                                                        </TableRow>
                                                                </TableBody>
                                                        </Table>
                                                </Box>

                                                <SwapIcon
                                                        color="action"
                                                        sx={{
                                                                fontSize: 40,
                                                                transform: 'rotate(90deg) scale(1.5)',
                                                                '@media (min-width: 600px)': {
                                                                        transform: 'rotate(0deg) scale(1.5)'
                                                                },
                                                                transition: 'transform 0.3s ease'
                                                        }}
                                                />

                                                {/* Destination Country/ASN Table */}
                                                <Box sx={{
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1,
                                                        minWidth: 160,
                                                        textAlign: 'center'
                                                }}>
                                                        <Table size="small">
                                                                <TableBody>
                                                                        <TableRow>
                                                                                <TableCell sx={{
                                                                                        borderBottom: 'none',
                                                                                        py: 1,
                                                                                        textAlign: 'center',
                                                                                        verticalAlign: 'middle'
                                                                                }}>
                                                                                        <Box sx={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                gap: 1
                                                                                        }}>
                                                                                                {renderFlag(flow.dst_country)}
                                                                                                <Typography variant="body2">
                                                                                                        {flow.dst_country || 'N/A'}
                                                                                                </Typography>
                                                                                        </Box>
                                                                                </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                                <TableCell sx={{
                                                                                        py: 1,
                                                                                        textAlign: 'center',
                                                                                        verticalAlign: 'middle'
                                                                                }}>
                                                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                                                <Chip
                                                                                                        label={`${flow.dst_as}`}
                                                                                                        size="small"
                                                                                                        sx={{
                                                                                                                fontFamily: 'monospace',
                                                                                                                maxWidth: '100%',
                                                                                                                display: 'flex',
                                                                                                                justifyContent: 'center'
                                                                                                        }}
                                                                                                />
                                                                                        </Box>
                                                                                </TableCell>
                                                                        </TableRow>
                                                                </TableBody>
                                                        </Table>
                                                </Box>
                                        </Box>


                                        <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column-reverse',
                                                gap: 0.5,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                p: 1,
                                                bgcolor: 'background.paper',
                                                minWidth: 220,
                                                position: 'relative'
                                        }}>
                                                {/* Physical Layer (MAC) */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'grey.100',
                                                        border: '1px solid',
                                                        borderColor: 'grey.300',
                                                        borderRadius: 1
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Data Link Layer
                                                                </Typography>
                                                                <Chip label="MAC" size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                {flow.dst_mac || '00:00:00:00:00:00'}
                                                        </Typography>
                                                </Box>

                                                {/* Network Layer (IP) */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'grey.50',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                        borderRadius: 1,
                                                        marginTop: -0.5,
                                                        zIndex: 1
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Network Layer
                                                                </Typography>
                                                                <Chip label={`IPv${flow.ipv}`} size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                {flow.dest_ip}
                                                        </Typography>
                                                </Box>

                                                {/* Transport Layer */}
                                                <Box sx={{
                                                        p: 1,
                                                        bgcolor: 'common.white',
                                                        border: '1px solid',
                                                        borderColor: 'grey.100',
                                                        borderRadius: 1,
                                                        marginTop: -0.5,
                                                        zIndex: 2
                                                }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                        Transport Layer
                                                                </Typography>
                                                                <Chip label={flow.proto} size="small" sx={{ ml: 1 }} />
                                                        </Box>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                                Port: {flow.dst_port}
                                                        </Typography>
                                                </Box>
                                        </Box>
                                </Box>
                        </Paper>

                        <ProtocolAnalysis
                                breed={flow.ndpi.breed}
                                proto={flow.ndpi.proto}
                                category={flow.ndpi.category}
                                hostname={flow.ndpi.hostname}
                                domainame={flow.ndpi.domainame}
                                encrypted={flow.ndpi.encrypted}
                                confidence={flow.ndpi.confidence}
                        />

                        {flow.ndpi.tls && (
                                <TlsDetails
                                        tls_details={flow.ndpi.tls}
                                />
                        )}

                        {flow.ndpi.dns && (
                                <DnsDetails
                                        dns_details={flow.ndpi.dns}
                                />
                        )}
                </Container>
        );
}