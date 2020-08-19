import { Request, Response, Router } from "express";
import {
  verifyJsonWebToken,
  verifyFbAccessToken,
} from "../middlewares/verifyToken";
import {
  getCarsFromDb,
  addCarToDb,
  deleteCarFromDb,
  editCarDataInDb,
} from "../helpers/carHelpers";

const router: Router = Router();

const facbookAuthType: string = 'facebook'

router.get("/:authType", async (req: Request, res: Response) => {
  const { authType } = req.params;

  if (authType === facbookAuthType) {
    const { isVerified, reason } = await verifyFbAccessToken(req);
    isVerified ? getCarsFromDb(req, res) : res.status(401).send(reason);
  } else {
    const { isVerified, reason } = await verifyJsonWebToken(req);
    isVerified ? getCarsFromDb(req, res) : res.status(401).send(reason);
  }
});

router.post("/:authType/:userID", async (req: Request, res: Response) => {
  const { authType } = req.params;

  if (authType === facbookAuthType) {
    const { isVerified, reason } = await verifyFbAccessToken(req);
    isVerified ? addCarToDb(req, res) : res.status(401).send(reason);
  } else {
    const { isVerified, reason } = await verifyJsonWebToken(req);
    isVerified ? addCarToDb(req, res) : res.status(401).send(reason);
  }
});

router.put("/:authType/:carID", async (req: Request, res: Response) => {
  const { authType } = req.params;

  if (authType === facbookAuthType) {
    const { isVerified, reason } = await verifyFbAccessToken(req);
    isVerified ? editCarDataInDb(req, res) : res.status(401).send(reason);
  } else {
    const { isVerified, reason } = await verifyJsonWebToken(req);
    isVerified ? editCarDataInDb(req, res) : res.status(401).send(reason);
  }
});

router.delete("/:authType/:userID/:carID", async (req: Request, res: Response) => {
  const { authType } = req.params; 

  if (authType === facbookAuthType) {
    const { isVerified, reason } = await verifyFbAccessToken(req);
    isVerified ? deleteCarFromDb(req, res) : res.status(401).send(reason);
  } else {
    const { isVerified, reason } = await verifyJsonWebToken(req);
    isVerified ? deleteCarFromDb(req, res) : res.status(401).send(reason);
  }
});

export default router;
