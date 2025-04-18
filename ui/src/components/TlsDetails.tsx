import {
        Paper,
        Grid,
        List,
        ListItem,
        ListItemText,
        Chip
} from '@mui/material';

import {
        Lock as LockIcon,
} from '@mui/icons-material';

import { TlsInfo } from "../types";
import SectionHeader from "./common"

const TlsDetails = ({ tls_details }: {
        tls_details: TlsInfo
}) => {
        return (
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                        <SectionHeader icon={LockIcon} title="TLS Details" />
                        <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                        <List dense>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="Version"
                                                                secondary={tls_details.version}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="JA3S"
                                                                secondary={tls_details.ja3s}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="JA4"
                                                                secondary={tls_details.ja4}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="Unsafe Cipher"
                                                                secondary={
                                                                        <Chip
                                                                                label={tls_details.unsafe_cipher ? 'Yes' : 'No'}
                                                                                size="small"
                                                                                color={tls_details.unsafe_cipher ? 'error' : 'success'}
                                                                        />
                                                                }
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                        </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                        <List dense>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="Cipher"
                                                                secondary={tls_details.cipher}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="Advertised ALPNs"
                                                                secondary={tls_details.advertised_alpns}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                                <ListItem>
                                                        <ListItemText
                                                                primary="TLS Supported Versions"
                                                                secondary={tls_details.tls_supported_versions}
                                                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                                        />
                                                </ListItem>
                                        </List>
                                </Grid>
                        </Grid>
                </Paper>
        );
};

export default TlsDetails;