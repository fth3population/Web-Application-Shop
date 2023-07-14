import React, {useContext, useEffect} from 'react';
import TypeBar from "../components/TypeBar";
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import SortingBar from "../components/SortingBar";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <SortingBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});


export default Shop;