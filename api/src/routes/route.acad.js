import { Router } from "express";
import controllerAcad from "../controllers/controller.acad.js";

const routeAcad = Router();

routeAcad.get("/acad/treino/criar", controllerAcad.CriarTreino);

export default routeAcad;