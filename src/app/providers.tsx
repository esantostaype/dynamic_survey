'use client'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'
import { lightTheme } from '@/theme/lightTheme'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ToastNotification } from '@/components'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = prefersDarkMode ? darkTheme : lightTheme
  return (
    <>
    <ProgressBar color="var(--color-accent1)" options={{ showSpinner: false }}/>
    <ThemeProvider theme={ theme }>
      { children }
      <ToastNotification/>
    </ThemeProvider>
    </>
  )
}