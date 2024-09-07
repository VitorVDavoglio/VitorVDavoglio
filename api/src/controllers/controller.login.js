import modelLogin from "../models/model.login.js";

function Login(request, response){

    // console.log(request.query);

    modelLogin.Login(request.query.nome, request.query.senha, function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    })
}

export default { Login, }