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
            callback(undefined, 'Trenio iniciado com sucesso')
        }
    })
}

function FinalizarTreino(data_fim, id_treino, callback){
  
    let ssql = `
        UPDATE 
            acad_treino set data_fim = ?
        WHERE 
            id_treino = ?
    `
 
    dbConfigMaestro.query(ssql, [data_fim, id_treino], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, 'Treino finalizado com sucesso')
        }
    })
}
 
function PuxarTreino(callback){
   
    let ssql = `
        SELECT
            *
        FROM
            acad_treino
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
function PuxarExerciciosTreinoAberto(id_treino ,callback){
   
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
            at.id_treino = ? AND 
            at.data_fim IS NULL
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
            at.data_inicio,
            at.data_fim,
            ae.id_exercicio,
            age.nome AS nome_exercicio,
            agm.nome AS nome_muscular
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
        ORDER BY 
		    age.nome ASC
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

function CriarSerie(key_exercicio, num_series, repeticoes, carga, descanso, callback){
  
    let ssql = `
        INSERT INTO
            acad_series(key_exercicio,num_series,repeticoes,carga,descanso)
        VALUES
            (?,?,?,?,?)
    `
 
    dbConfigMaestro.query(ssql, [key_exercicio, num_series, repeticoes, carga, descanso], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, 'Série inserida com sucesso')
        }
    })
}

function PuxarSerie(key_exercicio ,callback){
   
    let ssql = `
        SELECT 
            num_series,
            repeticoes,
            carga,
            descanso
        FROM
            acad_series
        WHERE
            key_exercicio = ?
        ORDER BY
            id_serie ASC
    `
 
    dbConfigMaestro.query(ssql, [key_exercicio], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, result)
        }
    })
}
 
export default { 
    CriarTreino, PuxarTreino, PuxarGrupoMuscular, PuxarGrupoExercicio, 
    FinalizarTreino,
    CriarExercicio, PuxarExerciciosTreino, PuxarExerciciosTreinoAberto, 
    CriarSerie, PuxarSerie, 
}
 