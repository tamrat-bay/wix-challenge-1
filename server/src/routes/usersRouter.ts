import { Request, Response, Router } from "express";
import { authWithFacebook, loginJwtUser, signupJwtUser } from "../helpers/userHelper";
import verifyToken from "../middlewares/verifyToken";

const router: Router = Router();


router.post("/signup",(req: Request, res: Response) => {
  signupJwtUser(req, res);
});

router.post("/login",(req: Request, res: Response) => {  
  loginJwtUser(req, res);
});

router.post("/:authType",verifyToken,(req: Request, res: Response) => {  
  authWithFacebook(req, res);
});

export default router;
