import React, {useEffect, useState} from 'react';
import {Container, Table, Pagination, InputGroup, Row, Image, Form} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import {observer} from "mobx-react-lite";
import {getAllDevicesInAdminPage} from "../http/deviceAPI";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, DEVICE_EDIT_ROUTE} from "../utils/consts";
import {Box, Button} from "@mui/material";

export default observer(() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [deleteBrandOrType, setDeleteBrandOrType] = useState(false);

    const [searchDevice, setSearchDevice] = useState('');
    const [searchedDevice, setSearchedDevice] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        getAllDevicesInAdminPage(searchDevice, currentPage, filter).then((data) => {
            const {count, rows} = data
            setSearchedDevice(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllDevicesInAdminPage(searchDevice, 1, filter).then((data) => {
            const {count, rows} = data
            setSearchedDevice(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])

    const fetchDevice = () => {
        getAllDevicesInAdminPage(searchDevice, currentPage, filter).then((data) => {
            const {count, rows} = data
            setSearchedDevice(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}
            <Box sx={{ display: 'space-between' }}>
                <Button
                    variant="contained"
                    sx={{display:"inline-block"}}
                    className="mt-4 ml-5 mr-5 p-2"
                    onClick={() => setTypeVisible(true)}
                >
                    Добавить тип
                </Button>
                <Button
                    variant="contained"
                    className="mt-4 ml-5 mr-5 p-2"
                    onClick={() => setBrandVisible(true)}
                >
                    Добавить бренд
                </Button>
                <Button
                    variant="contained"
                    className="mt-4 ml-5 mr-5 p-2"
                    onClick={() => setDeviceVisible(true)}
                >
                    Добавить устройство
                </Button>
                <Button
                    onClick={() => setDeleteBrandOrType(true)}
                    variant="contained"
                    className="mt-4 ml-5 mr-5 p-2"
                >
                    Удалить тип или бренд
                </Button>
            </Box>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteBrandOrType show={deleteBrandOrType} onHide={() => setDeleteBrandOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>

            <InputGroup className="mb-3 mt-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchDevice}
                    onChange={e => setSearchDevice(e.target.value)}
                    placeholder="Введите имя устройства..."
                />
                <Button
                    onClick={fetchDevice}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Найти
                </Button>
            </InputGroup>

            <ListGroup>
                {searchedDevice && searchedDevice.map( ({id, img, brand, type, price, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={12}>
                                            <NavLink to={DEVICE_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink> {/*//edit route*/}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Название устройства: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Цена: {price}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Бренд: {brand.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Тип: {type.name}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <NavLink to={DEVICE_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedDevice && searchedDevice.length > 0 ? pages : false}
            </Pagination>
        </Container>
    );
});
