import axios from "axios";
import { CONSTANTES_SERVER } from "../style/const.js";

const apiWeb = axios.create({
    baseURL: CONSTANTES_SERVER.apiWeb_URL,
    headers: {
        'Authorization' : `Basic ${
            btoa(`${CONSTANTES_SERVER.credentials_username}:${CONSTANTES_SERVER.credentials_password}`)
        }`,
    }
})

export default apiWeb;