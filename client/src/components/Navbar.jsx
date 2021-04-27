import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link, useHistory } from 'react-router-dom';
import NotificationSplash from './Notification';
import Tracker from './Tracker';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function Navbar({ user, searchTerm, searchTermHandler }) {
  
  const history = useHistory()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notification, setNotification] = useState(false)
  const [tracker, setTracker] = useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    console.log(user);
  };

  const LogOut = () => {
    localStorage.removeItem("customer-auth") 
    localStorage.removeItem("retailer-auth") 
    localStorage.removeItem("wholesaler-auth") 
    localStorage.removeItem("delivery-auth") 
    

    console.log("Logged out All")
    history.push("/")
    
  }

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge variant='dot' color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge variant="dot" color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartIcon />

        </IconButton>

        
        <p>Cart</p>

      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LocalMallIcon />
        </IconButton>
        <p>Orders</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <PowerSettingsNewIcon onClick = {LogOut} />
        </IconButton>
        <p>LogOut</p>
      </MenuItem>
    </Menu>
  );

  if(user)
  return (
    <div className={classes.grow}>
      {tracker ? <Tracker tracker={tracker} setTracker={setTracker} /> : ""}
      <AppBar 
        style={{backgroundColor: "#1b2021", position: 'fixed'}}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography style={{fontSize: '1.7rem',fontWeight: '600',cursor:'pointer'}} onClick = {()=>history.push("./login")} className={classes.title} variant="h6" noWrap>
            DeliverDash
          </Typography>
          {searchTermHandler?
          <div className={classes.search} style={{marginLeft: 50}}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchTerm}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => searchTermHandler(e)}
            />
          </div>:""}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop} style={{display:'flex',alignItems:'center'}}>
          {user && <span style={{marginRight:'20px',fontSize:'1.2rem'}}>Hey, {user.name}</span>}
            
            <IconButton 
              aria-label="show 17 new notifications" 
              color="inherit" 
              onClick = {()=>{
                setNotification(!notification)
              }}>
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
              { notification ? <NotificationSplash setTracker={setTracker} />: <div></div> }
            </IconButton>
            
            {user.type!=="Customer"?
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{marginRight:'5px'}}
              onClick = {()=>history.push(`/${user.type}/stock`)}
              >
              <AddShoppingCartIcon/>
            </IconButton>
            :""}

            {user.type !== 'Customer' ? 
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick = {()=>history.push(`/${user.type}/orders`)}
            >
              <LocalMallIcon />
            </IconButton>
            :''}
            
            {searchTermHandler?
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              
              <ShoppingCartIcon 
                onClick = {()=>history.push(`/${user.type}/cart`)}/>
            </IconButton>:""}
            <IconButton aria-label="logout" color="inherit">
              <PowerSettingsNewIcon onClick = {LogOut} style={{marginLeft:'5px',cursor:'pointer'}} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );

  return <></>
}