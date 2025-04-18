'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Box,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '../types';
import renderFlag from "../utils";
import categoryColors from 'src/consts';

interface FlowTableProps {
  response: ApiResponse;
  onPageChange: (page: number) => void;
}



const FlowsTable: React.FC<FlowTableProps> = ({ response, onPageChange }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(response.pagination.current_page);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (newPage >= 1 && newPage <= response.pagination.total_pages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Network Flows
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Last Seen</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Protocol</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response.data.map((flow) => (
              <TableRow
                key={flow.id}
                hover
                onClick={() => router.push(`/flows/${flow.id}`)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{flow.last_seen}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderFlag(flow.src_country)}
                    <Typography>{flow.src_ip}:{flow.src_port}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderFlag(flow.dst_country)}
                    <Typography>{flow.dst_ip}:{flow.dst_port}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{flow.protocol}</TableCell>
                <TableCell>
                  <Chip
                    label={flow.category}
                    sx={{
                      backgroundColor: categoryColors[flow.category] || '#e0e0e0',
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': {
                        opacity: 0.9
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <Pagination
          count={response.pagination.total_pages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FlowsTable;