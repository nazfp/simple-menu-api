//SETUP Express
//RECIPE BOOK API. handle JSON data to and fro

const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const MongoClient = mongodb.MongoClient;
// ./ means relative path
const MongoUtil = require("./MongoUtil");// path to MongoUtil.js 
const dotenv = require("dotenv");
dotenv.config();//modify the env variables 

const MONGO_URI = process.env.MONGO_URI;

let app = express();
app.use(express.json());//allow express to handle json and send json 
app.use(cors());

//ROUTING for API
async function main(){
    // let db = await connect();
    await MongoUtil.connect(MONGO_URI, "menu"); //switch to fake_recipes db
    
    const db = MongoUtil.getDB();

    //localhost:8888/recipes
    app.get('/recipes', async(req, res)=>{
        console.log(`getting recipes`)
        let recipes = await db.collection('menu-collection').find().toArray();
        res.status(200);
        res.send(recipes);
    })

    //deal with create 
    //deal with post
    app.post('/recipes', async(req,res)=>{
        //@TODO by right deal with some error handling 

        const results = await db.collection('menu-collection').insertOne({
            name: req.body.title,
            type: req.body.type,
            price: req.body.price
        });
        res.status(200);
        res.send(results);
    })
}


main();

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started..listing to PORT 8888`);
});