import express, { Express } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import flash from 'express-flash';
import session, { SessionOptions } from 'express-session';

import * as database from './config/database';
database.connect();

import Routers from './routes/client/index.route';
import RoutersAdmin from './routes/admin/index.route';

import { systemConfig } from './config/adminPrefix';

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.set('views', `${__dirname}/views`);

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.use(
  '/tinymce',
  express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECERET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
};

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionOptions));
app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

Routers(app);
RoutersAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
