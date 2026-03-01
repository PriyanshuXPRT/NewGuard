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
        <Card sx={{ 
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Network Traffic
                </Typography>
                <Box sx={{ flexGrow: 1, minHeight: 0, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis 
                                dataKey="time" 
                                stroke="rgba(255,255,255,0.5)" 
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                            />
                            <YAxis 
                                stroke="rgba(255,255,255,0.5)" 
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: '#112240', 
                                    border: 'none', 
                                    borderRadius: 8, 
                                    color: '#fff' 
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="inbound" 
                                stroke="#ff0000" 
                                strokeWidth={3} 
                                dot={false} 
                                activeDot={{ r: 8 }} 
                                name="Inbound"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="outbound" 
                                stroke="#6c757d" 
                                strokeWidth={3} 
                                dot={false} 
                                activeDot={{ r: 8 }}
                                name="Outbound"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TrafficChart;