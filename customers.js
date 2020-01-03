const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
const jwt = require('jsonwebtoken')

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

app.post("/login",(req,res) => {
    var pass = req.body.password;
    var eml = req.body.email;
    knex.select("*").from("customer").havingIn("customer.email",eml).then((logindata) => {
        if (logindata.length == 0){
            res.send("wrong h email")
        }else{
            knex.select("*").from("customer").havingIn("customer.password",pass).then((logindata) => {
                if (logindata.length == 0){
                    res.send("Wrong h password")
                }else{
                    let newToken = jwt.sign({ "costomer" : logindata }, "kajal")
                        console.log(newToken)
                        res.send('loing successsful')
                }
            })
        }
    })
});

app.put('/customers/address',(req,res)=>{
    con = {
        customer_id : req.body.customer_id,
        address_2 : req.body.address_2
    }
    knex('customer').where({customer_id:req.body.customer_id})
    .update(con).then((data) => {
        console.log("data inserted");
        res.send(data);
    })
})

app.put('/customers/creditCard',(req,res)=>{
    store_data = {
        credit_card : req.body.credit_card,
        country : req.body.country,
        // name : req.body.name
    }
    knex('customer').where({customer_id:req.body.customer_id})
    .update(store_data).then((data)=>{
        console.log("data inserted")
        res.send(data)
    })
})
app.listen(8000,function(){
    console.log("Started on PORT 8010");
});
