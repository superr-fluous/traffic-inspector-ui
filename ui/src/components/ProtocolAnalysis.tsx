import { Paper, Grid, Typography, Chip } from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';
import SectionHeader from "./common";

const ProtocolAnalysis = ({ breed, proto, category, hostname, domainame, encrypted, confidence }: {
        breed: string,
        proto: string,
        category: string,
        hostname: string,
        domainame: string,
        encrypted: number,
        confidence: { [key: string]: string }
}) => {
        return (
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                        <SectionHeader icon={SecurityIcon} title="Protocol Analysis" />

                        <Grid container spacing={2}>
                                {/* Protocol */}
                                <Grid item xs={6} sm={4} md={2}>
                                        <Typography variant="caption" color="text.secondary">
                                                Protocol
                                        </Typography>
                                        <Chip
                                                label={proto}
                                                size="small"
                                                color={proto === "Unknown" ? "error" : "primary"}
                                                sx={{
                                                        mt: 0.5,
                                                        width: '100%',
                                                        ...(proto === "Unknown" && {
                                                                backgroundColor: 'error.main',
                                                                color: 'error.contrastText'
                                                        })
                                                }}
                                        />
                                </Grid>

                                {/* Breed */}
                                <Grid item xs={6} sm={4} md={2}>
                                        <Typography variant="caption" color="text.secondary">
                                                Breed
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
                                                {breed}
                                        </Typography>
                                </Grid>

                                {/* Category */}
                                <Grid item xs={6} sm={4} md={2}>
                                        <Typography variant="caption" color="text.secondary">
                                                Category
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
                                                {category}
                                        </Typography>
                                </Grid>

                                {/* Confidence */}
                                {confidence &&
                                        <Grid item xs={6} sm={4} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                        Confidence
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                        {Object.values(confidence)[0]}
                                                </Typography>
                                        </Grid>
                                }
                                {/* Hostname */}
                                {hostname && (
                                        <Grid item xs={6} sm={4} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                        Hostname
                                                </Typography>
                                                <Typography
                                                        variant="body2"
                                                        sx={{
                                                                mt: 0.5,
                                                                wordBreak: 'break-word'
                                                        }}
                                                >
                                                        {hostname}
                                                </Typography>
                                        </Grid>
                                )}

                                {/* Domain */}
                                {domainame && (
                                        <Grid item xs={6} sm={4} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                        Domain
                                                </Typography>
                                                <Typography
                                                        variant="body2"
                                                        sx={{
                                                                mt: 0.5,
                                                                wordBreak: 'break-word'
                                                        }}
                                                >
                                                        {domainame}
                                                </Typography>
                                        </Grid>
                                )}

                                {/* Encrypted */}
                                <Grid item xs={6} sm={4} md={2}>
                                        <Typography variant="caption" color="text.secondary">
                                                Encrypted
                                        </Typography>
                                        <Chip
                                                label={encrypted ? 'Yes' : 'No'}
                                                size="small"
                                                color={encrypted ? 'success' : 'error'}
                                                sx={{
                                                        mt: 0.5,
                                                        width: '100%'
                                                }}
                                        />
                                </Grid>
                        </Grid>
                </Paper>
        );
};

export default ProtocolAnalysis;