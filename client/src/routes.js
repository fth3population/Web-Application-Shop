import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, DEVICE_EDIT_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    ORDERING_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import BasketCard from "./pages/BasketCard";
import DevicePageEdit from "./pages/DevicePageEdit";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: BasketCard
    },
    {
        path: ORDERING_ROUTE,
        Component: BasketCard
    },
    {
        path: DEVICE_EDIT_ROUTE + '/:id',
        Component: DevicePageEdit
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]