import axios from "axios";
import { CONSTANTES_SERVER } from "../style/const.js";

const apiTeste = axios.create({
    baseURL: CONSTANTES_SERVER.apiTeste_URL,
    headers: {
        'Authorization' : `Basic ${
            btoa(`${CONSTANTES_SERVER.credentials_username}:${CONSTANTES_SERVER.credentials_password}`)
        }`,
    }
})

export default apiTeste;