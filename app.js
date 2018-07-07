const DBHelper=require('./DB_helper');
RunProgram();

async function RunProgram(){
    //bulkUpload();

    //add data
    var newData_id=await DBHelper.addData("region_data","crud_data",[{username:'xyz', login:Math.random()}]);
    console.log("Data added: "+newData_id);

    //read all data
    var data = await DBHelper.getData("region_data","crud_data");
    console.log("Data read: ",data);
    
    //update data
    var updateStat= await DBHelper.updateData("region_data","crud_data",{_id:newData_id},{username:'shanzid', login:Math.random()});
    console.log("Data updated: "+updateStat+ " row(s) affected.");

    //search data
    var searchResults= await DBHelper.searchData("region_data","crud_data",{username:'shanzid'});
    console.log("Data searched: ",searchResults);

    //delete data
    var deleteStat= await DBHelper.deleteData("region_data","crud_data",{username:'shanzid'});
    console.log("Data deleted: "+deleteStat+ " row(s) affected.");
}


/* async function bulkUpload(){
    var all_data = require('./data/zila_data.json');
    var newData_id=await DBHelper.addData("region_data","zila_data_cleaned",all_data);
    console.log("Data added: ",newData_id);
} */