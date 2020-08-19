import jwt from "jsonwebtoken";
import axios from 'axios'
import { Request } from 'express'

type verifyToken =  Promise<{
  isVerified: boolean;
  reason: string;
}>;

const verifyJsonWebToken = async (req: Request):verifyToken =>{
  const authHeader: string | undefined = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  let result = { isVerified :false , reason : ''}
  if (!token) return result = { isVerified :false , reason : 'Access denied'}
  try {
    const verified = await jwt.verify(token, "anythingiwant");
     if (verified) return result = { isVerified :true , reason : 'verified'}
  } catch (err) {
    result = { isVerified :false , reason : 'Invalid token'};
  }
  return result
}

const verifyFbAccessToken = async (req: Request):verifyToken  => {
  const authHeader: string | undefined = req.headers.authorization;
  const fbUserID: string | string[] | undefined = req.headers.fbuserid;
  const token = authHeader && authHeader.split(" ")[1];

   //! Check if access token is valid - if valid return true else false
  let result = { isVerified: false , reason : ''}
  if (!token) return result = { isVerified :false , reason : 'Access denied'}
  try {
    //Check the userID via accessToken / and verify if the user id is the same as the on in the client
   const res = await axios.get(`https://z-p3-graph.facebook.com/v2.3/me?access_token=${token}&fields=name%2Cemail%2Cpicture&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
   if (res.data.id === fbUserID) {
      result = { isVerified: true , reason : 'verified'}
   }else{
      result = { isVerified: false , reason : 'Invalid token'}
   }
  } catch (err) {
      console.log(err);
      result = { isVerified: false , reason : err.response.data }
  }  
  return result
}

export { verifyJsonWebToken, verifyFbAccessToken };


// fb access token via header / make sure not to repeat code
// create function for get/post/edit/delete that fits both AuthFB and JWTAuth