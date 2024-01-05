import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
const pages = ['Products', 'List'];

const pagesLinks = ['/Products', '/List', '/Login', '/Register', '/Logout'];
const settings = ['Profile'];
const settingsLinks = ['/Profile'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userData = localStorage.getItem('userData');
  const navigate = useNavigate();
  const clearlocalStorage = () => {
    console.log("hi")
    localStorage.clear();
    navigate("/login");
    // window.location.reload();
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color='success'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
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
              {userData && pages.map((page, i) => {
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={pagesLinks[i]}><Typography textAlign="center">{page}</Typography></Link>
                  </MenuItem>
                )
              })}
              {
                !userData ?
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link to={pagesLinks[2]}>Login</Link></Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link to={pagesLinks[3]}>Register</Link></Typography>
                    </MenuItem>
                  </>
                  :
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </>
              }
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userData && pages.map((page, i) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={pagesLinks[i]}>{page}</Link>
              </Button>
            ))}
            {
              !userData ?
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={pagesLinks[2]}><Typography textAlign="center">Login</Typography></Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link to={pagesLinks[3]}>Register</Link></Typography>
                  </MenuItem>
                </>
                :
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className='' onClick={() => {
                      clearlocalStorage();
                    }}>Logout</Typography>
                  </MenuItem>
                </>
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              {/* <div className='m-1 inline '><Button sx={{backgroundColor:'rgb(101,163,13)'}} variant="contained" ><Link className='' to="/login" >Login</Link></Button></div>
        <div className='m-1 inline'><Button sx={{backgroundColor:'rgb(101,163,13)'}} variant="contained"><Link className='' to="/register" >Signup</Link></Button></div> */}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><Link to={settingsLinks[i]}>{setting}</Link></Typography>
                  </MenuItem>

              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;