// lib/server.ts
import { AppRoutes } from "./routes";
import { createConnection, getManager } from "typeorm";

import { Request, Response } from "express";
import express = require("express");
import bodyParser = require("body-parser");

createConnection().then(connection => {

    const app = express();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    const PORT = 8100;
    let listaSockets = [];

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.use(function (req, res, next) {
        res.locals.listaSockets = listaSockets;
        // listaSockets.forEach(socket => {
        //     let value;
        //     getManager().getRepository(Notification).find().then(data => {                
        //         value = data;
        //         console.log(value);
        //         socket.emit("notifications", data);
        //         console.log(`Socket ${socket.id} has connected`);
                
        //     });
        // });

        next();
    });

    app.use(bodyParser.json());

    io.on('connection', socket => {
        // let value;
        // getManager().getRepository(Notification).find().then(data => {
        //     value = data;
        //     console.log(value);
        //     socket.emit("notifications", data);
        //     console.log(`Socket ${socket.id} has connected`);
            listaSockets.push(socket);
        // });
    });

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    server.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    })

}).catch(error => console.log("TypeORM connection error: ", error));;
