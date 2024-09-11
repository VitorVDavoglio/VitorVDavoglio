import { dbConfigMaestro } from "../config/database.js";

function CriarTreino(hora_inicio, callback){
  
    let ssql = `
        INSERT INTO
            acad_treino(data_inicio)
        VALUES
            (?)
    `
 
    dbConfigMaestro.query(ssql, [hora_inicio], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, 'Dado inserido com sucesso')
        }
    })
}
 
function PuxarTreinoAberto(callback){
   
    let ssql = `
        SELECT
            *
        FROM
            maestro.acad_treino
        WHERE
            data_fim IS NULL
    `
 
    dbConfigMaestro.query(ssql, function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, result)
        }
    })
}

function PuxarGrupoMuscular(callback){
   
    let ssql = `
        SELECT 
            * 
        FROM
            acad_grupo_muscular
        ORDER BY 
            nome ASC; 
    `
 
    dbConfigMaestro.query(ssql, function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, result)
        }
    })
}

function PuxarGrupoExercicio( key_grupo_muscular, callback){
   
    let ssql = `
        SELECT 
            id_grupo_exercicio,
            nome,
            icone
        FROM
            acad_grupo_exercicio
        WHERE
            key_grupo_muscular = ?
        ORDER BY 
            nome ASC;
    `
 
    dbConfigMaestro.query(ssql, [key_grupo_muscular], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, result)
        }
    })
}
 
export default { CriarTreino, PuxarTreinoAberto, PuxarGrupoMuscular, PuxarGrupoExercicio}
 