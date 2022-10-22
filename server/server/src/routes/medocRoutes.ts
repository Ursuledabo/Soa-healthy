import { Router} from "express";
import { addMedoc, testAdd10RandomMedoc} from "../controllers/medocControllers";


const router = Router();

router.post("/add", testAdd10RandomMedoc);
router.post("/addone", addMedoc);

export default router;