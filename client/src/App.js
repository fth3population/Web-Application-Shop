import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar'
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userAPI";
import {getDeviceFromBasket} from "./http/deviceAPI";

export default observer(() => {
    const {user, basket} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            if(data.role === 'ADMIN'){
                user.setIsAdmin(true)
                //console.log(user.isAdmin)
            }
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if(user.isAuth === false) {
            basket.setDeleteAllDeviceFromBasket();
            const savedBasket = JSON.parse(localStorage.getItem("basket"));
            for (let key in savedBasket) {
                basket.setBasket(savedBasket[key]);
            }
        } else if(user.isAuth === true){
            basket.setDeleteAllDeviceFromBasket();
            getDeviceFromBasket().then(data => {
                for (let key in data) {
                    basket.setBasket(data[key], true);
                    console.log(data[key])
                }
            })
        }
    }, [basket, user.isAuth]);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
    <BrowserRouter>
        <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

;
