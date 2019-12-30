const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

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

app.post('/shopping',(req,res) => {
    const con = {
        item_id : req.body.item_id,
        cart_id : req.body.cart_id,
        product_id : req.body.product_id,
        attributes : req.body.attributes,
        quantity : req.body.quantity,
        added_on : new Date()
    };
    knex('shopping_cart').insert(con).then((data) => {
        console.log("data inserted");
        res.send(data);
    })
})

app.get('/shopping_cart/:cart_id',(req,res) => {
    let cart_ID = req.params.cart_id
    knex('shopping_cart').where("cart_id",cart_ID).then((data1) => {
        res.send(data1)
        console.log("code is working")
    })
})

app.put('/shopping_cart/:item_id',(req,res)=>{
    let item_ID = req.params.item_id
    knex("shopping_cart")
    .join("product","shopping_cart.product_id", "=", "product.product_id")
    .select("shopping_cart.product_id","attributes","item_id","quantity","product.name","price")
    .where("item_id",item_ID).then((data)=>{
        // res.send(data)
        // console.log()
    var data1 = { 
        subtotal: data[0]["quantity"]*data[0]["price"],
        product_id : data[0]["product_id"],
        attributes : data[0]["attributes"],
        item_id : data[0]["item_id"],
        quantity : data[0]["quantity"],
        name : data[0]["name"],
        price : data[0]["price"] 
    }
    res.send(data1)
    })
})

app.delete('/empty',(req,res) => {
    var db_data = {
        item_id  : req.body.item_id,
        cart_id : req.body.cart_id,
        product_id : req.body.product_id,
        attributes : req.body.attributes,
        quantity : req.body.quantity ,
        buy_now : req.body.buy_now 
    }
    knex('shopping_cart')
        .where({cart_id:req.body.cart_id})
        .del(db_data).then((data) => {
            Console.log("delete ho gya")
    })
})

app.get('/totalAmount/:cart_id',(req,res)=>{
    let cart_ID = req.params.cart_id
    knex("shopping_cart")
    .join("product","shopping_cart.product_id", "=", "product.product_id")
    .select("shopping_cart.quantity","product.price")
    .where("cart_id",cart_ID).then((data)=>{
        var store_data = {
            totalAmount : data[0]["quantity"]*data[0]["price"]
        }
        res.send(store_data)
    })      
})


// var knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: 'localhost',
//         user: 'root',
//         password: 'NAVGURUKUL1',
//         database: 'Turing'
//     }
// })
// knex.schema.createTable('saveForLater', (table) => {
//     table.integer('item_id')
//     table.integer('cart_id')
//     table.integer('product_id')
//     table.string('attributes')
//     table.integer('quantity')
//     table.integer('buy_now')
//     table.integer('added_on')
//   }).then(() => console.log("table created"))
//       .catch((err) => { console.log(err); throw err })
    
// app.get("/saveForLater/:item_id",(res,req)=>{
//     knex("shopping_cart")
//     .select("item_id","cart_id","product_id","attributes","quantity")
//     .where('shopping_cart.item_id',req.params.item_id)
//     .then((data)=>{
//         console.log(data)
    
//     })
// })

app.get('/saveForLater/:item_id',(req,res) => {
    let item_ID = req.params.item_id
    knex('shopping_cart').where("item_id",item_ID).then((data1) => {
        res.send(data1)
        // knex('saveForLater')
        // .insert(data1[0])
        // .then((data1)=>{
        //     res.send(data1)
        //     console.log("data inserted ")
        // })
    })
})
app.listen(3311,function(){
    console.log("Started on PORT 3330");
});