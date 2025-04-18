'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FlowInfo } from '../../../types';
import FlowDetails from '../../../components/FlowDetails';
import { CircularProgress, Alert, Container, Box, Typography } from '@mui/material';

export default function FlowDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [flow, setFlow] = useState<FlowInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlowDetails = async () => {
    try {
      const res = await fetch(`http://192.168.10.1:8000/api/v1/flows/${id}`);
      if (!res.ok) throw new Error('Flow not found');
      const data = await res.json();
      setFlow(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flow details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowDetails();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(fetchFlowDetails, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" mt={3} color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!flow) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">No data found</Alert>
      </Container>
    );
  }

  return <FlowDetails flow={flow} />;
}