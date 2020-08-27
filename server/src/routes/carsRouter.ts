import { Request, Response, Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import { getCarsFromDb,addCarToDb,deleteCarFromDb,editCarDataInDb, getUserCarsFromDb } from "../helpers/carHelpers";
  
const router: Router = Router();

router.get("/:authType/:userID", verifyToken,(req: Request, res: Response) => {  
  getUserCarsFromDb(req, res)
});

router.get("/:authType", verifyToken,(req: Request, res: Response) => {
  getCarsFromDb(req, res)
});

router.post("/:authType/:userID",verifyToken,(req: Request, res: Response) => {
  addCarToDb(req, res)
});

router.put("/:authType/:carID",verifyToken,(req: Request, res: Response) => {
  editCarDataInDb(req, res)
});

router.delete("/:authType/:userID/:carID",verifyToken,(req: Request, res: Response) => {
  deleteCarFromDb(req, res)
});

export default router;
