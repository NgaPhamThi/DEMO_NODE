import express from "express";
import { create, getAll, update, get, remove } from "../controllers/category";

const router = express.Router()

router.post("/categories", create)
router.get("/categories", getAll)
router.get("/categories/:id", get)
router.put("/categories/:id", update)
router.delete("/categories/:id", remove)

export default router