import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Merriweather Sans', 'Arial', sans-serif",
    htmlFontSize: 10,
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#E48826",
      light: "#F58B00"
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Merriweather Sans', 'Arial', sans-serif",
          fontSize: 14,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '1.4rem',
          padding: '1rem',
          boxShadow: '0.2rem 0.2rem 0.55rem 0.1rem rgba(0, 0, 0, 0.12)',
          overflow: 'hidden'
        }
      }
    }
  },
});

export default theme;

