import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface BaseTemplateProps {
    children: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header onMenuClick={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` },
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default BaseTemplate;
