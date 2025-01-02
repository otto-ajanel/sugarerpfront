import knex from "knex";
import dotenv from 'dotenv';

dotenv.config(); 

const sugarerpClientDB = knex({
    client:'pg',
    connection:{
        host: process.env.sugarERP_host,
        user: process.env.sugarERP_user,
        password: process.env.sugarERP_password,
        database: process.env.sugarERP_database
    }
})

export default sugarerpClientDB