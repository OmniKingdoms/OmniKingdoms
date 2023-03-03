import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        📜 Scroll Kingdoms 📜
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" sx={{ marginTop: "0.5rem", marginBottom: "1rem" }} >
            Built by <Link color="inherit" href="https://twitter.com/kyle_corsola" target="_blank" rel="noopener noreferrer">Kyle Corsola</Link> and <Link color="inherit" href="https://twitter.com/sov3333" target="_blank" rel="noopener noreferrer">SOV3</Link> at ETH Denver 2023
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}