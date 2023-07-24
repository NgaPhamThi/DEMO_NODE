import express from "express";
import { create, getAll, update, get, remove } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router()

router.post("/products", checkPermission, create)
router.get("/products", getAll)
router.get("/products/:id", get)
router.put("/products/:id", update)
router.delete("/products/:id", remove)

export default router