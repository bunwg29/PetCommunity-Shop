import { Request, Response, NextFunction } from 'express';

export const validateInput = (data: any): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  const { name, email, phone, address } = data;

  if (!email) errors.email = 'Email is required';
  if (!name) errors.name = 'Name is required';
  if (!phone) errors.phone = 'Phone number is required';
  if (!address) errors.address = 'Facebook address is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) errors.email = 'Invalid email format';

  if (name && name.length < 3)
    errors.name = 'Name must be at least 3 characters long';

  const phoneRegex = /^0\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return errors;
};

export const validateInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validateInput(req.body);

  if (Object.keys(errors).length > 0) {
    req.flash('warming', 'All input are required and true format');
    res.redirect('/toycart');
  } else {
    next();
  }
};
