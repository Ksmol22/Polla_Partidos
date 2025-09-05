import React, { useState } from 'react'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box, 
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Alert
} from '@mui/material'
import { 
  Sports, 
  EmojiEvents, 
  Casino,
  People
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Tema futbolero con colores de Colombia
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Amarillo dorado
      dark: '#FFA000',
      light: '#FFF350',
    },
    secondary: {
      main: '#1976D2', // Azul
      dark: '#0D47A1',
      light: '#42A5F5',
    },
    success: {
      main: '#4CAF50',
      dark: '#388E3C',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        }
      }
    }
  }
})

// Posibles resultados del partido
const possibleResults = [
  '0-0', '1-0', '2-0', '3-0', '4-0', '5-0',
  '0-1', '1-1', '2-1', '3-1', '4-1', '5-1',
  '0-2', '1-2', '2-2', '3-2', '4-2', '5-2',
  '0-3', '1-3', '2-3', '3-3', '4-3', '5-3',
  '0-4', '1-4', '2-4', '3-4', '4-4', '5-4',
  '0-5', '1-5', '2-5', '3-5', '4-5', '5-5'
]

function App() {
  const [step, setStep] = useState(0)
  const [numPlayers, setNumPlayers] = useState('')
  const [players, setPlayers] = useState([])
  const [currentPlayerName, setCurrentPlayerName] = useState('')
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [finalResult, setFinalResult] = useState('')
  const [winners, setWinners] = useState([])
  const [showRandomizing, setShowRandomizing] = useState(false)
  const [randomizingPlayer, setRandomizingPlayer] = useState('')
  const [availableResults, setAvailableResults] = useState([...possibleResults])
  
  const team1 = { name: 'Colombia', flag: '🇨🇴' }
  const team2 = { name: 'Bolivia', flag: '🇧🇴' }

  const steps = ['Configuración', 'Jugadores', 'Resultados', 'Ganador']

  const handleSetPlayers = () => {
    const num = parseInt(numPlayers)
    if (num > 0 && num <= 36) {
      setStep(1)
    }
  }

  const generateUniqueResult = () => {
    if (availableResults.length === 0) {
      setAvailableResults([...possibleResults])
      return possibleResults[Math.floor(Math.random() * possibleResults.length)]
    }
    
    const randomIndex = Math.floor(Math.random() * availableResults.length)
    const result = availableResults[randomIndex]
    setAvailableResults(prev => prev.filter((_, index) => index !== randomIndex))
    return result
  }

  const handleAddPlayer = async () => {
    if (currentPlayerName.trim()) {
      setShowRandomizing(true)
      setRandomizingPlayer(currentPlayerName)
      
      // Simular randomización
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const result = generateUniqueResult()
      const newPlayer = {
        name: currentPlayerName.trim(),
        result: result
      }
      
      setPlayers(prev => [...prev, newPlayer])
      setCurrentPlayerName('')
      setCurrentPlayerIndex(prev => prev + 1)
      setShowRandomizing(false)
      setRandomizingPlayer('')
      
      if (currentPlayerIndex + 1 >= parseInt(numPlayers)) {
        setStep(2)
      }
    }
  }

  const handleFinalResult = () => {
    if (finalResult) {
      const gameWinners = players.filter(player => player.result === finalResult)
      setWinners(gameWinners)
      setStep(3)
    }
  }

  const resetGame = () => {
    setStep(0)
    setNumPlayers('')
    setPlayers([])
    setCurrentPlayerName('')
    setCurrentPlayerIndex(0)
    setFinalResult('')
    setWinners([])
    setAvailableResults([...possibleResults])
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" fontWeight="bold" color="primary" mb={2}>
            {team1.flag} {team1.name.toUpperCase()} vs {team2.name.toUpperCase()} {team2.flag}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Esto es aleatorio asi que no llore si no gana 😂
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
            <Sports color="primary" fontSize="large" />
            <EmojiEvents color="secondary" fontSize="large" />
            <Sports color="primary" fontSize="large" />
          </Box>
        </Box>

        {/* Stepper */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Step 0: Configuración */}
        {step === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <People sx={{ verticalAlign: 'middle', mr: 1 }} />
                Configuración del Juego
              </Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Número de jugadores"
                  type="number"
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(e.target.value)}
                  inputProps={{ min: 1, max: 36 }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSetPlayers}
                  disabled={!numPlayers || parseInt(numPlayers) <= 0 || parseInt(numPlayers) > 36}
                  size="large"
                  fullWidth
                >
                  Iniciar Juego
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Registro de Jugadores */}
        {step === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Jugador {currentPlayerIndex + 1} de {numPlayers}
              </Typography>
              
              {showRandomizing ? (
                <Box textAlign="center" py={4}>
                  <Casino sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6">
                    Asignando resultado a {randomizingPlayer}...
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <TextField
                    label="Nombre del jugador"
                    value={currentPlayerName}
                    onChange={(e) => setCurrentPlayerName(e.target.value)}
                    fullWidth
                    sx={{ mb: 3 }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddPlayer}
                    disabled={!currentPlayerName.trim()}
                    size="large"
                    fullWidth
                  >
                    Asignar Resultado
                  </Button>
                </Box>
              )}

              {players.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Jugadores Registrados:
                  </Typography>
                  <Grid container spacing={2}>
                    {players.map((player, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Chip
                          label={`${player.name}: ${player.result}`}
                          color="primary"
                          sx={{ width: '100%', justifyContent: 'space-between' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Resultado Final */}
        {step === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1 }} />
                Resultado Final del Partido
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Resultado final (ej: 2-1)"
                  value={finalResult}
                  onChange={(e) => setFinalResult(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                  placeholder="0-0"
                />
                <Button
                  variant="contained"
                  onClick={handleFinalResult}
                  disabled={!finalResult}
                  size="large"
                  fullWidth
                >
                  Ver Ganadores
                </Button>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Todos los Resultados:
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Jugador</TableCell>
                        <TableCell>Resultado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {players.map((player, index) => (
                        <TableRow key={index}>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>{player.result}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Ganadores */}
        {step === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom textAlign="center">
                🎉 ¡Resultados! 🎉
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Resultado final: {finalResult}
                </Typography>
              </Alert>

              {winners.length > 0 ? (
                <Box>
                  <Typography variant="h6" gutterBottom color="success.main">
                    🏆 ¡Ganadores!
                  </Typography>
                  {winners.map((winner, index) => (
                    <Chip
                      key={index}
                      label={winner.name}
                      color="success"
                      size="large"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              ) : (
                <Alert severity="warning">
                  No hubo ganadores para este resultado.
                </Alert>
              )}

              <Box mt={4}>
                <Button
                  variant="contained"
                  onClick={resetGame}
                  size="large"
                  fullWidth
                >
                  Nuevo Juego
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
