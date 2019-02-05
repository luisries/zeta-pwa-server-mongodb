import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import { Customer } from "../entity/Customer";
import { Vehicle } from "../entity/Vehicle";

export async function getCustomerVehicles(request: Request, response: Response) {
    const customerRepository = getMongoRepository(Customer);
    const customer = await customerRepository.findOne(request.params.id);
    if (customer)
    {
        if(!customer.vehicles)
            response.send([]);
        else
            response.send(customer.vehicles);
    }
    else
        response.status(404).send("Customer not found!");
}

export async function addCustomerVehicle(request: Request, response: Response) {
    const customerRepository = getMongoRepository(Customer);
    const customer = await customerRepository.findOne(request.params.id);
    if (customer)
    {
        const newVehicle = Object.assign(new Vehicle(),request.body);    
        newVehicle.createdDate = new Date();
        customer.vehicles.push(newVehicle);
        await customerRepository.update(request.params.id,customer);
        response.status(201).send(newVehicle);
    }
    else
        response.status(404).send("Customer not found!");
}