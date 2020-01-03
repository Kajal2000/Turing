const express = require('express');
var mysql = require('mysql')
const app = express();

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'NAVGURUKUL1',
        database: 'Turing'
    }
}
let knex = require('knex')(options)

app.post('/orders',(req,res)=>{
    token = req.header
    jwt.verrify(token, "kajal",(err,data)=>{
        if(!err){

        }
        else{
            res.send()
        }
    })

})