import express from 'express';
import userRouter from './routes/userRouter';
import { db }  from './models';
import bodyParser from 'body-parser';
import {Error} from 'mongoose';
import {cors} from "./middleware/cors";

const app = express();
app.use(bodyParser.json());
app.use(cors);

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}
db.mongoose.connect(db.url, options)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((err: Error) => {
        console.log('Oops! There was an error connecting too the db', err);
        // process.exit();
    });

app.use('/user', userRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/test', (req, res) => res.send('Hello World2222!'));
export {app};
