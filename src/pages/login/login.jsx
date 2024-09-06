import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return <>
        <div className="container-fluid">
            <h1>
                Login
            </h1>

            <div className="container">

                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
            </div>


        </div>

    </>
}

export default Login;