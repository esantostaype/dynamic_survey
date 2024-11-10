import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00e260',
    }
  },
  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
  }
})