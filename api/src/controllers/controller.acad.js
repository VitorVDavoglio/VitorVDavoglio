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
            // TODO colocar a parte de musculo e quantidade e clicar em cima
            const completo = []

            result.map(dado => {
                console.log(dado.id_treino)

                PuxarExerciciosTreinoAberto(dado.id_treino)
            })

            // console.log(completo)


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

function PuxarExerciciosTreinoAberto(request, response){

    modelAcad.PuxarExerciciosTreinoAberto(request, function(err, result){
       if(err){
           response.status(500).send(err);
        } else {
            result.id_treino = request;
            console.log(result);
        //    response.status(200).send(result);
        }
   })
};

function PuxarExerciciosTreino(request, response){

    modelAcad.PuxarExerciciosTreino(request.query.key_treino, function(err, result){
       if(err){
           response.status(500).send(err);
        } else {
           response.status(200).send(result);
        }
   })
};

function CriarSerie(request, response){

    modelAcad.CriarSerie(
        request.query.key_exercicio, 
        request.query.num_series,
        request.query.repeticoes,
        request.query.carga,
        request.query.descanso, 
        function(err, result){
       if(err){
           response.status(500).send(err);
        } else {
           response.status(200).send(result);
        }
   })
};

function PuxarSerie(request, response){

    modelAcad.PuxarSerie(request.query.key_exercicio, function(err, result){
       if(err){
           response.status(500).send(err);
        } else {
           response.status(200).send(result);
        }
   })
};


export default { 
    CriarTreino, PuxarTreinoAberto, PuxarGrupoMuscular, PuxarGrupoExercicio,
    CriarExercicio, PuxarExerciciosTreino, PuxarExerciciosTreinoAberto,
    CriarSerie, PuxarSerie, 
}