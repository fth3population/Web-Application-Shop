import request from "supertest";

import app from "./main.js";

it("Should return All Types", function(done){

    request(app)
        .get("/api/type")
        .expect([
            {
                "id": 3,
                "name": "Washing Mashine",
                "createdAt": "2023-07-06T19:55:10.000Z",
                "updatedAt": "2023-07-06T19:55:10.000Z"
            },
            {
                "id": 5,
                "name": "TV",
                "createdAt": "2023-07-06T19:58:47.000Z",
                "updatedAt": "2023-07-06T19:58:47.000Z"
            },
            {
                "id": 6,
                "name": "Fridge",
                "createdAt": "2023-07-07T07:20:48.000Z",
                "updatedAt": "2023-07-07T07:20:48.000Z"
            },
            {
                "id": 8,
                "name": "Microwave",
                "createdAt": "2023-07-08T13:26:47.000Z",
                "updatedAt": "2023-07-08T13:26:47.000Z"
            }
        ])
        .end(done);
});

it("Should return Auth Error", function(done){

    request(app)
        .post("/api/user/login")
        .send({email:"fth3population@gmail.com", password:"1223"})
        .expect({"message":"Неверный пароль"})
        .end(done);
});

it("Should return All Brands", function(done){

    request(app)
        .get("/api/brand")
        .expect([
            {
                "id": 1,
                "name": "Samsung",
                "createdAt": "2023-07-06T20:04:32.000Z",
                "updatedAt": "2023-07-06T20:04:32.000Z"
            },
            {
                "id": 2,
                "name": "LG",
                "createdAt": "2023-07-06T20:05:19.000Z",
                "updatedAt": "2023-07-06T20:05:19.000Z"
            },
            {
                "id": 6,
                "name": "Polaris",
                "createdAt": "2023-07-07T07:20:05.000Z",
                "updatedAt": "2023-07-07T07:20:05.000Z"
            }
        ])
        .end(done);
});

it("Should return One Device", function(done){

    request(app)
        .get("/api/device/11")
        .expect({
            "id": 11,
            "name": "Samsung WD7500T",
            "price": 15000,
            "rating": 1,
            "img": "d76a2f4e-c3a1-4572-ad8f-381807794fab.jpg",
            "createdAt": "2023-07-10T18:48:57.000Z",
            "updatedAt": "2023-07-11T21:39:51.000Z",
            "typeId": 3,
            "brandId": 1,
            "info": [
                {
                    "id": 3,
                    "title": "Загрузка",
                    "description": "10.5 кг",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 4,
                    "title": "Класс энергоэффективности",
                    "description": "А",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 5,
                    "title": "Технология Eco Bubble",
                    "description": "есть",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 6,
                    "title": "Уровень шума (стирка)",
                    "description": "52 дБ",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 7,
                    "title": "Вес",
                    "description": "80 кг",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 8,
                    "title": "Загрузка для сушки",
                    "description": "7 кг",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 9,
                    "title": "Цвет корпуса",
                    "description": "белый",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 10,
                    "title": "AI Control",
                    "description": "есть",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 11,
                    "title": "Мотор",
                    "description": "инверторный",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                },
                {
                    "id": 12,
                    "title": "Скорость отжима",
                    "description": "1400 об/мин",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T16:05:39.000Z",
                    "deviceId": 11
                }
            ],
            "type": {
                "id": 3,
                "name": "Washing Mashine",
                "createdAt": "2023-07-06T19:55:10.000Z",
                "updatedAt": "2023-07-06T19:55:10.000Z"
            },
            "brand": {
                "id": 1,
                "name": "Samsung",
                "createdAt": "2023-07-06T20:04:32.000Z",
                "updatedAt": "2023-07-06T20:04:32.000Z"
            }
        })
        .end(done);
});

it("Should return All Devices", function(done){

    request(app)
        .get("/api/device")
        .expect({
            "count": 6,
            "rows": [
                {
                    "id": 11,
                    "name": "Samsung WD7500T",
                    "price": 15000,
                    "rating": 1,
                    "img": "d76a2f4e-c3a1-4572-ad8f-381807794fab.jpg",
                    "createdAt": "2023-07-10T18:48:57.000Z",
                    "updatedAt": "2023-07-11T21:39:51.000Z",
                    "typeId": 3,
                    "brandId": 1
                },
                {
                    "id": 12,
                    "name": "Samsung RB5000A",
                    "price": 60000,
                    "rating": 4,
                    "img": "f14ac0eb-7826-4e66-bdaf-ba6e672b67ea.jpg",
                    "createdAt": "2023-07-10T18:56:12.000Z",
                    "updatedAt": "2023-07-10T22:22:06.000Z",
                    "typeId": 6,
                    "brandId": 1
                },
                {
                    "id": 13,
                    "name": "Samsung QN900C",
                    "price": 120000,
                    "rating": 4,
                    "img": "e1884b29-526d-4ced-bffd-55b6773219d6.jpg",
                    "createdAt": "2023-07-10T19:26:28.000Z",
                    "updatedAt": "2023-07-10T22:22:10.000Z",
                    "typeId": 5,
                    "brandId": 1
                },
                {
                    "id": 14,
                    "name": "LG-GR-X24FMKBL",
                    "price": 70000,
                    "rating": 4,
                    "img": "fb26567f-4669-4910-8d74-b4dbb24379a5.jpg",
                    "createdAt": "2023-07-10T19:43:20.000Z",
                    "updatedAt": "2023-07-10T22:22:13.000Z",
                    "typeId": 6,
                    "brandId": 2
                },
                {
                    "id": 15,
                    "name": "LG G3 77'' 4K Smart OLED",
                    "price": 150000,
                    "rating": 3,
                    "img": "6d341285-c894-485b-b0e4-216032c32cb3.jpg",
                    "createdAt": "2023-07-10T19:47:22.000Z",
                    "updatedAt": "2023-07-10T22:22:20.000Z",
                    "typeId": 5,
                    "brandId": 2
                },
                {
                    "id": 16,
                    "name": "LG-MS2536GIK",
                    "price": 15000,
                    "rating": 5,
                    "img": "2723e1f1-f551-48e2-9de4-d48a337eaaec.jpg",
                    "createdAt": "2023-07-10T22:45:35.000Z",
                    "updatedAt": "2023-07-11T17:37:23.000Z",
                    "typeId": 8,
                    "brandId": 2
                }
            ]
        })
        .end(done);
});

it("Should return All Devices In Basket", function(done){

    request(app)
        .get("/api/basket")
        .set('Authorization', "BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmdGgzcG9wdWxhdGlvbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODkxMzQzNTcsImV4cCI6MTY4OTIyMDc1N30.r3_KFgtk_Idk5N3K1NNCgQJTT47aqg3zQobydQ1wqkc")
        .expect([
            {
                "id": 12,
                "name": "Samsung RB5000A",
                "price": 60000,
                "rating": 4,
                "img": "f14ac0eb-7826-4e66-bdaf-ba6e672b67ea.jpg",
                "createdAt": "2023-07-10T18:56:12.000Z",
                "updatedAt": "2023-07-10T22:22:06.000Z",
                "typeId": 6,
                "brandId": 1,
                "info": [
                    {
                        "id": 13,
                        "title": "Ширина",
                        "description": "595 мм",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 14,
                        "title": "Высота",
                        "description": "2010 мм",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 15,
                        "title": "Вес без упаковки",
                        "description": "71 кг",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 16,
                        "title": "Система No Frost",
                        "description": "Да",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 17,
                        "title": "Хладагент",
                        "description": "R-600a",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 18,
                        "title": "Тип охлаждения",
                        "description": "All Around Cooling",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 19,
                        "title": "Количество ящиков",
                        "description": "3 шт",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    },
                    {
                        "id": 20,
                        "title": "Функция быстрой заморозки",
                        "description": "Да",
                        "createdAt": "2023-07-10T18:56:12.000Z",
                        "updatedAt": "2023-07-10T18:56:12.000Z",
                        "deviceId": 12
                    }
                ],
                "cnt": 2
            },
            {
                "id": 13,
                "name": "Samsung QN900C",
                "price": 120000,
                "rating": 4,
                "img": "e1884b29-526d-4ced-bffd-55b6773219d6.jpg",
                "createdAt": "2023-07-10T19:26:28.000Z",
                "updatedAt": "2023-07-10T22:22:10.000Z",
                "typeId": 5,
                "brandId": 1,
                "info": [
                    {
                        "id": 21,
                        "title": "Диагональ",
                        "description": "85\"/75\"/65\"",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 22,
                        "title": "Разрешение",
                        "description": "8K (7680 * 4320)",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 23,
                        "title": "Процессор",
                        "description": "Нейронный процессор Quantum 8K",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 24,
                        "title": "Smart TV",
                        "description": "Да",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 25,
                        "title": "HDR",
                        "description": "Neo Quantum HDR 8K Pro",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 26,
                        "title": "Производительность",
                        "description": "Motion Xcelerator Turbo Pro (144 Гц)*",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 27,
                        "title": "Dolby Atmos",
                        "description": "Да",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    },
                    {
                        "id": 28,
                        "title": "Object Tracking Sound",
                        "description": "Object Tracking Sound Pro",
                        "createdAt": "2023-07-10T19:26:28.000Z",
                        "updatedAt": "2023-07-10T19:26:28.000Z",
                        "deviceId": 13
                    }
                ],
                "cnt": 1
            },
            {
                "id": 11,
                "name": "Samsung WD7500T",
                "price": 15000,
                "rating": 1,
                "img": "d76a2f4e-c3a1-4572-ad8f-381807794fab.jpg",
                "createdAt": "2023-07-10T18:48:57.000Z",
                "updatedAt": "2023-07-11T21:39:51.000Z",
                "typeId": 3,
                "brandId": 1,
                "info": [
                    {
                        "id": 3,
                        "title": "Загрузка",
                        "description": "10.5 кг",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 4,
                        "title": "Класс энергоэффективности",
                        "description": "А",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 5,
                        "title": "Технология Eco Bubble",
                        "description": "есть",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 6,
                        "title": "Уровень шума (стирка)",
                        "description": "52 дБ",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 7,
                        "title": "Вес",
                        "description": "80 кг",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 8,
                        "title": "Загрузка для сушки",
                        "description": "7 кг",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 9,
                        "title": "Цвет корпуса",
                        "description": "белый",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 10,
                        "title": "AI Control",
                        "description": "есть",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 11,
                        "title": "Мотор",
                        "description": "инверторный",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    },
                    {
                        "id": 12,
                        "title": "Скорость отжима",
                        "description": "1400 об/мин",
                        "createdAt": "2023-07-10T18:48:57.000Z",
                        "updatedAt": "2023-07-11T16:05:39.000Z",
                        "deviceId": 11
                    }
                ],
                "cnt": 2
            }
        ])
        .end(done);
});

