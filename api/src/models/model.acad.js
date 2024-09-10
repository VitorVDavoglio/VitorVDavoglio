import { dbConfig } from "../config/database.js";

function CriarTreino(hora_inicio, callback){
    
    let ssql = `
        INSERT INTO 
            acad_treino(data_inicio)
        VALUES
            (?)
    ` 

    dbConfig.query(ssql, [hora_inicio], function(err, result){
        if(err){
            callback(err, []);
        }
        else{
            callback(undefined, 'Dado inserido com sucesso')
        }
    })
}

export default { CriarTreino, }