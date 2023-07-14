import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Row} from "react-bootstrap";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {fetchDevices} from "../http/deviceAPI";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()

    const refresh = () => {
        window.location.reload();
    }

    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    bg={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    text={brand.id === device.selectedBrand.id ? 'light' : 'dark'}
                >
                    {brand.name}
                </Card>
            )}

            {/*<Button className="mx-5" variant={"primary"} onClick={refresh}>Сбросить фильтры</Button>*/}
        </Row>
    );
});

export default BrandBar;