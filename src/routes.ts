import { getAllNotifications, addNotification } from "./controller/notifications";
import { getCustomers, addCustomer } from "./controller/customers";

export const AppRoutes = [

    // Notifications - Get
    {
        path: "/api/v1/notifications",
        method: "get",
        action: getAllNotifications
    },

    // Notifications - Post
    {
        path: "/api/v1/notifications",
        method: "post",
        action: addNotification
    },

    //Customers - Get - all or query
    {
        path: "/api/v1/customers",
        method: "get",
        action: getCustomers
    },

    //Customers - Post
    {
        path: "/api/v1/customers",
        method: "post",
        action: addCustomer
    },

];