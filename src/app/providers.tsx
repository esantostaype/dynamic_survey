'use client'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'
import { lightTheme } from '@/theme/lightTheme'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = prefersDarkMode ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  )
}