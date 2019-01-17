import { Request, Response } from "express";
import { getManager, getMongoRepository } from "typeorm";
import { Notification } from "../entity/Notification";



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
    response.send(newNotification);
  }