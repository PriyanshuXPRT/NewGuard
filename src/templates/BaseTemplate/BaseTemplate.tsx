import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import LetterGlitch from '../../components/LetterGlitch';

interface BaseTemplateProps {
    children: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
    return (
        <Box sx={{ 
            position: 'relative',
            minHeight: '100vh', 
            width: '100%'
        }}>
            {/* Background Glitch Effect */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                backgroundColor: '#000000'
            }}>
                <LetterGlitch
                    glitchColors={['#ff0000', '#cc0000', '#990000', '#ff3333', '#ff6666']}
                    glitchSpeed={40}
                    centerVignette={false}
                    outerVignette={true}
                    smooth={true}
                    characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()"
                />
            </Box>

            {/* Header - Higher z-index */}
            <Header />

            {/* Main Content - Higher z-index with semi-transparent background */}
            <Box
                component="main"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    flexGrow: 1,
                    p: { xs: 3, md: 4 },
                    width: '100%',
                    maxWidth: '1800px',
                    margin: '0 auto',
                    minHeight: '100vh',
                }}
            >
                <Toolbar /> {/* This creates space for the fixed header */}
                {children}
            </Box>
        </Box>
    );
};

export default BaseTemplate;