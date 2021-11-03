import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {PropsWithChildren, useContext, useState} from "react";
import Link from "next/link";
import {UserContext} from "../../context/UserContext";
import {useRouter} from "next/router";

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function Layout({ children, window }: PropsWithChildren<Props>) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const {logout} = useContext(UserContext);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const goTo = (href: string) => {
        router.push(href);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button key="home" onClick={() => {goTo('/')}}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem button key="events" onClick={() => {goTo('/events')}}>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Evènements" />
                </ListItem>
                <ListItem button key="bookings" onClick={() => {goTo('/bookings')}}>
                    <ListItemIcon>
                        <BookmarkAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Réservations" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="profile" onClick={() => {goTo('/profile')}}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profil" />
                </ListItem>
                <ListItem button key="logout" onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <Link href="/">
                            <span className="no-decoration-link">Yvent - Back Office</span>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true,}}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

