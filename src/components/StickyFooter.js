import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import logo_discord from '../images/logo_discord.png';
import logo_twitter from '../images/logo_twitter.png';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      📜 Scroll Kingdoms
      {' '}
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Link color="inherit" href="https://twitter.com/ScrollKingdoms" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem" }}><img src={logo_twitter} alt="twitter" width="35px" /></Link>
              <Link color="inherit" href="https://discord.gg/NX3qZuAFvG" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem" }}><img src={logo_discord} alt="discord" width="35px" /></Link>
            </div>
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}