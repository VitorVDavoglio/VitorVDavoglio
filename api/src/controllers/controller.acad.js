import modelAcad from "../models/model.acad.js";

function CriarTreino(request, response){

    modelAcad.CriarTreino(request.query.hora_inicio, function(err, result){
       if(err){
           response.status(500).send(err);
       } else {
           response.status(200).send(result);
       }
    })
};

function PuxarTreinoAberto(request, response){

    modelAcad.PuxarTreinoAberto(function(err, result){
       if(err){
           response.status(500).send(err);
       } else {
           response.status(200).send(result);
       }
    })
};

function PuxarGrupoMuscular(request, response){

    modelAcad.PuxarGrupoMuscular(function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    })
};

function PuxarGrupoExercicio(request, response){

    modelAcad.PuxarGrupoExercicio(request.query.key_grupo_muscular, function(err, result){
       if(err){
           response.status(500).send(err);
       } else {
           response.status(200).send(result);
       }
   })
};



export default { CriarTreino, PuxarTreinoAberto, PuxarGrupoMuscular, PuxarGrupoExercicio}