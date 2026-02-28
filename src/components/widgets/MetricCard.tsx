import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, color = 'primary.main' }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography color="text.secondary" gutterBottom variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" sx={{ color: color, mt: 1, display: 'block' }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: '50%',
                            p: 1.5,
                            display: 'flex',
                            color: color
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
