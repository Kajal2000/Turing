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

app.post('/customers',(req,res) => {
    const con = {
        name: req.body.name,
        customer_id: req.body.customer_id,
        email: req.body.email,
        password:req.body.password,
        address_1 : req.body.address_1,
        mob_phone : req.body.mob_phone,
        city : req.body.city
    };
    knex('customer').insert(con).then((data) => {
        console.log("data inserted");
        res.send(data);
    })
});


app.put('/customers',(req,res) => {
    const con = {
        name: req.body.name,
        customer_id: req.body.customer_id,
        email: req.body.email,
        password:req.body.password,
        address_1 : req.body.address_1,
        mob_phone : req.body.mob_phone,
        city : req.body.city
    };
    knex('customer').where({customer_id:req.body.customer_id})
    .update(con).then((data) => {
        console.log("data inserted");
        res.send(data);
    })
});

app.get("/getCustomers",(res,req) =>{
knex.select("*").from("customer").then((data)=>{
    req.json(data)
    console.log("data get")
    })
})
app.listen(8000,function(){
    console.log("Started on PORT 8000");
});