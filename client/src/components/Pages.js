import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination, PaginationItem} from '@mui/material'
import {ArrowBackRounded, ArrowForwardRounded} from "@mui/icons-material"
import {fetchDevices} from "../http/deviceAPI";

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination className="mt-3" color = "primary" count={pageCount} onChange={(event, page)=>{
            device.setPage(page)
        }}/>
    );
});

export default Pages;