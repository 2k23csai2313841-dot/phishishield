import express from 'express';
const userRouter=express.Router();


//internal cController
import {index,about,feedback} from '../controller/userController.js';

import {requireLogin} from '../controller/requiredController.js'

userRouter.get('/',  index);
userRouter.get('/about',about);
userRouter.get('/feedback', feedback);
userRouter.get('/health',(req,res)=>{
  return res.status(200).json({
        status: true
      });
})




export default userRouter;

