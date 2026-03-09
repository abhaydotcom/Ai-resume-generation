
import express from "express"
import { getMeController, login, logout, signUp } from "../controllers/user.controller.js"
import { Auth } from "../middleware/auth.middleware.js"

const router =express.Router()

router.post("/auth/login",login)
router.post("/auth/signup",signUp)
router.get("/auth/logout",logout)
router.get("/auth/get-me",Auth,getMeController)
export default router
