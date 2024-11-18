import { Request, Response, NextFunction } from 'express'

// Start validate input data when user register
export const registerValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, name, phonenumber, password, confirmpassword } = req.body;

  const errors: { [key: string]: string } = {};

  if (!email) errors.email = 'Email is required';
  if (!name) errors.name = 'Name is required';
  if (!phonenumber) errors.phonenumber = 'Phone number is required';
  if (!password) errors.password = 'Password is required';
  if (!confirmpassword) errors.confirmpassword = 'Confirm password is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email)) errors.email = 'Invalid email format';

  if (name && name.length < 3)
    errors.name = 'Name must be at least 3 characters long';

  const phoneRegex = /^0\d{9}$/
  if (phonenumber && !phoneRegex.test(phonenumber)) {
    errors.phonenumber = 'Invalid phone number format';
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  if (password && !passwordRegex.test(password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, and special character';
  }

  if (password && confirmpassword && password !== confirmpassword) {
    errors.confirmpassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {

    res.locals.errors = errors;

    return res.render('pages/user/signup', {
      title: 'PetCommunity | SignUp',
      errors,
    });

  } else {
    next();
  }

};

// End validate input data when user register

// Start validate password input data
export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors: { [key: string]: string } = {};

  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!password) errors.password = 'Password is required';
  if (!confirm_password)
    errors.confirm_password = 'Confirm password is required';

  if (password && !passwordRegex.test(password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, and special character';
  }

  if (password && confirm_password && password !== confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    res.locals.errors = errors
    return res.render('pages/user/reset-password', {
      title: 'PetCommunity | Reset password',
      errors,
    })
  } else {
    next();
  }
}

// End validate password input data
