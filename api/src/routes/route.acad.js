import { Router } from "express";
import controllerAcad from "../controllers/controller.acad.js";

const routeAcad = Router();

routeAcad.post("/acad/treino/criar", controllerAcad.CriarTreino);

export default routeAcad;