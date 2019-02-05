import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Customer } from "../entity/Customer";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export async function signin(request: Request, response: Response) {

    const customerRepository = getManager().getRepository(Customer);

    const customer = await customerRepository.findOne({ email: request.body.email });
    console.log("Customer who tried logging:", customer);
    if (!customer) {
        return response.status(404).json({
            failed: 'Usuário ou senha inválidos',
        });
    }
    else {
        bcrypt.compare(request.body.password, customer.password, (err, resultUser) => {
            console.log("Body",request.body.password);
            console.log("Password",customer.password);
            if (err) {
                return response.status(401).json({
                    msg: 'Usuário ou senha inválidos',
                });
            }
            console.log("Result User:",resultUser);
            if (resultUser) {
                const JWTToken = jwt.sign({
                    email: customer.email,
                    _id: customer._id
                },
                'zz-secret',
                {
                    expiresIn: '2h'
                });
                return response.status(201).json({
                    success: 'Bem vindo ao ambiente autenticado JWT',
                    email: customer.email,
                    expiresIn: '2h',
                    token: JWTToken
                });
            }
            return response.status(401).json({
                failed: 'Acesso não autorizado'
            });  
        });
    }
}