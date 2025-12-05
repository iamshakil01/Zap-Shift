import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import DashLayout from "../Layout/DashLayout";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'rider',
                element: <PrivateRoutes>
                    <Rider></Rider>
                </PrivateRoutes>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: '/send-parcel',
                element: <PrivateRoutes>
                    <SendParcel></SendParcel>
                </PrivateRoutes>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes>
            <DashLayout></DashLayout>
        </PrivateRoutes>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancel
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'approve-riders',
                Component: ApproveRiders
            },
            {
                path: 'users-management',
                Component: UsersManagement
            },
        ]
    }
]);