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

app.get("/GetApi",(res,req) =>{
    knex("*").from("product").then((data)=>{
        req.json(data)
        console.log("Your code is Right :) ")
    })
    .catch((err)=>{
        console.log("There is somthing error :( ")
    })
})

app.get("/api/:product_id",(res,req) =>{
    let product_ID = res.params.product_id
    knex("product").where("product_id",product_ID).then((data)=>{
        req.send(data)
        console.log("your is Working")
    })
})

app.get("/get_id/:category_id",(res,req)=>{
    let category_ID= res.params.category_id
    knex("product")
    .join("product_category","product.product_id", "=" ,"product_category.product_id")
    .select("product.product_id","name","description","price","discounted_price","thumbnail","product_category.product_id")
    .where("category_id",category_ID).then((connect)=>{
        req.send(connect)
        console.log("Your code is working :) ")
    })
})

app.get("/getApi/:department_id",(res,req)=>{
    let department_ID = res.params.department_id
    knex("product")
    .join("department","product.product_id","department.department_id")
    .select("*")
    .where("department_id",department_ID).then((data)=>{
        req.send(data)
        console.log("code is working")
    })
})

app.get("/GetApi/:product_id",(res,req) =>{
    let product_ID = res.params.product_id
    knex("product").where("product_id",product_ID).then((data)=>{
        req.send(data)
        console.log("your is Working")
    })
})

app.get("/product/:product_id",(res,req) =>{
    let product_ID = res.params.product_id
    knex("product_category")
    .join("category","product_category.category_id","=", "category.category_id")
    .join("department","category.department_id", "=", "department.department_id")
    .select("department.department_id","department.name as name", "category.category_id","category.name as name_1")
    .where("product_id",product_ID).then((data)=>{
        req.send(data)
        console.log("your is Working :)")
    })
})

// app.post("/product_review/:product_id",(res,req) =>{
//     let product_ID = res.params.product_id
//     knex("product_category")
//     .join("category","product_category.category_id","=", "category.category_id")
//     .join("department","category.department_id", "=", "department.department_id")
//     .select("department.department_id","department.name as name", "category.category_id","category.name as name_1")
//     .where("product_id",product_ID).then((data)=>{
//         req.send(data)
//         console.log("your is Working :)")
//     })
// })


app.get("/product_search/:search",(res,req)=>{
    let name_search = res.params.search
    knex("product").where('product_id', 'like', name_search).then((connect)=>{
        req.send(connect)
        console.log("Your sec code is Right ")
    })
})
app.listen(9901,function(){
    console.log("started port number")
});