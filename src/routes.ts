import { getAllNotifications, addNotification, getCustomerNotifications, addCustomerNotification } from "./controller/notifications";
import { getCustomers, addCustomer } from "./controller/customers";
import { signin } from "./controller/auth";
import { getCustomerVehicles, addCustomerVehicle } from "./controller/vehicles";

export const AppRoutes = [

    // Authentication
    // By password OR refresh token (only first option)
    { path: "/api/v1/token", method: "post", action: signin },

    //Resource: customers:
    { path: "/api/v1/customers", method: "get", action: getCustomers },
    { path: "/api/v1/customers", method: "post", action: addCustomer },
        //Subresource: notifications:
    { path: "/api/v1/customers/:id/notifications",
      method: "get", action: getCustomerNotifications },
    { path: "/api/v1/customers/:id/notifications",
      method: "post", action: addCustomerNotification },
        //Subresource: vehicles:
        { path: "/api/v1/customers/:id/vehicles",
        method: "get", action: getCustomerVehicles },
      { path: "/api/v1/customers/:id/vehicles",
        method: "post", action: addCustomerVehicle },
  

    //Resource: notifications - maybe dont be used!
    { path: "/api/v1/notifications", method: "get", action: getAllNotifications },
    { path: "/api/v1/notifications", method: "post", action: addNotification },






];