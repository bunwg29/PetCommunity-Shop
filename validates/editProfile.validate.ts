import { Request, Response, NextFunction } from 'express';

// Validate input data from user when they want to update their profile

export const validateEditProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors: { [key: string]: string } = {};

  const { name, email, phone, fb_address, gender, dateBirth } = req.body;

  if (!email) errors.email = 'Email is required';
  if (!name) errors.name = 'Name is required';
  if (!phone) errors.phone = 'Phone number is required';
  if (!fb_address) errors.fb_address = 'Facebook address is required';
  if (!gender) errors.gender = 'Gender is required';
  if (!dateBirth) errors.dateBitrh = 'Date birth is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) errors.email = 'Invalid email format';

  if (name && name.length < 3)
    errors.name = 'Name must be at least 3 characters long';

  const phoneRegex = /^0\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (Object.keys(errors).length > 0) {
    res.locals.errors = errors;
    return res.render('pages/user/profile', {
      title: 'PetCommunity | Profile',
      errors: errors,
    });
  } else {
    next();
  }
};
