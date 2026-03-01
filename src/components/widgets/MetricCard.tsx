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
        <Card sx={{ 
            height: '100%', 
            minHeight: 140,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box>
                        <Typography color="text.secondary" gutterBottom variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: '2rem' }}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" sx={{ color: color, mt: 2, display: 'block', fontSize: '0.75rem' }}>
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