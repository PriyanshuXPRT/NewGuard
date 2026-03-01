import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

interface Alert {
    id: string;
    title: string;
    severity: string;
    timestamp: string;
}

interface AlertWidgetProps {
    alerts: Alert[];
}

const AlertWidget: React.FC<AlertWidgetProps> = ({ alerts }) => {
    const getSeverityIcon = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'critical':
            case 'high':
                return <Error sx={{ color: '#ff0000' }} />;
            case 'medium':
                return <Warning sx={{ color: '#ffc107' }} />;
            default:
                return <Info sx={{ color: '#17a2b8' }} />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'critical':
            case 'high':
                return '#ff0000';
            case 'medium':
                return '#ffc107';
            default:
                return '#17a2b8';
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
                    Recent Alerts
                </Typography>
                <List sx={{ pt: 0 }}>
                    {alerts.map((alert) => (
                        <ListItem 
                            key={alert.id} 
                            disablePadding 
                            sx={{ 
                                mb: 3,
                                borderLeft: `3px solid ${getSeverityColor(alert.severity)}`,
                                pl: 2,
                                borderRadius: '0 4px 4px 0',
                                py: 1
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 48 }}>
                                {getSeverityIcon(alert.severity)}
                            </ListItemIcon>
                            <ListItemText
                                primary={alert.title}
                                secondary={new Date(alert.timestamp).toLocaleTimeString()}
                                primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                secondaryTypographyProps={{ variant: 'caption' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default AlertWidget;