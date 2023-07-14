import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom"
import {login, logout, registration} from "../http/userAPI";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Button,
    Typography,
    Menu,
    MenuItem,
    Tooltip,
    Avatar,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from "@mui/material";
import {MenuRounded} from '@mui/icons-material';
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import CreateType from "./modals/CreateType";
import DeleteBrandOrType from "./modals/DeleteBrandOrType";
import Login from './modals/Login'
import Registration from "./modals/Registration";

const settings = ['Корзина', 'Account', 'Dashboard', 'Logout'];

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            console.log(isLogin)
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            if(data.role === 'ADMIN'){
                user.setIsAdmin(true)
            }
            console.log(user.isAdmin)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    const logOut = async () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        await logout()
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

    const handleClose = ()=>{

    }

    return (
        <AppBar position="static">
                <Toolbar sx={{marginLeft:5, marginRight:5}} disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Appliances Store
                    </Typography>
                    {user.isAuth ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px', textAlign:'center' }}
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
                                {user.isAdmin && <MenuItem key="Панель администратора" onClick={()=>{
                                    handleCloseUserMenu()
                                    navigate(ADMIN_ROUTE, user)
                                }}>
                                    <Typography textAlign="center">Панель администратора</Typography>
                                </MenuItem>}
                                <MenuItem key="Корзина" onClick={()=>{
                                    handleCloseUserMenu()
                                    navigate(BASKET_ROUTE, user)
                                }}>
                                    <Typography textAlign="center">Корзина</Typography>
                                </MenuItem>
                                <MenuItem key="Выйти" onClick={()=>{
                                    handleCloseUserMenu()
                                    logOut()
                                }}>
                                    <Typography textAlign="center">Выйти</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Box sx={{ flexGrow: 0 }}>
                            <Button variant={"outline-light"} onClick={()=> {
                                setLoginVisible(true)
                                setIsLogin(true)}
                            }>Войти</Button>
                            <Button variant={"outline-light"} onClick={()=> {
                                setRegisterVisible(true)
                                setIsLogin(false)}

                            }>Зарегистрироваться</Button>
                            <Dialog open={loginVisible} onClose={()=>setLoginVisible(false)} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Вход в систему</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus={true}
                                        margin="dense"
                                        id="email"
                                        label="Введите Email"
                                        type="email"
                                        fullWidth={true}
                                        onChange={e => setEmail(e.target.value)}>
                                    </TextField>
                                    <TextField
                                        autoFocus={true}
                                        margin="dense"
                                        id="password"
                                        label="Введите пароль"
                                        type="password"
                                        fullWidth={true}
                                        onChange={e => {setPassword(e.target.value)}}>
                                    </TextField>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick = {()=>{
                                        setLoginVisible(false)
                                    }} color="primary">Отменить</Button>
                                    <Button onClick = {()=>{
                                        setLoginVisible(false)
                                        setIsLogin(true)
                                        click()
                                    }} color="primary">Войти</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={registerVisible} onClose={()=>setRegisterVisible(false)} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus={true}
                                        margin="dense"
                                        id="email"
                                        label="Введите Email"
                                        type="email"
                                        fullWidth={true}
                                        onChange={e => setEmail(e.target.value)}>
                                    </TextField>
                                    <TextField
                                        autoFocus={true}
                                        margin="dense"
                                        id="password"
                                        label="Введите пароль"
                                        type="password"
                                        fullWidth={true}
                                        onChange={e => setPassword(e.target.value)}>
                                    </TextField>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick = {()=>{
                                        setRegisterVisible(false)
                                    }} color="primary">Отменить</Button>
                                    <Button onClick = {()=>{
                                        setRegisterVisible(false)
                                        setIsLogin(false)
                                        click()
                                    }} color="primary">Зарегистрироваться</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    }
                </Toolbar>
        </AppBar>
    );
});

export default NavBar;