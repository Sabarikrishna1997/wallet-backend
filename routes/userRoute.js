import express from "express";
import { addBalance, getUser, history, payment } from "../controller/user.js";

const router = express.Router();
router.get("/:id", getUser);
router.post('/add-bal/:id',addBalance)
router.post("/payment", payment);
router.get("/history/:id", history);
export default router;
