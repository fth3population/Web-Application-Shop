import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import {Button, Row} from "react-bootstrap";

const SortingBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div style={{ display:'flex', justifyContent:'center', alignItems:"center" }}>
            <Card sx={{ minWidth: 275, minHeight: 400, justifyContent:'center', borderColor:'primary', border:1,borderRadius: 2,color: 'primary.main'}} className="d-flex flex-column justify-content-around align-items-center">
                <CardContent sx={{justifyContent:"center", alignItems:"center"}}>
                    <FormControl sx = {{justifyContent:"center", alignItems:"center"}}>
                        <InputLabel id="1">Тип</InputLabel>
                        <Select

                            sx={{minWidth:200}}
                            labelId="1"
                            id="demo-simple-select1"
                            value={device.selectedType}
                            label="Выберите тип">

                            {device.types.map(type =>
                                <MenuItem value = {type} onClick={() => device.setSelectedType(type)}>{type.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl sx={{marginTop:5}}>
                        <InputLabel id="2">Производитель</InputLabel>
                        <Select
                            sx={{minWidth:200, marginBottom:5}}
                            labelId="2"
                            id="demo-simple-select2"
                            value={device.selectedBrand}
                            label="Выберите производителя">

                            {device.brands.map(brand =>
                                <MenuItem value = {brand} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <Button color="primary" sx={{marginTop:5}} variant="primary" onClick={()=>{
                        device.setSelectedBrand({})
                        device.setSelectedType({})
                    }}>Сбросить фильтры</Button>

                </CardContent>

            </Card>
        </div>


    );
});

export default SortingBar;