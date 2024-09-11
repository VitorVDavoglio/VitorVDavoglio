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
            acad_treino
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

function CriarExercicio(key_grupo_exercicio, key_treino, callback){
  
    let ssql = `
        INSERT INTO 
            acad_exercicio(key_grupo_exercicio, key_treino)
        VALUES
            (?, ?)
    `
 
    dbConfigMaestro.query(ssql, [key_grupo_exercicio, key_treino], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, 'Exercício inserido com sucesso')
        }
    })
}

function PuxarExerciciosTreino(id_treino ,callback){
   
    let ssql = `
        SELECT
            agm.nome AS nome_muscular,
            COUNT(*) AS quantidade
        FROM
            acad_treino at
        JOIN
            acad_exercicio ae ON ae.key_treino = at.id_treino
        JOIN
            acad_grupo_exercicio age ON age.id_grupo_exercicio = ae.key_grupo_exercicio
        JOIN
            acad_grupo_muscular agm ON agm.id_grupo_muscular = age.key_grupo_muscular
        WHERE
            at.id_treino = ?
        GROUP BY
            agm.nome;
    `
 
    dbConfigMaestro.query(ssql, [id_treino], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, result)
        }
    })
}
 
export default { 
    CriarTreino, PuxarTreinoAberto, PuxarGrupoMuscular, PuxarGrupoExercicio, 
    CriarExercicio, PuxarExerciciosTreino, 
}
 