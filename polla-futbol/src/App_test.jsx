import React from 'react'
import { Typography, Container, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700',
    },
    secondary: {
      main: '#1976D2',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center">
          <Typography variant="h3" component="h1" color="primary">
            🇨🇴 COLOMBIA vs BOLIVIA 🇧🇴
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
            ¡Aplicación funcionando correctamente!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
