import { Router } from "express";
import controllerAcad from "../controllers/controller.acad.js";

const routeAcad = Router();

routeAcad.get("/acad/treino/criar", controllerAcad.CriarTreino);
routeAcad.get("/acad/treino/finalizar", controllerAcad.FinalizarTreino);
routeAcad.get("/acad/puxarTreino", controllerAcad.PuxarTreino);
routeAcad.get("/acad/grupoMuscular", controllerAcad.PuxarGrupoMuscular);
routeAcad.get("/acad/grupoExercicio", controllerAcad.PuxarGrupoExercicio);

routeAcad.get("/acad/exercicio/criar", controllerAcad.CriarExercicio);
routeAcad.get("/acad/exercicios", controllerAcad.PuxarExerciciosTreino);
routeAcad.get("/acad/serie/criar", controllerAcad.CriarSerie);
routeAcad.get("/acad/series", controllerAcad.PuxarSerie);

export default routeAcad;