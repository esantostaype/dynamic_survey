'use client'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <ThemeProvider theme={ darkTheme }>
      { children }
    </ThemeProvider>
  )
}