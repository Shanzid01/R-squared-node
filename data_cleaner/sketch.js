let json_data;
function preload() {
    json_data = loadJSON("zila_data_forexport.json");
    console.log("Json loaded.");
  }

function setup(){
    var noSpace=removeSpace(json_data);
    var output=makeTree(noSpace);
    saveJSON(output, 'zila_data.json');
    console.log(output)
    console.log(noSpace);
}

function makeTree(input_data){
    var output=[];
    input_data.forEach(row => {
        let template_education={ lt_primary:{}, primary:{}, secondary:{}, university:{}};
        let template_poverty={};
        let template_employment={agriculture:{}, industry:{}, services:{}};
        let template_attendance={'6-10':{}, '6-18':{},'11-13':{},'14-15':{},'16-18':{}};
        let template_electricity={};
        let template_flush_toilet={};
        let template_literate_population={};
        let template_latrine={};
        let template_bottom_40={};
        let template_underweight_children={};
        let template_poverty_headcount={};
        let template_shape={};
        let new_row={};
        Object.entries(row).forEach(
            ([key, value]) => {
                if(key.indexOf('educational_attainment')>0){
                    var level;
                    if(key.indexOf('less_than_primary')>0){
                       level='lt_primary';
                    }else if(key.indexOf('primary')>0 && key.indexOf('less')<0){
                        level='primary';
                    }else if(key.indexOf('secondary')>0){
                        level='secondary';
                    }else if(key.indexOf('university')>0){
                        level='university';
                    }
                    if(key.indexOf('(%)')>0){
                        template_education[level].percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_education[level].n=value;
                    }else{
                        template_education[level].total=value;
                    }
                    new_row['educational_attainment']=template_education;
                }else if(key.indexOf('extreme_poverty_headcount')>0 || key.indexOf('extreme_poor')>0){
                    if(key.indexOf('(%)')>0){
                        template_poverty.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_poverty.total=value;
                    }else{
                        template_poverty.ratio=value;
                    }
                    new_row['extreme_poverty']=template_poverty;
                }else if(key.indexOf('primary_employment')>0){
                    var sector;
                    if(key.indexOf('_agriculture')>0){
                        sector='agriculture';
                    }else if(key.indexOf('industry')>0){
                        sector='industry';
                    }else{
                        sector='services';
                    }
                    if(key.indexOf('(%)')>0){
                        template_employment[sector].percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_employment[sector].n=value;
                    }else{
                        template_employment[sector].total=value;
                    }
                    new_row['primary_employment']=template_employment;
                }else if(key.indexOf('school_attendance')>0){
                    var age_group;
                    if(key.indexOf('6-10')>0){
                        age_group='6-10';
                    }else if(key.indexOf('6-18')>0){
                        age_group='6-18';
                    }else if(key.indexOf('11-13')>0){
                        age_group='11-13';
                    }else if(key.indexOf('14-15')>0){
                        age_group='14-15';
                    }else{
                        age_group='16-18';
                    }
                    if(key.indexOf('(%)')>0){
                        template_attendance[age_group].percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_attendance[age_group].n=value;
                    }else{
                        template_attendance[age_group].total=value;
                    }
                    new_row['student_school_attendance']=template_attendance;
                }else if(key.indexOf('households_with_electricity')>0){
                    if(key.indexOf('(%)')>0){
                        template_electricity.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_electricity.n=value;
                    }else{
                        template_electricity.total=value;
                    }
                    new_row['households_with_electricity']=template_electricity;
                }else if(key.indexOf('households_with_flush_toilet')>0){
                    if(key.indexOf('(%)')>0){
                        template_flush_toilet.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_flush_toilet.n=value;
                    }else{
                        template_flush_toilet.total=value;
                    }
                    new_row['households_with_flush_toilet']=template_flush_toilet;
                }else if(key.indexOf('literate_population')>0){
                    if(key.indexOf('(%)')>0){
                        template_literate_population.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_literate_population.n=value;
                    }else{
                        template_literate_population.total=value;
                    }
                    new_row['literate_population']=template_literate_population;
                }else if(key.indexOf('latrine')>0){
                    if(key.indexOf('(%)')>0){
                        template_latrine.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_latrine.n=value;
                    }else{
                        template_latrine.total=value;
                    }
                    new_row['latrine']=template_latrine;
                }else if(key.indexOf('bottom_40')>0){
                    if(key.indexOf('(%)')>0){
                        template_bottom_40.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_bottom_40.n=value;
                    }else{
                        template_bottom_40.total=value;
                    }
                    new_row['percentage_of_population_in_bottom_40%']=template_bottom_40;
                }else if(key.indexOf('underweight_children')>0){
                    if(key.indexOf('(%)')>0){
                        template_underweight_children.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_underweight_children.n=value;
                    }
                    new_row['underweight_children']=template_underweight_children;
                }else if(key.indexOf('poverty_headcount')>0 || key.indexOf('number_of_poor')>0){
                    if(key.indexOf('(%)')>0){
                        template_poverty_headcount.percent=value;
                    }else if(key.indexOf('(n)')>0){
                        template_poverty_headcount.total=value;
                    }else{
                        template_poverty_headcount.ratio=value;
                    }
                    new_row['poverty']=template_poverty_headcount;
                }else if(key.indexOf('shape')>0){
                    if(key.indexOf('area')>0){
                        template_shape.area=value;
                    }else{
                        template_shape.leng=value;
                    }
                    new_row['shape']=template_shape;
                }else{
                    new_row[key]=value;
                }
            }
        );
        output.push(new_row);
    });
    return output;
}



function removeSpace(input_data){
    var output=[];
    input_data["data"].forEach(row => {
        let new_row={};
        Object.entries(row).forEach(
            ([key, value]) => {
                let new_column_name=key.replaceAll(" ", "_").toLowerCase();
                let new_int_value=value;
                if(!isNaN(value)){
                    new_int_value=Math.round((Number.parseFloat(value)) * 100) / 100;
                }
                new_row[`"${new_column_name}"`]=new_int_value;
            }
        );
        output.push(new_row);
    });
    return output;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};