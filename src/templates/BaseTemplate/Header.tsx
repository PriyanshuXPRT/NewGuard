import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle
} from '@mui/icons-material';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper' }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
                    NetGuard Security
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="large" aria-label="show 4 new notifications" color="inherit">
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
