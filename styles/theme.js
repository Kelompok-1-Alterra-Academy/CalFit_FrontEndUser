import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E97923',
    },
    secondary: {
      main: '#84B0BB',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      dark: '#111D2C',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Nunito', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '36px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '21px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 600,
    },
    subtitle3: {
      fontSize: '11px',
      fontWeight: 400,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    body3: {
      fontSize: "9px",
      fontWeight: 400,
    }
  },
});

export default theme;
