import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000', // Bright red for primary actions
      light: '#ff3333',
      dark: '#cc0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d', // Gray for secondary actions
      light: '#868e96',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc3545', // Red for errors
    },
    warning: {
      main: '#ffc107', // Amber for warnings
    },
    info: {
      main: '#17a2b8', // Teal for info
    },
    success: {
      main: '#28a745', // Green for success
    },
    background: {
      default: '#000000', // Pure black background
      paper: '#111111', // Slightly lighter black for cards/surfaces
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0b0b0', // Light gray for secondary text
      disabled: '#6c757d',
    },
    divider: '#333333', // Dark gray dividers
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(255, 0, 0, 0.15)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.05)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#333333 #000000",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#000000",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#333333",
            minHeight: 24,
            border: "2px solid #000000",
            transition: 'background-color 0.2s ease-in-out',
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#ff0000",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#ff0000",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#111111',
          borderBottom: '1px solid #333333',
          boxShadow: 'none',
          transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111111',
          borderRadius: 8,
          border: '1px solid #333333',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: '#ff0000',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 12px -1px rgba(255, 0, 0, 0.2), 0 4px 8px -1px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          backgroundColor: '#ff0000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#cc0000',
            boxShadow: '0 4px 8px -2px rgba(255, 0, 0, 0.4)',
          },
        },
        outlinedPrimary: {
          borderColor: '#ff0000',
          color: '#ff0000',
          '&:hover': {
            borderColor: '#cc0000',
            backgroundColor: 'rgba(255, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#ff0000',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        root: {
          transition: 'background-color 0.3s ease-in-out',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
          '&.Mui-selected': {
            color: '#ff0000',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3)',
          },
        },
        colorSuccess: {
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          color: '#28a745',
          borderColor: '#28a745',
          '&:hover': {
            backgroundColor: 'rgba(40, 167, 69, 0.15)',
          },
        },
        colorError: {
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          color: '#dc3545',
          borderColor: '#dc3545',
          '&:hover': {
            backgroundColor: 'rgba(220, 53, 69, 0.15)',
          },
        },
        colorWarning: {
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          color: '#ffc107',
          borderColor: '#ffc107',
          '&:hover': {
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
          },
        },
        colorInfo: {
          backgroundColor: 'rgba(23, 162, 184, 0.1)',
          color: '#17a2b8',
          borderColor: '#17a2b8',
          '&:hover': {
            backgroundColor: 'rgba(23, 162, 184, 0.15)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #333333',
          transition: 'background-color 0.2s ease-in-out',
        },
        head: {
          fontWeight: 600,
          color: '#ffffff',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.15)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          transition: 'color 0.2s ease-in-out',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#ff0000',
          color: '#ffffff',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#333333',
          transition: 'border-color 0.3s ease-in-out',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#111111',
          border: '1px solid #333333',
          color: '#ffffff',
          fontSize: '0.75rem',
          transition: 'opacity 0.2s ease-in-out',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111111',
          border: '1px solid #333333',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.15)',
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          transition: 'transform 0.2s ease-in-out',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          transition: 'color 0.2s ease-in-out',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          transition: 'color 0.2s ease-in-out',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          transition: 'transform 0.3s ease-in-out',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          transition: 'stroke-dashoffset 0.3s ease-in-out',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
});

export default theme;