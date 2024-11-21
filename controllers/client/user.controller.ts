import { Response, Request } from 'express'
import md5 from 'md5'

import AccountModel from '../../models/account.model'
import ForgotPassword from '../../models/forgot-password.model'

import * as generateHelper from '../../helpers/generateCode.helper'
import * as sendMailHelper from '../../helpers/sendMail.helper'
import * as formatDate from '../../helpers/formatDate.helper'

// [GET] /user/signup
export const signup = async (req: Request, res: Response) => {
  const errors = res.locals.errors || null

  res.render('client/pages/user/signup', {
    title: 'PetCommunity | SignUp',
    errors,
  })
}

// [POST] /user/signup
export const signupPost = async (req: Request, res: Response) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phonenumber,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(30),
    linkFb: req.body.facebook_address,
    thumbnail: req.body.thumbnail,
  }

  const newUser = new AccountModel(userData)

  try {
    await newUser.save()
    res.cookie('tokenUser', newUser.tokenUser)
    res.redirect('/user/signin')
  } catch (error) {
    res.locals.errors = { general: 'Register falied, try again!' }
    return res.redirect('/user/signup')
  }
}

// [GET] /user/sigiin
export const signin = async (req: Request, res: Response) => {
  const errors = res.locals.errors || null

  res.render('client/pages/user/signin', {
    title: 'PetCommunity | SignIn',
    errors,
  })
}

// [POST] /user/signin
export const signinPost = async (req: Request, res: Response) => {
  const errors: { [key: string]: string } = {}

  const userInfo = {
    email: req.body.email,
    deleted: false,
  }

  const user = await AccountModel.findOne(userInfo)

  if (!user) {
    errors.email = 'Not exist email'
    res.locals.errors = errors
    res.render('client/pages/user/signin', {
      title: 'PetCommunity | SignIn',
      errors,
      user,
    })
    return
  }

  if (md5(req.body.password) != user.password) {
    errors.password = 'Wrong password'
    res.locals.errors = errors
    res.render('client/pages/user/signin', {
      title: 'PetCommunity | SignIn',
      errors,
    })
    return
  }

  if (user && md5(req.body.password) === user.password) {
    res.cookie('tokenUser', user.tokenUser)
    res.redirect('/')
  }
}

// [GET] /user/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('tokenUser')
  res.redirect('/')
}

// [GET] /user/forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  const errors = res.locals.errors || null

  res.render('client/pages/user/forgot-password', {
    title: 'PetComunity | Forgot Password',
    errors,
  })
}

// [POST] /user/forgot-password
export const forgotPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const errors: { [key: string]: string } = {}
  const find = {
    deleted: false,
    email: email,
  }

  const emailAccount = await AccountModel.findOne(find)

  if (!emailAccount) {
    errors.email = 'Not exist email'
    res.locals.errors = errors
    res.render('client/pages/user/forgot-password', {
      title: 'PetCommunity | SignIn',
      errors,
    })
    return
  }

  const otp = generateHelper.generateRandomNumber(6)

  const forgotPasswordData = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 3 * 60 * 60,
  }

  const forgotPassword = new ForgotPassword(forgotPasswordData)

  await forgotPassword.save()

  const subject = 'OTP code to get reset password'
  const htmlSendMail = `Your OTP authentication code is <b style="color: green;">${otp}</b>. OTP code is valid for 3 minutes. Please do not provide OTP code to others.`
  sendMailHelper.sendEmail(email, subject, htmlSendMail)

  res.redirect(`/user/forgot-password/otp?email=${email}`)
}

// [GET] /user/forgot-password/otp
export const otpPassword = async (req: Request, res: Response) => {
  const email = req.query.email
  const errors = res.locals.errors || null

  res.render('client/pages/user/otp-password', {
    title: 'PetCommunity | OTP',
    email,
    errors,
  })
}

// [POST] /user/forgot-password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const otp = req.body.otp_code
  const errors: { [key: string]: string } = {}

  const otpCode = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  })

  if (!otpCode) {
    errors.otp = 'Incorrect OTP'
    res.locals.errors = errors
    res.render('client/pages/user/otp-password', {
      title: 'PetCommunity | OTP',
      email,
      errors,
    })
    return
  }

  const user = await AccountModel.findOne({
    email: email,
  })

  res.cookie('tokenUser', user.tokenUser)

  res.redirect('/user/password/reset')
}

// [GET] /user/password/reset
export const resetPassword = async (req: Request, res: Response) => {
  res.render('client/pages/user/reset-password', {
    title: 'PetCommunity | Reset Password',
  })
}

// [PATCH] /user/password/reset
export const resetPasswordPatch = async (req: Request, res: Response) => {
  const password = req.body.password
  const tokenUser = req.cookies.tokenUser

  await AccountModel.updateOne(
    {
      tokenUser: tokenUser,
      deleted: false,
    },
    {
      password: md5(password),
    }
  )

  res.redirect('/user/signin')
}

// [GET] /user/profile
export const profile = async (req: Request, res: Response) => {
  const date = res.locals.user.dateBirth

  const formattedDate = formatDate.convertToDateForm(date)

  res.render('client/pages/user/profile', {
    title: 'PetCommunity | Profile',
    formattedDate,
  })
}

// [PATCH] /user/profile/edit
export const profileEdit = async (req: Request, res: Response) => {

  req.body.dateBirth = formatDate.convertToDate(req.body.dateBirth)

  await AccountModel.updateOne(
    {
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    },
    req.body
  )

  res.redirect('/user/profile');
  
}
