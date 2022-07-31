import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import Person from '../models/Mpeople';

const NAMESPACE = 'People Controller';

const createPerson = (req: Request, res: Response, next: NextFunction) => {
    let {firstName, lastName, occupation, age} = req.body;

    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        occupation,
        age
    })

    return person
        .save()
        .then(result => {
            return res.status(201).json({
                person: result
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        });
};

const getPeople = (req: Request, res:Response, next:NextFunction) => {
    Person.find()
    .exec()
    .then(results => {
        return res.status(200).json({
            people: results,
            count: results.length
        });
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        });
    });
};

export default {createPerson, getPeople}