import mysql from "mysql";

const dbConfigSite = mysql.createPool({

});


const dbConfigMaestro = mysql.createPool({

});


export { dbConfigSite, dbConfigMaestro };