import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DFF7D',
    }
  },
  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
  }
})