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
    knex.select("*").from('category').then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/API/:category_id",(res,req) => {
    let category_ID =  res.params.category_id
    knex("category").where("category_id",category_ID).then((connect)=>{
        req.send(connect)
        console.log("Your sec code is Right ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/get_inproduct/:product_id",(req,res) => {
    var product_id = req.params.product_id
    knex('category')
    .select('category.category_id','department_id','name')
    .join('product_category','category.category_id','=','product_category.category_id')
    .where('product_category.product_id',product_id).then((data)=>{
       res.send(data)
    }).catch((err)=>{
       res.send(err)
    })
});

app.listen(9900,function(){
    console.log("started port number")
});

