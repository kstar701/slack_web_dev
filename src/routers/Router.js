import express from "express";

import {
  getLogin,
  getMain,
  postLogin,
  getSignup,
  postSignup,
  getChat,
  getMeeting,
  logout,
} from "../controllers/slackController";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";

const router = express.Router();

router.route("/").get(getLogin).post(postLogin);
router.route("/signup").get(getSignup).post(postSignup);
router.get("/main", getMain);
router.get("/meeting", getMeeting);
router.get("/chat", getChat);
router.post("/logout", logout);

export default router;
