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

app.get("/Api",(res,req) =>{
    knex("*").from("shipping_region").then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/Api/:shipping_id",(res,req) => {
    let shipping_ID = res.params.shipping_id
    knex("shipping").where("shipping_id",shipping_ID).then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
})
app.listen(9901,function(){
    console.log("started port number")
});