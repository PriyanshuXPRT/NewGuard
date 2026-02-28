// src/pages/NetworkTraffic.tsx
import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Tooltip,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Download as DownloadIcon,
    Timeline as TimelineIcon,
    TableChart as TableChartIcon,
    TableRows as TableIcon,
    Block as BlockIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon
} from '@mui/icons-material';

// Import widgets
import TrafficChart from '../components/widgets/TrafficChart';
import MetricCard from '../components/widgets/MetricCard';

// Mock data services (replace with actual API calls)
import { generateTrafficData, generateTopTalkers, generateProtocolData } from '../services/mockTrafficData';

// Types
interface TrafficFlow {
    id: string;
    sourceIP: string;
    destinationIP: string;
    protocol: string;
    bytes: number;
    packets: number;
    startTime: string;
    endTime: string;
    status: 'allowed' | 'blocked' | 'suspicious';
}

interface TopTalker {
    ip: string;
    bytes: number;
    packets: number;
    flows: number;
    threats: number;
    status: 'normal' | 'suspicious' | 'blocked';
}

interface ProtocolData {
    protocol: string;
    percentage: number;
    bytes: number;
    color: string;
}

const NetworkTraffic: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
    const [timeRange, setTimeRange] = useState('1h');
    const [searchTerm, setSearchTerm] = useState('');
    const [protocolFilter, setProtocolFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [trafficData, setTrafficData] = useState<any[]>([]);
    const [topTalkers, setTopTalkers] = useState<TopTalker[]>([]);
    const [protocolDistribution, setProtocolDistribution] = useState<ProtocolData[]>([]);
    const [flows, setFlows] = useState<TrafficFlow[]>([]);
    const [metrics, setMetrics] = useState({
        totalBandwidth: '0 Mbps',
        activeConnections: 0,
        packetsPerSecond: 0,
        threatsBlocked: 0
    });

    // Generate mock flow data
    const generateFlows = (): TrafficFlow[] => {
        const protocols = ['TCP', 'UDP', 'ICMP', 'HTTPS', 'DNS', 'SSH'];
        const statuses: ('allowed' | 'blocked' | 'suspicious')[] = ['allowed', 'blocked', 'suspicious'];
        
        return Array.from({ length: 20 }, (_, i) => ({
            id: `flow-${i}`,
            sourceIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            destinationIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            protocol: protocols[Math.floor(Math.random() * protocols.length)],
            bytes: Math.floor(Math.random() * 1000000),
            packets: Math.floor(Math.random() * 10000),
            startTime: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
            endTime: new Date().toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        }));
    };

    const fetchTrafficData = async () => {
        setLoading(true);
        try {
            // Simulate API calls - replace with actual API endpoints
            setTimeout(() => {
                setTrafficData(generateTrafficData(timeRange));
                setTopTalkers(generateTopTalkers());
                setProtocolDistribution(generateProtocolData());
                setFlows(generateFlows());
                setMetrics({
                    totalBandwidth: '1.2 Gbps',
                    activeConnections: 1543,
                    packetsPerSecond: 45000,
                    threatsBlocked: 23
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching traffic data:', error);
            setLoading(false);
        }
    };

    // Fetch data on component mount and when filters change
    useEffect(() => {
        fetchTrafficData();
    }, [timeRange, protocolFilter, statusFilter]);

    // Filter flows based on search and filters
    const filteredFlows = flows.filter(flow => {
        const matchesSearch = searchTerm === '' || 
            flow.sourceIP.includes(searchTerm) || 
            flow.destinationIP.includes(searchTerm);
        const matchesProtocol = protocolFilter === 'all' || flow.protocol === protocolFilter;
        const matchesStatus = statusFilter === 'all' || flow.status === statusFilter;
        return matchesSearch && matchesProtocol && matchesStatus;
    });

    // Handle block IP
    const handleBlockIP = (ip: string) => {
        console.log(`Blocking IP: ${ip}`);
        // Implement API call to block IP
    };

    // Export traffic data
    const handleExport = () => {
        const dataStr = JSON.stringify(flows, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `traffic-data-${new Date().toISOString()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Get status chip color
    const getStatusChip = (status: string) => {
        switch(status) {
            case 'allowed':
                return <Chip size="small" icon={<CheckCircleIcon />} label="Allowed" color="success" variant="outlined" />;
            case 'blocked':
                return <Chip size="small" icon={<BlockIcon />} label="Blocked" color="error" variant="outlined" />;
            case 'suspicious':
                return <Chip size="small" icon={<WarningIcon />} label="Suspicious" color="warning" variant="outlined" />;
            default:
                return <Chip size="small" label={status} />;
        }
    };

    // Format bytes to human readable
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header with actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Network Traffic Analysis
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={fetchTrafficData}
                        disabled={loading}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={handleExport}
                    >
                        Export
                    </Button>
                </Box>
            </Box>

            {/* Filters Bar */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search IP addresses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Time Range</InputLabel>
                            <Select
                                value={timeRange}
                                label="Time Range"
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <MenuItem value="15m">Last 15 minutes</MenuItem>
                                <MenuItem value="1h">Last hour</MenuItem>
                                <MenuItem value="6h">Last 6 hours</MenuItem>
                                <MenuItem value="24h">Last 24 hours</MenuItem>
                                <MenuItem value="7d">Last 7 days</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Protocol</InputLabel>
                            <Select
                                value={protocolFilter}
                                label="Protocol"
                                onChange={(e) => setProtocolFilter(e.target.value)}
                            >
                                <MenuItem value="all">All Protocols</MenuItem>
                                <MenuItem value="TCP">TCP</MenuItem>
                                <MenuItem value="UDP">UDP</MenuItem>
                                <MenuItem value="ICMP">ICMP</MenuItem>
                                <MenuItem value="HTTPS">HTTPS</MenuItem>
                                <MenuItem value="DNS">DNS</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="allowed">Allowed</MenuItem>
                                <MenuItem value="blocked">Blocked</MenuItem>
                                <MenuItem value="suspicious">Suspicious</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <ToggleButtonGroup
                            size="small"
                            value={viewMode}
                            exclusive
                            onChange={(_, value) => value && setViewMode(value)}
                        >
                            <ToggleButton value="chart">
                                <Tooltip title="Chart View">
                                    <TableChartIcon />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="table">
                                <Tooltip title="Table View">
                                    <TableIcon />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Paper>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Total Bandwidth"
                        value={metrics.totalBandwidth}
                        icon={<TimelineIcon />}
                        color="#00e676"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Active Connections"
                        value={metrics.activeConnections.toLocaleString()}
                        icon={<TimelineIcon />}
                        color="#00e676"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Packets/sec"
                        value={metrics.packetsPerSecond.toLocaleString()}
                        icon={<TimelineIcon />}
                        color="#00e676"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Threats Blocked"
                        value={metrics.threatsBlocked.toString()}
                        icon={<WarningIcon />}
                        color="#ff4444"
                    />
                </Grid>
            </Grid>

            {/* Traffic Chart and Protocol Distribution */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Traffic Overview
                        </Typography>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <TrafficChart data={trafficData} />
                        )}
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Protocol Distribution
                        </Typography>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box>
                                {protocolDistribution.map((proto) => (
                                    <Box key={proto.protocol} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">{proto.protocol}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {proto.percentage}% ({formatBytes(proto.bytes)})
                                            </Typography>
                                        </Box>
                                        <Box sx={{ width: '100%', bgcolor: 'background.default', borderRadius: 1, height: 8 }}>
                                            <Box
                                                sx={{
                                                    width: `${proto.percentage}%`,
                                                    bgcolor: proto.color,
                                                    height: 8,
                                                    borderRadius: 1,
                                                    transition: 'width 0.5s'
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Top Talkers */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Top Talkers
                        </Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>IP Address</TableCell>
                                        <TableCell align="right">Traffic</TableCell>
                                        <TableCell align="right">Packets</TableCell>
                                        <TableCell align="right">Flows</TableCell>
                                        <TableCell align="right">Threats</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {topTalkers.map((talker) => (
                                        <TableRow key={talker.ip} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontFamily="monospace">
                                                    {talker.ip}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">{formatBytes(talker.bytes)}</TableCell>
                                            <TableCell align="right">{talker.packets.toLocaleString()}</TableCell>
                                            <TableCell align="right">{talker.flows}</TableCell>
                                            <TableCell align="right">
                                                {talker.threats > 0 ? (
                                                    <Chip 
                                                        size="small" 
                                                        label={talker.threats} 
                                                        color="error" 
                                                        variant="outlined"
                                                    />
                                                ) : (
                                                    talker.threats
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusChip(talker.status)}</TableCell>
                                            <TableCell>
                                                {talker.status !== 'blocked' && (
                                                    <Tooltip title="Block IP">
                                                        <IconButton 
                                                            size="small" 
                                                            color="error"
                                                            onClick={() => handleBlockIP(talker.ip)}
                                                        >
                                                            <BlockIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Traffic Flows Table */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                                Live Traffic Flows
                            </Typography>
                            <Chip 
                                label={`${filteredFlows.length} flows`} 
                                size="small" 
                                variant="outlined" 
                            />
                        </Box>
                        
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Source IP</TableCell>
                                            <TableCell>Destination IP</TableCell>
                                            <TableCell>Protocol</TableCell>
                                            <TableCell align="right">Bytes</TableCell>
                                            <TableCell align="right">Packets</TableCell>
                                            <TableCell>Duration</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredFlows.map((flow) => {
                                            const duration = ((new Date(flow.endTime).getTime() - new Date(flow.startTime).getTime()) / 1000).toFixed(0);
                                            
                                            return (
                                                <TableRow key={flow.id} hover>
                                                    <TableCell>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                            {flow.sourceIP}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" fontFamily="monospace">
                                                            {flow.destinationIP}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip 
                                                            size="small" 
                                                            label={flow.protocol} 
                                                            variant="outlined"
                                                            sx={{ 
                                                                backgroundColor: flow.protocol === 'TCP' ? '#1976d2' : 
                                                                               flow.protocol === 'UDP' ? '#ed6c02' : 
                                                                               flow.protocol === 'ICMP' ? '#9c27b0' : '#2e7d32',
                                                                color: 'white',
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">{formatBytes(flow.bytes)}</TableCell>
                                                    <TableCell align="right">{flow.packets.toLocaleString()}</TableCell>
                                                    <TableCell>{duration}s</TableCell>
                                                    <TableCell>{getStatusChip(flow.status)}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="View Details">
                                                            <IconButton size="small">
                                                                <SearchIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        {flow.status !== 'blocked' && (
                                                            <Tooltip title="Block Source IP">
                                                                <IconButton 
                                                                    size="small" 
                                                                    color="error"
                                                                    onClick={() => handleBlockIP(flow.sourceIP)}
                                                                >
                                                                    <BlockIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        
                        {filteredFlows.length === 0 && !loading && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                No traffic flows match your filters.
                            </Alert>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NetworkTraffic;