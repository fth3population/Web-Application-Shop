import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../index";
import emptyBasket from "./../assets/emptyBasket.jpg";
import {NavLink} from "react-router-dom";
import {Button, Row, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import OneItemInBasket from "../components/oneItemInBasket";
import {getDeviceFromBasket} from "../http/deviceAPI";
import {ORDERING_ROUTE} from "../utils/consts";

const BasketCard = observer(() => {
    const {user,basket} = useContext(Context);
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

    if(basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <Image src={emptyBasket}/>
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Empty shopping basket</b></div>
            </div>
        )
    }

    return (
        <div>
            <br/>
            <NavLink  to={ORDERING_ROUTE}>
                <Button className="align-items-end">Оформить заказ</Button>
            </NavLink>
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(device => <OneItemInBasket key={device.id} device={device}/>)}
                </Col>
            </Row>
        </div>
    );
});

export default BasketCard;