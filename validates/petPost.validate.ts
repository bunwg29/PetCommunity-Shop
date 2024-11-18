import { Request, Response, NextFunction } from 'express';

// Validate input data from user when they want to create or edit their pet.

const validatePet = (reqBody: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    const { name, age, price, color, location } = reqBody;

    if (!name) errors.name = 'Name of pet is required';
    if (!age) errors.age = 'Age of pet is required';
    if (!price) errors.price = 'Price of pet is required';
    if (!color) errors.color = 'Color of pet is required';
    if (!location) errors.location = 'Location is required';

    if (name && name.length < 3) errors.name = 'Name must be at least 3 characters long';

    const ageRegex = /^[1-9]\d*$/;
    if (age && !ageRegex.test(age)) errors.age = 'Invalid age format';

    const priceRegex = /^\d+(\.\d+)?$/;
    if (price && !priceRegex.test(price)) errors.price = 'Invalid price format';

    return errors;
};

const validateForm = async (
    req: Request,
    res: Response,
    next: NextFunction,
    validateFunction: (data: any) => { [key: string]: string }, 
    renderView: string,
    title: string,
) => {
    const errors = validateFunction(req.body);

    if (Object.keys(errors).length > 0) {
        return res.render(renderView, {
            title: title,
            errors,
        });
    }

    next(); 
};

export const validatePetPost = async (req: Request, res: Response, next: NextFunction) => {

    await validateForm(req, res, next, validatePet, 'pages/mypet/create', "MyPet | Create");

};








