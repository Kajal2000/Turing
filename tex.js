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

app.get('/GetApi',(res,req) =>{
    knex.select("*").from("tax").then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/API/:tax_id",(res,req) => {
    let tax_ID =  res.params.tax_id
    knex("tax").where("tax_id",tax_ID).then((connect)=>{
        req.send(connect)
        console.log("Your sec code is Right ")
    })
})
app.listen(9900,function(){
    console.log("started port number")
});



