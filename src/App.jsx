import { useState } from 'react'
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
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Avatar,
  Alert,
  LinearProgress,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { 
  Sports, // Cambiado de SportsFootball a Sports
  EmojiEvents, 
  Flag, 
  Casino,
  People,
  TableChart,
  Celebration
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Tema futbolero con colores mejorados de Colombia
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Amarillo dorado más vibrante
      dark: '#a3a3a3ff', // Rojo más intenso
      light: '#FFF350', // Amarillo claro
    },
    secondary: {
      main: '#1976D2', // Azul más vibrante
      dark: '#0D47A1', // Azul oscuro
      light: '#42A5F5', // Azul claro
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

// Lista de países con sus banderas
const countries = [
  { name: 'Colombia', flag: '🇨🇴', code: 'CO' },
  { name: 'Bolivia', flag: '🇧🇴', code: 'BO' },
  { name: 'Argentina', flag: '🇦🇷', code: 'AR' },
  { name: 'Brasil', flag: '🇧🇷', code: 'BR' },
  { name: 'Chile', flag: '🇨🇱', code: 'CL' },
  { name: 'Ecuador', flag: '🇪🇨', code: 'EC' },
  { name: 'Paraguay', flag: '🇵🇾', code: 'PY' },
  { name: 'Perú', flag: '🇵🇪', code: 'PE' },
  { name: 'Uruguay', flag: '🇺🇾', code: 'UY' },
  { name: 'Venezuela', flag: '🇻🇪', code: 'VE' },
  { name: 'España', flag: '🇪🇸', code: 'ES' },
  { name: 'Francia', flag: '🇫🇷', code: 'FR' },
  { name: 'Alemania', flag: '🇩🇪', code: 'DE' },
  { name: 'Italia', flag: '🇮🇹', code: 'IT' },
  { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
  { name: 'Inglaterra', flag: '🏴', code: 'GB' },
  { name: 'México', flag: '🇲🇽', code: 'MX' },
  { name: 'Estados Unidos', flag: '🇺🇸', code: 'US' },
  { name: 'Canadá', flag: '🇨🇦', code: 'CA' },
  { name: 'Costa Rica', flag: '🇨🇷', code: 'CR' }
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
  
  // Estados para equipos personalizables
  const [team1, setTeam1] = useState(countries.find(c => c.code === 'CO'))
  const [team2, setTeam2] = useState(countries.find(c => c.code === 'BO'))
  const [showTeamConfig, setShowTeamConfig] = useState(false)
  const [customTeam1, setCustomTeam1] = useState({ name: '', flag: '' })
  const [customTeam2, setCustomTeam2] = useState({ name: '', flag: '' })
  const [showCustomTeam1, setShowCustomTeam1] = useState(false)
  const [showCustomTeam2, setShowCustomTeam2] = useState(false)

  const steps = ['Configuración', 'Jugadores', 'Resultados', 'Ganador']

  const handleSetPlayers = () => {
    const num = parseInt(numPlayers)
    if (num > 0 && num <= possibleResults.length) {
      // Mezclar los resultados para asegurar que sean únicos
      const shuffledResults = [...possibleResults].sort(() => Math.random() - 0.5)
      setAvailableResults(shuffledResults.slice(0, num))
      setStep(1)
    }
  }

  const generateUniqueResult = () => {
    if (availableResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableResults.length)
      const selectedResult = availableResults[randomIndex]
      // Remover el resultado seleccionado de los disponibles
      setAvailableResults(prev => prev.filter((_, index) => index !== randomIndex))
      return selectedResult
    }
    return possibleResults[Math.floor(Math.random() * possibleResults.length)]
  }

  const handleAddPlayer = async () => {
    if (currentPlayerName.trim()) {
      setShowRandomizing(true)
      setRandomizingPlayer(currentPlayerName)
      
      // Simular efecto de aleatorio
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const result = generateUniqueResult()
      const newPlayer = {
        name: currentPlayerName,
        prediction: result
      }
      
      setPlayers([...players, newPlayer])
      setCurrentPlayerName('')
      setCurrentPlayerIndex(currentPlayerIndex + 1)
      setShowRandomizing(false)
      
      if (currentPlayerIndex + 1 >= parseInt(numPlayers)) {
        setStep(2)
      }
    }
  }

  const handleFinalResult = () => {
    if (finalResult) {
      const gameWinners = players.filter(player => player.prediction === finalResult)
      setWinners(gameWinners)
      setStep(3)
    }
  }

  const handleCustomTeam1Save = () => {
    if (customTeam1.name && customTeam1.flag) {
      setTeam1({ 
        name: customTeam1.name, 
        flag: customTeam1.flag, 
        code: 'CUSTOM1' 
      })
      setShowCustomTeam1(false)
      setCustomTeam1({ name: '', flag: '' })
    }
  }

  const handleCustomTeam2Save = () => {
    if (customTeam2.name && customTeam2.flag) {
      setTeam2({ 
        name: customTeam2.name, 
        flag: customTeam2.flag, 
        code: 'CUSTOM2' 
      })
      setShowCustomTeam2(false)
      setCustomTeam2({ name: '', flag: '' })
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
    setShowTeamConfig(false)
    setShowCustomTeam1(false)
    setShowCustomTeam2(false)
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
          
          {/* Botón para cambiar equipos */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowTeamConfig(true)}
            sx={{ mt: 2 }}
            startIcon={<Flag />}
          >
            Cambiar Equipos
          </Button>
        </Box>

        {/* Sección de Enfrentamiento Visual */}
        <Card sx={{ mb: 4, bgcolor: 'background.paper', boxShadow: 3 }}>
          <CardContent sx={{ py: 3 }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              {/* Equipo Local */}
              <Grid item xs={12} sm={5}>
                <Box textAlign="center">
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                      lineHeight: 1,
                      mb: 2,
                      textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    {team1.flag}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.dark" mb={1}>
                    {team1.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Local
                  </Typography>
                </Box>
              </Grid>

              {/* VS en el centro */}
              <Grid item xs={12} sm={2}>
                <Box 
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography 
                    variant="h3" 
                    fontWeight="bold" 
                    color="secondary.main"
                    sx={{ 
                      textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                      mb: 1
                    }}
                  >
                    VS
                  </Typography>
                  <Sports color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </Grid>

              {/* Equipo Visitante */}
              <Grid item xs={12} sm={5}>
                <Box textAlign="center">
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                      lineHeight: 1,
                      mb: 2,
                      textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    {team2.flag}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.dark" mb={1}>
                    {team2.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Visitante
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>        {/* Stepper */}
        <Box mb={4}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Avatar
                      sx={{
                        bgcolor: completed ? 'primary.dark' : active ? 'primary.main' : 'grey.300',
                        color: completed || active ? 'white' : 'grey.500',
                        width: 40,
                        height: 40
                      }}
                    >
                      {index === 0 && <People />}
                      {index === 1 && <Flag />}
                      {index === 2 && <TableChart />}
                      {index === 3 && <Celebration />}
                    </Avatar>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Paso 1: Configuración */}
        {step === 0 && (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" mb={3} color="primary.dark">
                ¿Cuántos jugadores van a participar?
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Máximo {possibleResults.length} jugadores (cada uno tendrá un resultado único)
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <TextField
                  type="number"
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(e.target.value)}
                  placeholder="Ingresa el número de jugadores"
                  inputProps={{ min: 1, max: possibleResults.length }}
                  sx={{ width: 300 }}
                  variant="outlined"
                  helperText={`Entre 1 y ${possibleResults.length} jugadores`}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSetPlayers}
                  disabled={!numPlayers || parseInt(numPlayers) <= 0 || parseInt(numPlayers) > possibleResults.length}
                  startIcon={<People />}
                >
                  Continuar
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Registrar jugadores */}
        {step === 1 && (
          <Card>
            <CardContent sx={{ py: 4 }}>
              <Typography variant="h5" mb={3} textAlign="center" color="primary.dark">
                Registrar Jugador {currentPlayerIndex + 1} de {numPlayers}
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                🎯 Cada jugador recibirá un resultado único. ¡No habrá predicciones repetidas!
              </Alert>
              
              <LinearProgress 
                variant="determinate" 
                value={(currentPlayerIndex / parseInt(numPlayers)) * 100} 
                sx={{ mb: 3, height: 8, borderRadius: 4 }}
              />

              <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <TextField
                  value={currentPlayerName}
                  onChange={(e) => setCurrentPlayerName(e.target.value)}
                  placeholder={`Nombre del jugador ${currentPlayerIndex + 1}`}
                  sx={{ width: 400 }}
                  variant="outlined"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddPlayer}
                  disabled={!currentPlayerName.trim()}
                  startIcon={<Casino />}
                >
                  Asignar Resultado Aleatorio
                </Button>
              </Box>

              {/* Jugadores ya registrados */}
              {players.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>Jugadores Registrados:</Typography>
                  <Grid container spacing={2}>
                    {players.map((player, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined">
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {player.name}
                            </Typography>
                            <Chip 
                              label={player.prediction} 
                              color="secondary" 
                              size="small"
                              sx={{ 
                                mt: 1,
                                fontWeight: 'bold',
                                color: 'white'
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Tabla de resultados */}
        {step === 2 && (
          <Box>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" mb={3} textAlign="center" color="primary.dark">
                  Tabla de Predicciones
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                          Jugador
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }} align="center">
                          Predicción
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {players.map((player, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                {player.name.charAt(0)}
                              </Avatar>
                              {player.name}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={player.prediction} 
                              color="secondary" 
                              variant="filled"
                              sx={{ 
                                fontWeight: 'bold',
                                color: 'white',
                                minWidth: 60
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" mb={3} color="primary.dark">
                  ¿Cuál fue el resultado final del partido?
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Formato: {team1.name} - {team2.name} (ej: 2-1)
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                  <TextField
                    value={finalResult}
                    onChange={(e) => setFinalResult(e.target.value)}
                    placeholder="Ej: 2-1"
                    sx={{ width: 200 }}
                    variant="outlined"
                    helperText={`${team1.flag} ${team1.name} vs ${team2.name} ${team2.flag}`}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleFinalResult}
                    disabled={!finalResult}
                    startIcon={<EmojiEvents />}
                  >
                    Ver Ganador(es)
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Paso 4: Ganador */}
        {step === 3 && (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" mb={3} color="primary.dark">
                🏆 RESULTADOS FINALES 🏆
              </Typography>
              
              <Box mb={4}>
                <Typography variant="h6" mb={2}>
                  Resultado Final {team1.flag} {team1.name} vs {team2.name} {team2.flag}: 
                  <Chip label={finalResult} color="primary" size="large" sx={{ ml: 1 }} />
                </Typography>
              </Box>

              {winners.length > 0 ? (
                <Box>
                  <Typography variant="h5" mb={3} color="secondary.main">
                    ¡Felicidades a {winners.length === 1 ? 'el ganador' : 'los ganadores'}!
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    {winners.map((winner, index) => (
                      <Grid item key={index}>
                        <Card sx={{ bgcolor: 'success.light', minWidth: 200, boxShadow: 3 }}>
                          <CardContent sx={{ textAlign: 'center' }}>
                            <EmojiEvents sx={{ fontSize: 40, color: 'success.dark', mb: 1 }} />
                            <Typography variant="h6" fontWeight="bold" color="success.dark">
                              {winner.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Predicción: {winner.prediction}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Alert severity="info" sx={{ mb: 3 }}>
                  No hubo ganadores esta vez. ¡Mejor suerte la próxima!
                </Alert>
              )}

              <Box mt={4}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={resetGame}
                  startIcon={<Sports />}
                >
                  Nueva Polla
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Dialog de randomización */}
        <Dialog open={showRandomizing} maxWidth="sm" fullWidth>
          <DialogTitle textAlign="center">
            <Casino sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">
              Asignando resultado a {randomizingPlayer}...
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" mb={3}>
              🎲 Generando predicción aleatoria...
            </Typography>
            <LinearProgress color="primary" />
          </DialogContent>
        </Dialog>

        {/* Dialog de configuración de equipos */}
        <Dialog open={showTeamConfig} maxWidth="md" fullWidth>
          <DialogTitle textAlign="center">
            <Flag sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5">
              Configurar Equipos
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" mb={2} textAlign="center">
                  Equipo Local
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h3">{team1.flag}</Typography>
                  <Autocomplete
                    value={team1}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setTeam1(newValue)
                      }
                    }}
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography sx={{ mr: 2, fontSize: '1.5rem' }}>
                          {option.flag}
                        </Typography>
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccionar equipo local"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    sx={{ width: '100%' }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowCustomTeam1(true)}
                    sx={{ mt: 1 }}
                  >
                    Crear Equipo Personalizado
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" mb={2} textAlign="center">
                  Equipo Visitante
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h3">{team2.flag}</Typography>
                  <Autocomplete
                    value={team2}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setTeam2(newValue)
                      }
                    }}
                    options={countries.filter(country => country.code !== team1.code)}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography sx={{ mr: 2, fontSize: '1.5rem' }}>
                          {option.flag}
                        </Typography>
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccionar equipo visitante"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    sx={{ width: '100%' }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowCustomTeam2(true)}
                    sx={{ mt: 1 }}
                  >
                    Crear Equipo Personalizado
                  </Button>
                </Box>
              </Grid>
            </Grid>
            
            <Box textAlign="center" mt={3}>
              <Alert severity="info">
                💡 Los resultados se interpretan como: {team1.name} - {team2.name}
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button 
              onClick={() => setShowTeamConfig(false)}
              variant="outlined"
              size="large"
            >
              Cancelar
            </Button>
            <Button 
              onClick={() => setShowTeamConfig(false)}
              variant="contained"
              size="large"
              startIcon={<Sports />}
            >
              Confirmar Equipos
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para crear equipo personalizado 1 */}
        <Dialog open={showCustomTeam1} maxWidth="sm" fullWidth>
          <DialogTitle textAlign="center">
            <Typography variant="h6">
              Crear Equipo Local Personalizado
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={3} py={2}>
              <TextField
                label="Nombre del equipo"
                value={customTeam1.name}
                onChange={(e) => setCustomTeam1({...customTeam1, name: e.target.value})}
                placeholder="Ej: Real Madrid"
                fullWidth
              />
              <TextField
                label="Bandera/Emoji"
                value={customTeam1.flag}
                onChange={(e) => setCustomTeam1({...customTeam1, flag: e.target.value})}
                placeholder="Ej: ⚽ 🔥 🏆 o cualquier emoji"
                fullWidth
                helperText="Puedes usar emojis, símbolos o caracteres especiales"
              />
              {customTeam1.flag && (
                <Box textAlign="center">
                  <Typography variant="h2">{customTeam1.flag}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vista previa
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCustomTeam1(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCustomTeam1Save}
              variant="contained"
              disabled={!customTeam1.name || !customTeam1.flag}
            >
              Guardar Equipo
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para crear equipo personalizado 2 */}
        <Dialog open={showCustomTeam2} maxWidth="sm" fullWidth>
          <DialogTitle textAlign="center">
            <Typography variant="h6">
              Crear Equipo Visitante Personalizado
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={3} py={2}>
              <TextField
                label="Nombre del equipo"
                value={customTeam2.name}
                onChange={(e) => setCustomTeam2({...customTeam2, name: e.target.value})}
                placeholder="Ej: Barcelona"
                fullWidth
              />
              <TextField
                label="Bandera/Emoji"
                value={customTeam2.flag}
                onChange={(e) => setCustomTeam2({...customTeam2, flag: e.target.value})}
                placeholder="Ej: ⚽ 🔥 🏆 o cualquier emoji"
                fullWidth
                helperText="Puedes usar emojis, símbolos o caracteres especiales"
              />
              {customTeam2.flag && (
                <Box textAlign="center">
                  <Typography variant="h2">{customTeam2.flag}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vista previa
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCustomTeam2(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCustomTeam2Save}
              variant="contained"
              disabled={!customTeam2.name || !customTeam2.flag}
            >
              Guardar Equipo
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  )
}

export default App
