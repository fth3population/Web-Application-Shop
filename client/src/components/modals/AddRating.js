import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {addRating, createBrand, createType, fetchOneDevice} from "../../http/deviceAPI";
import {Rating, Typography} from "@mui/material";
import {getRating} from "../../http/userAPI";
import {useParams} from "react-router-dom";
import {Context} from "../../index";

const AddRating = ({show, onHide}) => {
    const [rate, setRate] = useState(0)
    const {id} = useParams()
    const {user} = useContext(Context)

    const setRating = async (value) =>{
        let data;
        if(user.isAuth){
            setRate(value)
            data = await addRating(value,id)
        }
        else{
            alert("Авторизуйтесь для добавления товаров в корзину")
        }
        console.log(data)
    }

    useEffect(() => {
        getRating(id).then(data => {
            if(data){
                setRate(data.rate)
            }
        })
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оценка товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Typography component="legend">Поставьте оценку</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rate??0}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>
                <br/>
                <Form>
                    <Form.Control
                        placeholder={"Опишите ваши впечатления от товара"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={onHide}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRating;