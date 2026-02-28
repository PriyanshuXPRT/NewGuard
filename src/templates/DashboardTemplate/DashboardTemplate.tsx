import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Refresh as RefreshIcon, Computer, GppBad, Warning, Speed } from '@mui/icons-material';
import MetricCard from '../../components/widgets/MetricCard';
import TrafficChart from '../../components/widgets/TrafficChart';
import IPActivityTable from '../../components/widgets/IPActivityTable';
import AlertWidget from '../../components/widgets/AlertWidget';
import {
    generateTrafficData,
    generateIPActivity,
    generateAlerts,
    getDashboardSummary
} from '../../services/mockData';

const DashboardTemplate: React.FC = () => {
    const [data, setData] = useState({
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
        }, 30000); // 30s auto-refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
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

            <Grid container spacing={3}>
                {/* Metric Cards */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Connected Systems"
                        value={data.summary.systems}
                        icon={<Computer fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Blocked Threats"
                        value={data.summary.blockedIps}
                        icon={<GppBad fontSize="large" />}
                        color="error.main"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Active Alerts"
                        value={data.summary.activeThreats}
                        icon={<Warning fontSize="large" />}
                        color="warning.main"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Total Traffic (24h)"
                        value={data.summary.totalTraffic}
                        icon={<Speed fontSize="large" />}
                        color="secondary.main"
                    />
                </Grid>

                {/* Charts and Tables */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <TrafficChart data={data.traffic} />
                </Grid>
                <Grid size={{ xs: 12, lg: 4 }}>
                    <AlertWidget alerts={data.alerts} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <IPActivityTable data={data.ipActivity} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardTemplate;
