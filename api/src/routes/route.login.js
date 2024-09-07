import { Router } from "express";
import controllerLogin from "../controllers/controller.login.js";

const routeLogin = Router();

routeLogin.get("/login/entrar", controllerLogin.Login);

export default routeLogin;