import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CastleIcon from '@mui/icons-material/Castle';
import Link from '@mui/material/Link';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const pages = [
    // { name: 'Play', slug: '/' }, 
    { name: 'Map', slug: '/#/map' }, 
    { name: 'Profile', slug: '/#/profile' }, 
    // { name: 'Mint', slug: '/#/mint' }, 
    // { name: 'Leaderboard', slug: '/#/leaderboard' }, 
    // { name: 'Twitter', slug: 'https://twitter.com/ScrollKingdoms', external: true }, 
];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [account, setAccount] = useState();
  
  useEffect(() => {
    setAccount(props.account);
  }, [props.account])

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CastleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Scale RPG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                page.external ? (
                  <Link key={i} href={page.slug} underline="none" target="_blank" 
                  rel="noopener noreferrer">
                    <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                </Link>
                ) : (
                  <Link key={i} href={page.slug} underline="none">
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                </Link>
                )
              ))}
            </Menu>
          </Box>
          <CastleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Scale RPG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              page.external ? (
                <Button
                  key={i}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href={page.slug}
                  target="_blank" 
                  rel="noopener noreferrer"
                >  
                  {page.name}
                </Button>
              ) : (
                <Button
                  key={i}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href={page.slug}
                >  
                  {page.name}
                </Button>
              )         
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { account ? (
                // <Link 
                //     href={`https://etherscan.io/address/${account}`}
                //     target="_blank"
                //     rel="noopener noreferrer"
                // >
                    <Button 
                      variant="contained" 
                      sx={{ 
                        p: "0.5rem 1.5rem", 
                        backgroundColor: "#f6851b",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#f6851b",
                        }
                      }}
                    >
                      { account.slice(0, 5) + '...' + account.slice(38, 42) }
                    </Button>
                // </Link>
            ) : (
                <Button 
                  startIcon={<AccountBalanceWalletIcon />} 
                  variant="contained" 
                  color="primary" 
                  onClick={props.login} 
                  sx={{ 
                    p: "0.5rem 1.5rem", 
                    backgroundColor: "#f6851b",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#f6851b",
                    }
                  }}
                >
                  Connect Wallet
                </Button>
            ) }
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}

export default ResponsiveAppBar;