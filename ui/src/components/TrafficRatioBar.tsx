import { Box, Typography, Tooltip } from '@mui/material';

const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${value} ${sizes[i]}`;
};

const TrafficRatioBar = ({ source, destination }: {
        source: number;
        destination: number;
}) => {
        const total = source + destination;
        const sourceWidth = total > 0 ? (source / total) * 100 : 50;
        const destWidth = total > 0 ? (destination / total) * 100 : 50;

        return (
                <Box sx={{
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2,
                        bgcolor: 'background.paper'
                }}>
                        {/* Progress Bar Container */}
                        <Tooltip title={`Source: ${source} Bytes | Destination: ${destination} Bytes`}>
                                <Box sx={{
                                        height: 24,
                                        borderRadius: 12,
                                        bgcolor: 'grey.200',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: 1
                                }}>
                                        {/* Source Part */}
                                        <Box sx={{
                                                width: `${sourceWidth}%`,
                                                height: '100%',
                                                bgcolor: 'primary.main',
                                                position: 'absolute',
                                                left: 0,
                                                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                pr: 2
                                        }}>
                                                {sourceWidth > 12 && (
                                                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                {sourceWidth.toFixed(1)}%
                                                        </Typography>
                                                )}
                                        </Box>

                                        {/* Destination Part */}
                                        <Box sx={{
                                                width: `${destWidth}%`,
                                                height: '100%',
                                                bgcolor: 'secondary.main',
                                                position: 'absolute',
                                                right: 0,
                                                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                pl: 2
                                        }}>
                                                {destWidth > 12 && (
                                                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                {destWidth.toFixed(1)}%
                                                        </Typography>
                                                )}
                                        </Box>
                                </Box>
                        </Tooltip>

                        {/* Labels Container */}
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                                gap: 2
                        }}>
                                <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="body2" color="primary" fontWeight="bold">
                                                Source
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                                {formatBytes(source)}
                                        </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                                Total
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                                {formatBytes(total)}
                                        </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="body2" color="secondary" fontWeight="bold">
                                                Destination
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                                {formatBytes(destination)}
                                        </Typography>
                                </Box>
                        </Box>
                </Box>
        );
};

export default TrafficRatioBar;