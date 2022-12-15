//create a nodejs module to be used
//modules allow functions and data to be shared across diff JS files
const MongoClient = require("mongodb").MongoClient;

//rememeber which db is being used
let _db = null;

//allow to connect to db of choice
//
async function connect(url, databaseName){
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    })

    //set the selected database
    _db = client.db(databaseName);//client.db(db) == use db
}

function getDB(){
    return _db;
}

//share function connect, getDB 
module.exports = { connect, getDB }