import express from "express";
import cors from "cors";
import expressBasicAuth from "express-basic-auth";

import routeLogin from "./routes/route.login.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(expressBasicAuth({
    authorizer: function(usuario, senha){
        return expressBasicAuth.safeCompare(usuario, "") && expressBasicAuth.safeCompare(senha, "");
    }
}));


// Rotas
app.use(routeLogin);

const port = 3002;

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
})