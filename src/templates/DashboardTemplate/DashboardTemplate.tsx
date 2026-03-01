import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Refresh as RefreshIcon, Computer, GppBad, Warning, Speed } from '@mui/icons-material';

// Import widgets
import MetricCard from '../../components/widgets/MetricCard';
import TrafficChart from '../../components/widgets/TrafficChart';
import IPActivityTable from '../../components/widgets/IPActivityTable';
import AlertWidget from '../../components/widgets/AlertWidget';

// Import services
import {
    generateTrafficData,
    generateIPActivity,
    generateAlerts,
    getDashboardSummary
} from '../../services/mockData';

// Types
interface TrafficData {
    time: string;
    inbound: number;
    outbound: number;
}

interface IPActivity {
    id: string;
    ip: string;
    location: string;
    port: number;
    status: string;
}

interface Alert {
    id: string;
    title: string;
    severity: string;
    timestamp: string;
}

interface DashboardSummary {
    systems: number;
    blockedIps: number;
    activeThreats: number;
    totalTraffic: string;
}

interface DashboardData {
    summary: DashboardSummary;
    traffic: TrafficData[];
    ipActivity: IPActivity[];
    alerts: Alert[];
}

const DashboardTemplate: React.FC = () => {
    const [data, setData] = useState<DashboardData>({
        summary: getDashboardSummary(),
        traffic: generateTrafficData(),
        ipActivity: generateIPActivity(6),
        alerts: generateAlerts(5)
    });

    const handleRefresh = () => {
        setData({
            summary: getDashboardSummary(),
            traffic: generateTrafficData(),
            ipActivity: generateIPActivity(6),
            alerts: generateAlerts(5)
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleRefresh();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 1,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 4 },
                boxSizing: 'border-box',
                overflow: 'auto',
                background: 'rgba(255, 255, 255, 0.01)',
                
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                boxShadow: '0 16px 64px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    Security Overview
                </Typography>
                <Button
                    startIcon={<RefreshIcon />}
                    variant="outlined"
                    onClick={handleRefresh}
                    size="small"
                >
                    Refresh Data
                </Button>
            </Box>

            {/* First Row - 4 Metric Cards */}
            <Grid
                container
                spacing={4}
                sx={{ mb: 4, width: '100%', flexWrap: 'wrap' }}
            >
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%', position: 'relative', zIndex: 2, minHeight: 140 }}>
                        <MetricCard
                            title="Connected Systems"
                            value={data.summary.systems}
                            icon={<Computer fontSize="large" />}
                            color="primary.main"
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%', position: 'relative', zIndex: 2, minHeight: 140 }}>
                        <MetricCard
                            title="Blocked Threats"
                            value={data.summary.blockedIps}
                            icon={<GppBad fontSize="large" />}
                            color="error.main"
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%', position: 'relative', zIndex: 2, minHeight: 140 }}>
                        <MetricCard
                            title="Active Alerts"
                            value={data.summary.activeThreats}
                            icon={<Warning fontSize="large" />}
                            color="warning.main"
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%', position: 'relative', zIndex: 2, minHeight: 140 }}>
                        <MetricCard
                            title="Total Traffic (24h)"
                            value={data.summary.totalTraffic}
                            icon={<Speed fontSize="large" />}
                            color="secondary.main"
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Second Row - Traffic Chart + Alert Widget */}
            <Grid
                container
                spacing={4}
                sx={{ mb: 4, width: '100%' }}
                alignItems="stretch"
            >
                {/* Traffic Chart - 75% */}
                <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 400, md: 480 },
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <TrafficChart data={data.traffic} />
                    </Box>
                </Grid>

                {/* Alert Widget - 25% */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 400, md: 480 },
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <AlertWidget alerts={data.alerts} />
                    </Box>
                </Grid>
            </Grid>

            {/* Third Row - IP Activity Table */}
            <Grid container spacing={4} sx={{ width: '100%', mb: 3 }}>
                <Grid size={{ xs: 12 }}>
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: 400,
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <IPActivityTable data={data.ipActivity} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardTemplate;