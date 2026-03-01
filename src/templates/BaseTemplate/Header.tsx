import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Badge, 
    Box, 
    Tabs, 
    Tab, 
    useMediaQuery, 
    useTheme,
    Menu,
    MenuItem,
    Container
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    AccountCircle,
    Menu as MenuIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const navigationItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Network Traffic', path: '/NetworkTraffic' },
    { label: 'Security Events', path: '/events' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Settings', path: '/settings' },
];

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
    
    const currentTabIndex = navigationItems.findIndex(item => item.path === location.pathname);
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        navigate(navigationItems[newValue].path);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = (path?: string) => {
        setMobileMenuAnchor(null);
        if (path) {
            navigate(path);
        }
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1, 
                backgroundColor: 'background.paper',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component="div" 
                        sx={{ 
                            flexGrow: 0,
                            mr: 4,
                            color: 'primary.main', 
                            fontWeight: 'bold',
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        NetGuard Security
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMobileMenuOpen}
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                noWrap 
                                component="div" 
                                sx={{ 
                                    flexGrow: 1,
                                    color: 'primary.main', 
                                    fontWeight: 'bold',
                                    display: { xs: 'block', md: 'none' }
                                }}
                            >
                                NetGuard
                            </Typography>
                            <Menu
                                anchorEl={mobileMenuAnchor}
                                open={Boolean(mobileMenuAnchor)}
                                onClose={() => handleMobileMenuClose()}
                                sx={{ mt: 2 }}
                            >
                                {navigationItems.map((item) => (
                                    <MenuItem 
                                        key={item.path} 
                                        onClick={() => handleMobileMenuClose(item.path)}
                                        selected={location.pathname === item.path}
                                        sx={{
                                            minWidth: 200,
                                            '&.Mui-selected': {
                                                backgroundColor: 'rgba(0, 230, 118, 0.1)',
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Tabs 
                                value={currentTabIndex === -1 ? 0 : currentTabIndex} 
                                onChange={handleTabChange}
                                sx={{
                                    '& .MuiTab-root': {
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        '&.Mui-selected': {
                                            color: 'primary.main',
                                        },
                                    },
                                }}
                            >
                                {navigationItems.map((item) => (
                                    <Tab key={item.path} label={item.label} />
                                ))}
                            </Tabs>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" edge="end" color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;