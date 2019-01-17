import * as express from "express";
import * as bodyParser from "body-parser";
import { getAllNotifications, addNotification } from "./controller/notifications";

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
    }

];