import express from 'express';
const userRouter=express.Router();


//internal cController
import {index,about,feedback} from '../controller/userController.js';

import {requireLogin} from '../controller/requiredController.js'

userRouter.get('/',  index);
userRouter.get('/about',about);
userRouter.get('/feedback', feedback);





export default userRouter;

