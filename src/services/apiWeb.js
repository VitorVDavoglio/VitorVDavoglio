import axios from "axios";
import { CONSTANTES_SERVER } from "../style/const.js";

const apiWeb = axios.create({
    baseURL: CONSTANTES_SERVER.apiWeb_URL,
})

export default apiWeb;