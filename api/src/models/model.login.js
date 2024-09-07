import { dbConfig } from "../config/database.js";

function Login(nome, senha, callback){

    let ssql =`
        SELECT
            id,
            nome,
            permissao
        FROM
            login
        WHERE
            nome = ? AND
            senha = ?
    
    `

    dbConfig.query(ssql, [nome, senha], function(err, result){
        if(err){
            callback(err, 'Erro ao conectar com o banco');
        } else {
            callback(undefined, result[0]);
        }
    });
}

export default { Login, }