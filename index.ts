import express, { Express } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

import * as database from './config/database';

import Routers from './routes/index.route';
import RoutersAdmin from './routes/admin/index.route';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';

import { systemConfig } from './config/adminPrefix';

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.set('views', `${__dirname}/views`);

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(cookieParser());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

Routers(app);

RoutersAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
