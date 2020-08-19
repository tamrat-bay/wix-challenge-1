import { Request, Response, Router } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyFbAccessToken } from '../middlewares/verifyToken'
import { IUser } from '../models/userModel'
const router: Router = Router();


const authWithFacebook = async (req:Request, res:Response) =>{
    const { fbUserID, name, authType } = req.body;    
    const { isVerified, reason } = await verifyFbAccessToken(req);
    
    if(isVerified){
      User.findOne({ fbUserID: fbUserID })
        .then((user) => {
          if (user) {
            res.status(200).send(user);
          } else {
            User.create({ fbUserID, name, authType })
              .then((user) => {
                res.status(201).send(user);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send(`Server problem - ${err}`);
              });
          }
        })
        .catch((err) => console.log("Fail", err));
    }else{
        res.status(400).send(reason)
    }
}

router.post("/viafacebook",(req: Request, res: Response) => {
        authWithFacebook(req,res)
});

router.post("/signup",(req: Request, res: Response) => {
  let { name, email, password, authType }:IUser = req.body;
  
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user) {
      //hash password
      bcrypt
        .hash(password, 10)
        .then((hashedPassword: string) => {
          User.create({ name, email, authType, password: hashedPassword })
            .then((newUser) => res.status(201).send(newUser))
            .catch((err) => res.status(400).send(err));
        })
        .catch((err) => res.status(500).send('The server is facing some issues pleas try again'));
    } else {
      return res.status(404).send("This email is already registered");
    }
  });

});

interface ILoginModel {
  email: string;
  password: string;
}

router.post("/login",(req: Request, res: Response) => {
  const { email, password }: ILoginModel = req.body;

 //check if the user exist in the db
 User.findOne({ email }, (err, user:IUser) => {
  if (err) return res.status(400).send(err);
  if (user) {
    const { name, email,authType, _id , cars} = user;
    //check if password is correct
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          //create and assign token
          let TOKEN_SECRET = "anythingiwant"; 
          const token = jwt.sign({ _id }, TOKEN_SECRET);
          res.header("auth-token", token)
            .send({ name, authType, email, token , _id ,cars});
        } else {
          return res.status(403).send("Incorrect password");
        }
      })
      .catch((err) => res.status(500).send('The server is facing some issues pleas try again'));
  } else {
    return res.status(400).send("User not found");
  }
});

});

export default router;
