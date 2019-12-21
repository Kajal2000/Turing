const express = require('express');
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

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

app.get('/api/department',(res,req) => {
    knex.select("*").from('department').then((connect)=>{
        req.json(connect)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/api1/:department_id",(res,req) => {
    let department_ID =  res.params.department_id
    knex("department").where("department_id",department_ID).then((connect)=>{
        req.send(connect)
        console.log("Your sec code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})
app.listen(8004,function(){
    console.log("Started your pot number")
});



