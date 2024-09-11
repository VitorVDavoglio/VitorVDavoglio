import modelAcad from "../models/model.acad.js";

function CriarTreino(request, response){

    if(!request.query.hora_inicio){
        console.log('Não há dados para salvar');
        response.status(400).send('Treino não iniciado, não há data de início.')
    }else{
        modelAcad.CriarTreino(request.query.hora_inicio, function(err, result){
           if(err){
               response.status(500).send(err);
            } else {
               response.status(200).send(result);
            }
        })
    }
};

function PuxarTreinoAberto(request, response){

    modelAcad.PuxarTreinoAberto(function(err, result){
       if(err){
           response.status(500).send(err);
        } else {

            let completo = []

            result.map(dado => {
                console.log(dado.id_treino)

                PuxarExerciciosTreino(dado.id_treino)
            })

            // console.log(completo)


        //    response.status(200).send(result);
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

function CriarExercicio(request, response){

    if(!request.query.key_grupo_exercicio || !request.query.key_treino){
        console.log('Não há dados para salvar');
        response.status(400).send('Exercício não iniciado, há erro nos dados.')
    }else{
        modelAcad.CriarExercicio(request.query.key_grupo_exercicio, request.query.key_treino, function(err, result){
           if(err){
               response.status(500).send(err);
            } else {
               response.status(200).send(result);
            }
        })
    }
};

function PuxarExerciciosTreino(request, response){

    modelAcad.PuxarExerciciosTreino(request, function(err, result){
       if(err){
           response.status(500).send(err);
        } else {
            result.id_treino = request;
            console.log(result)
        //    response.status(200).send(result);
        }
   })
};


export default { 
    CriarTreino, PuxarTreinoAberto, PuxarGrupoMuscular, PuxarGrupoExercicio,
    CriarExercicio, PuxarExerciciosTreino
}