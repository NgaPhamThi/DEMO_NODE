import express from "express";
import { signup, signin } from "../controllers/auth";

const router = express.Router()

router.post("/auth/signup", signup)
router.post("/auth/signin", signin)


export default router