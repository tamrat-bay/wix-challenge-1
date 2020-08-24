import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

interface IFacebookAuth {
  fbUserID: string;
  name: string;
  authType: string;
}
const authErrorMessage = "We didn't recognize the email or password you entered. Please try again"

const authWithFacebook = async (req: Request, res: Response) => {
  const { fbUserID, name, authType }: IFacebookAuth = req.body;

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
              res.status(500).send("Internal server issue");
            });
        }
      })
      .catch((err) => console.log("Fail", err));

};

const signupJwtUser = (req: Request, res: Response) => {
  let { name, email, password, authType }: IUser = req.body;

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
        .catch((err) =>
          res
            .status(500)
            .send("Internal server issue")
        );
    } else {
      return res.status(404).send("This email is already registered");
    }
  });
};

interface ILoginModel {
  email: string;
  password: string;
}

const loginJwtUser = (req: Request, res: Response) => {
  const { email, password }: ILoginModel = req.body;

  User.findOne({ email }, (err, user: IUser) => {
    if (err) return res.status(400).send(err);
    if (user) {
      const { name, email, authType, _id, cars } = user;
      //check if password is correct
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            //create and assign token
            let TOKEN_SECRET = "anythingiwant";
            const token = jwt.sign({ _id }, TOKEN_SECRET);
            res
              .header("auth-token", token)
              .send({ name, authType, email, token, _id, cars });
          } else {
            return res.status(403).send(authErrorMessage);
          }
        })
        .catch((err) =>
          res
            .status(500)
            .send("Internal server issue")
        );
    } else {
      return res.status(400).send(authErrorMessage);
    }
  });
};

export { authWithFacebook, loginJwtUser, signupJwtUser };
