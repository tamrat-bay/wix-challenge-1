import { Request, Response, Router, response } from "express";
import axios from 'axios'
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserModel } from '../models/userModel'
const router: Router = Router();

//! 
const verifyFbAccessToken = async (accessToken: string, userID: string):Promise<boolean>  => {
    let result: boolean = false
    try {//Check the userID via accessToken / and verify if the user id is the same as the on in the client
     const res = await axios.get(`https://z-p3-graph.facebook.com/v2.3/me?access_token=${accessToken}&fields=name%2Cemail%2Cpicture&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
     if (res.data.id === userID) {
        result = true
     }
    } catch (err) {
        console.log(err);
        result = false
    }
    return result
}

const authWithFacebook = async (req:Request, res:Response) =>{
    const { userID, name, accessToken, authType } = req.body;
    //! Check if access token is valid - if valid continue else throw error message
    if(await verifyFbAccessToken(accessToken, userID)){
      User.findOne({ userID: userID })
        .then((user) => {
          if (user) {
            //if exist return 200
            console.log("FB user was logged");
            res.status(200).send(user);
          } else {
            //else save userID and Name and then return 201
            User.create({ userID, name, authType })
              .then((user) => {
                console.log("New FB user was added");
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
        res.status(400).send('access token is not valid')
    }
}

router.post("/viafacebook",(req: Request, res: Response) => {
        authWithFacebook(req,res)
});

router.post("/signup",(req: Request, res: Response) => {
  let { name, email, password, authType }:IUserModel = req.body;
  
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user) {
      //hash password
      bcrypt
        .hash(password, 10)
        .then((hashedPassword: string) => {
          //create user
          const user = new User({
            name,
            email,
            authType,
            password: hashedPassword,
          });
          user
            .save()
            .then((newUser) => res.status(201).send(newUser))
            .catch((err) => res.status(400).send(err));
        })
        .catch((err) => res.status(500).send('The server is facing some issues pleas try again'));
    } else {
      return res.status(404).send("This email is already registered");
    }
  });

});

interface LoginModel {
  email: string;
  password: string;
}

router.post("/login",(req: Request, res: Response) => {
  const { email, password }: LoginModel = req.body;

 //check if the user exist in the db
 User.findOne({ email }, (err, user:IUserModel) => {
  if (err) return res.status(400).send(err);
  if (user) {
    const { name, email, authType, _id } = user;
    //check if password is correct
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          //create and assign token
          let TOKEN_SECRET = "anythingiwant"; //todo - make this an env var later
          const token = jwt.sign({ _id }, TOKEN_SECRET);
          res
            .header("auth-token", token)
            .send({ name, authType, email, token , _id });
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
