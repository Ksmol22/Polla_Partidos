import { Box, Typography } from '@mui/material'

const FlagDisplay = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      gap={3}
      sx={{ 
        py: 2,
        '& .flag': {
          fontSize: '3rem',
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.78)'
        }
      }}
    >
      <Box textAlign="center">
        <div className="flag">🇨🇴</div>
        <Typography variant="h6" fontWeight="bold" color="primary.dark">
          COLOMBIA
        </Typography>
      </Box>
      
      <Typography variant="h4" color="text.secondary" sx={{ mx: 2 }}>
        VS
      </Typography>
      
      <Box textAlign="center">
        <div className="flag">🇧🇴</div>
        <Typography variant="h6" fontWeight="bold" color="secondary.main">
          BOLIVIA
        </Typography>
      </Box>
    </Box>
  )
}

export default FlagDisplay
