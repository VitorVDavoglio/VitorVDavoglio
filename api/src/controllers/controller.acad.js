import modelAcad from "../models/model.acad.js";

function CriarTreino(request, response){

    console.log(request.query);

    modelAcad.CriarTreino(request.query.hora_inicio, function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    })
};


export default { CriarTreino, }