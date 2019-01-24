import { Request, Response } from "express";
import { getManager, getMongoRepository } from "typeorm";
import { Customer } from "../entity/Customer";

export async function getCustomers(request: Request, response: Response) {
    if (!request.query.cpf) {
        await getAllCustomers(request, response);
    }
    else if (request.query.cpf) {
        await getCustomerByCpf(request, response);
    }
}

export async function getAllCustomers(request: Request, response: Response) {
    const customerRepository = getManager().getRepository(Customer);
    const customer = await customerRepository.find();
    response.send(customer);
}

export async function getCustomerByCpf(request: Request, response: Response) {
    const customerRepository = getManager().getRepository(Customer);
    const customer = await customerRepository.findOne({ cpf: request.query.cpf });
    if (customer)
        response.send(customer);
    else
        response.send(404);
}


export async function addCustomer(request: Request, response: Response) {
    const customerRepository = getMongoRepository(Customer);
    const newCustomer = Object.assign(new Customer(), request.body);
    newCustomer.createdDate = new Date();
    await customerRepository.save(newCustomer);
    response.send(newCustomer);
}