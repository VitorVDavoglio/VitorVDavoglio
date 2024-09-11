import { Router } from "express";
import controllerAcad from "../controllers/controller.acad.js";

const routeAcad = Router();

routeAcad.get("/acad/treino/criar", controllerAcad.CriarTreino);
routeAcad.get("/acad/treinoAberto", controllerAcad.PuxarTreinoAberto);
routeAcad.get("/acad/grupoMuscular", controllerAcad.PuxarGrupoMuscular);
routeAcad.get("/acad/grupoExercicio", controllerAcad.PuxarGrupoExercicio);

export default routeAcad;