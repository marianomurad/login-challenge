import { MONGOURI } from '../configs/db'
import User from './User.model'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export const db: any = {};
mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.url = MONGOURI;
db.users = User;

