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
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Recent IP Activity
                </Typography>
                <TableContainer>
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
                                <TableRow key={row.id}>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>{row.ip}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.port}</TableCell>
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
