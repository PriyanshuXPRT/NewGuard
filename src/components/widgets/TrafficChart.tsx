import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrafficData {
    time: string;
    inbound: number;
    outbound: number;
}

interface TrafficChartProps {
    data: TrafficData[];
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
    return (
        <Card sx={{ height: '100%', minHeight: 350 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                    Network Traffic
                </Typography>
                <Box sx={{ flexGrow: 1, mt: 2, minHeight: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#112240', border: 'none', borderRadius: 8, color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="inbound" stroke="#00e676" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="outbound" stroke="#2979ff" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TrafficChart;
