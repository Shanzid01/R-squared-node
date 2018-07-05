const MongoClient = require('mongodb').MongoClient;
const uri="mongodb+srv://common_user:xTp547a@r-squared-data-9sxhm.mongodb.net/region_data";
let CloudDB;

function initDB(db_name){
    return new Promise(async (resolve, reject)=>{
        console.log("Fetching DB..");
        let client=await MongoClient.connect(uri);
        CloudDB=client.db(db_name);
        console.log("DB Initialized: ", CloudDB.s.databaseName);
        resolve();
    });
}
module.exports = {
    getData : function(db_name, collection_name) {
        return new Promise(async (resolve, reject)=>{
            if(!CloudDB || CloudDB.s.databaseName!=db_name){await initDB(db_name);}
            CloudDB.collection(collection_name).find().toArray(function(err, items) {
                if(err) {reject(err)};
                resolve(items);
            });
        });
    },
    addData : function(db_name, collection_name, data) {
        return new Promise(async (resolve, reject)=>{
            if(!CloudDB || CloudDB.s.databaseName!=db_name){await initDB(db_name);}
            CloudDB.collection(collection_name, async function (err, collection) {
                if(err){reject(err);}
                let insert_task= await collection.insertOne(data);
                let data_id=insert_task["ops"][0]["_id"];
                if(data_id!=null){
                    resolve(data_id);
                }else{
                    reject();
                }
            });
        });
    },
    updateData : function(db_name, collection_name, criteria, new_data) {
        return new Promise(async (resolve, reject)=>{
            if(!CloudDB || CloudDB.s.databaseName!=db_name){await initDB(db_name);}
            CloudDB.collection(collection_name, async function (err, collection) {
                let update_task= await collection.update(criteria, { $set: new_data }, {w:1});
                resolve(update_task["result"]["nModified"]);
            });
        });
    },
    deleteData : function(db_name, collection_name, criteria) {
        return new Promise(async (resolve, reject)=>{
            if(!CloudDB || CloudDB.s.databaseName!=db_name){await initDB(db_name);}
            CloudDB.collection(collection_name, async function (err, collection) {
                let delete_task= await collection.remove(criteria);
                resolve(delete_task["result"]["n"]);
            });
        });
    },
    searchData : function(db_name, collection_name, criteria) {
        return new Promise(async (resolve, reject)=>{
            if(!CloudDB || CloudDB.s.databaseName!=db_name){await initDB(db_name);}
            CloudDB.collection(collection_name, async function (err, collection) {
                let results= await collection.find(criteria);
                resolve(results.toArray());
            });
        });
    }
}