import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Security as SecurityIcon,
    Public as PublicIcon,
    Warning as WarningIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Network Traffic', icon: <PublicIcon />, path: '/NetworkTraffic' },
    { text: 'Security Events', icon: <SecurityIcon />, path: '/events' },
    { text: 'Alerts', icon: <WarningIcon />, path: '/alerts' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const drawer = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto', mt: 2 }}>
                <List>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    selected={isSelected}
                                    onClick={() => {
                                        navigate(item.path);
                                        onClose();
                                    }}
                                    sx={{
                                        mx: 2,
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(0, 230, 118, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 230, 118, 0.2)',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: isSelected ? 'primary.main' : 'inherit', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isSelected ? 600 : 400,
                                            color: isSelected ? 'primary.main' : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(255, 255, 255, 0.12)' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
