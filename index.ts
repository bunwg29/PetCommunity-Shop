import express, {Express, Response, Request} from "express";
import * as dotenv from "dotenv";
import * as database from "./config/database";
import Routers from "./routes/index.route";

dotenv.config();
database.connect();

const app: Express = express();
const port : number | string = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static(__dirname + '/public'));

Routers(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`); 
});