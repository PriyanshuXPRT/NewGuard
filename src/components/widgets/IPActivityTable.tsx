import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

interface IPActivity {
    id: string;
    ip: string;
    location: string;
    port: number;
    status: string;
}

interface IPActivityTableProps {
    data: IPActivity[];
}

const IPActivityTable: React.FC<IPActivityTableProps> = ({ data }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'allowed': return 'success';
            case 'suspicious': return 'warning';
            case 'blocked': return 'error';
            default: return 'default';
        }
    };

    return (
        <Card sx={{ 
            height: '100%', 
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Recent IP Activity
                </Typography>
                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Port</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem', py: 1.5 }}>{row.ip}</TableCell>
                                    <TableCell sx={{ py: 1.5 }}>{row.location}</TableCell>
                                    <TableCell sx={{ py: 1.5 }}>{row.port}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            color={getStatusColor(row.status) as any}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default IPActivityTable;