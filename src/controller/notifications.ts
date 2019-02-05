import { Request, Response } from "express";
import { getManager, getMongoRepository, ObjectID } from "typeorm";
import { Notification } from "../entity/Notification";
import { Customer } from "../entity/Customer";

export async function getAllNotifications(request: Request, response: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const notification = await notificationRepository.find();
    response.send(notification);
}

export async function addNotification(request: Request, response: Response) {
    const notificationRepository = getMongoRepository(Notification);
    const newNotification = Object.assign(new Notification(),request.body);    
    newNotification.createdDate = new Date();
    await notificationRepository.save(newNotification);
    //Envia a nova notificação para todos
    response.locals.listaSockets.forEach(socket =>{
        socket.emit("notifications", newNotification);
    });
    response.send(newNotification);
  }

  export async function getCustomerNotifications(request: Request, response: Response) {
    const customerRepository = getMongoRepository(Customer);
    console.log("id",request.params.id);
    const customer = await customerRepository.findOne(request.params.id);
    console.log("customer",customer);
    if (customer)
    {
        if(!customer.notifications)
            response.send([]);
        else
            response.send(customer.notifications);
    }
    else
        response.status(404).send("Customer not found!");
}

export async function addCustomerNotification(request: Request, response: Response) {
    const customerRepository = getMongoRepository(Customer);
    const customer = await customerRepository.findOne(request.params.id);
    if (customer)
    {
        const newNotification = Object.assign(new Notification(),request.body);    
        newNotification.read = false;    
        newNotification.createdDate = new Date();
        customer.notifications.push(newNotification);
        await customerRepository.update(request.params.id,customer);
        response.status(201).send(newNotification);
    }
    else
        response.status(404).send("Customer not found!");
}