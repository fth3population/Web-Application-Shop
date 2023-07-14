import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {addRating, fetchOneDevice} from "../http/deviceAPI";
import {getRating, login, registration} from "../http/userAPI";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {addToBasket} from "../http/basketAPI";
import {Rating, Typography, Card, CardContent, CardActions, CardHeader} from "@mui/material";
import {observer} from "mobx-react-lite";
import CreateBrand from "../components/modals/CreateBrand";
import AddRating from "../components/modals/AddRating";
//import {fetchOneDevice} from "../http/deviceAPI";

export default observer(() => {
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const [ratingVisible, setRatingVisible] = useState(false)
    const addOnClick = async () =>{
        try {
            let data;
            if(user.isAuth){
                data = await addToBasket(id)
            }
            else{
                alert("Авторизуйтесь для добавления товаров в корзину")
            }
            console.log(data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
        })
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image style={{width: "100%", maxWidth: 350}} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>

                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <Typography component="legend">Средняя оценка товара</Typography>
                            <Rating
                                size="large"
                                name="simple-controlled"
                                value={device.rating??0}
                                readOnly
                            />
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card sx={{ minWidth: 275, minHeight: 200, border:1,borderRadius: 2}} className="d-flex flex-column justify-content-around align-items-center">
                        <CardContent>
                            <Typography sx={{ fontSize: 32 }} color="text.primary" variant="h5" component="div">
                                {device.price + " ₽"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={addOnClick}>Добавить в корзину</Button>
                        </CardActions>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <Button
                    variant={"outline-primary"}
                    className="mt-4 p-2"
                    onClick={() => setRatingVisible(true)}
                >
                    Оставьте отзыв о товаре
                </Button>
                <AddRating show={ratingVisible} onHide={() => setRatingVisible(false)}/>
            </Row>
            <Row className="d-flex flex-column m-3">
                <Card className="flex-column justify-content-around align-items-start" sx={{border:1,borderRadius: 2}}>
                    <CardHeader title="Характеристики"/>
                    <CardContent>
                        {device.info.map((info, index) =>
                            <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                                {info.title} : {info.description}
                            </Row>
                        )}
                    </CardContent>
                </Card>

            </Row>
        </Container>
    );
});
