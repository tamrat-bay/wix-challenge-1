import jwt from "jsonwebtoken";
import axios from "axios";
import { Request, Response, NextFunction } from "express";

const facebookAuthType = "facebook";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: string | undefined = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(" ")[1];
  const { authType } = req.params;

  authType === facebookAuthType
    ? verifyFbAccessToken(req, res, next, token!)
    : verifyJsonWebToken(req, res, next, token!);
};

const verifyJsonWebToken = (
  req: any,
  res: Response,
  next: NextFunction,
  token: string
):void | Response<any> => {
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "anythingiwant");
    if (verified) return next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

const verifyFbAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
  token: string
):Promise<void | Response<any>> => {
  const fbUserID: string | string[] | undefined = req.headers.fbuserid;
  const verifyTokenUrl:string = `https://z-p3-graph.facebook.com/v2.3/me?access_token=${token}&fields=name%2Cemail%2Cpicture&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1`

  if (!token) return res.status(401).send("Access Denied");
  try {
    const res = await axios.get(verifyTokenUrl);
    if (res.data.id === fbUserID) return next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

export default verifyToken;
