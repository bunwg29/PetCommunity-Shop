import nodemailer from 'nodemailer'

export const sendEmail = (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: html,
  }

  transporter.sendMail(mailOptions)
}
