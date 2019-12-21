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

app.get('/api',(res,req) => {
    knex.select("*").from('attribute').then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})
app.get("/api/:attribute_id",(res,req) => {
    let attribute_ID =  res.params.attribute_id
    knex("attribute").where("attribute_id",attribute_ID).then((connect)=>{
        req.send(connect)
        console.log("Your sec code is Right ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/API/:attribute_id",(res,req) => {
    let attribute_id =  res.params.attribute_id
    knex("attribute_value")
    .select("attribute_value.attribute_value_id","value")
    .where("attribute_id",attribute_id).then((connect)=>{
        req.send(connect)
        console.log("Your third code is Right :) ")
    })
})

app.get("/api_attribute/:product_id",(res,req) => {
    let product_ID =  res.params.product_id
    knex("attribute")
    .join("attribute_value","attribute.attribute_id", "=" ,"attribute_value.attribute_id")
    .join("product_attribute","attribute_value.attribute_value_id", "=" ,"product_attribute.attribute_value_id")
    .select("attribute_value.attribute_value_id","value","attribute.name")
    .where("product_id",product_ID).then((connect)=>{
        req.send(connect)
        console.log("Your code is working :) ")
    })
})
app.listen(9901,function(){
    console.log("started port number")
});
