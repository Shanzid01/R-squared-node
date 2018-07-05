var DBHelper=require('./DB_helper');
RunProgram();

async function RunProgram(){
    //add data
    var newData_id=await DBHelper.addData("region_data","crud_data",{username:'xyz', login:Math.random()});
    console.log("Data added: "+newData_id);

    //read all data
    var data = await DBHelper.getData("region_data","crud_data");
    console.log(data);
    
    //update data
    var updateStat= await DBHelper.updateData("region_data","crud_data",{_id:newData_id},{username:'shanzid', login:Math.random()});
    console.log(updateStat+ " row(s) affected.");

    //search data
    var searchResults= await DBHelper.searchData("region_data","crud_data",{username:'shanzid'});
    console.log(searchResults);

    //delete data
    var updateStat= await DBHelper.deleteData("region_data","crud_data",{username:'shanzid'});
    console.log(updateStat+ " row(s) affected.");
}