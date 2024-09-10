import axios from "axios";
import { CONSTANTES_SERVER } from "../style/const.js";

const apiTeste = axios.create({
    baseURL: CONSTANTES_SERVER.apiTeste_URL,
})

export default apiTeste;