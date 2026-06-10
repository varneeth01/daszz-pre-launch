import { Router, type IRouter } from "express";
import healthRouter from "./health";
import earlyAccessRouter from "./early-access";

const router: IRouter = Router();

router.use(healthRouter);
router.use(earlyAccessRouter);

export default router;
