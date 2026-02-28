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
                return <Error color="error" />;
            case 'medium':
                return <Warning color="warning" />;
            default:
                return <Info color="info" />;
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Recent Alerts
                </Typography>
                <List sx={{ pt: 0 }}>
                    {alerts.map((alert) => (
                        <ListItem key={alert.id} disablePadding sx={{ mb: 2 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
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
