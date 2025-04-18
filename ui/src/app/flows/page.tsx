'use client';

import { useEffect, useState } from 'react';
import FlowsTable from '@components/FlowsTable';
import { ApiResponse } from '../../types';
import {
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

export default function HomePage() {
  const [flowsData, setFlowsData] = useState<ApiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (page: number) => {
    try {
      const res = await fetch(`http://192.168.10.1:8000/api/v1/flows/all?page=${page}&limit=20`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data: ApiResponse = await res.json();
      console.log('Data received:', data);
      setFlowsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(currentPage);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  if (!flowsData) return (
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

  return (
    <div className="container mx-auto p-4">
      {isLoading && <div className="text-center my-4">Updating data...</div>}
      <FlowsTable
        response={flowsData}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}