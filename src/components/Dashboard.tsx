import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Dashboard</Typography>
      <Typography variant="body1">This area is protected and only visible to authenticated users.</Typography>
    </Box>
  )
}

export default Dashboard
