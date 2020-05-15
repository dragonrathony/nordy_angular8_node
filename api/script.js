const express = require('express');
var db = require('./config');
let Database = require('./database');
var cors = require('cors')
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json(),cors());
var async = require("async");
/*
let database = new Database({
    host     : '127.0.0.1',
    user     : 'Augurs',
    password : 'Augurs@9848',
    database : 'nrdmaxi'
});
*/
let database = new Database({
  host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'nrdmaxi'
});

var whitelist = ['http://localhost:8080/', 'http://example2.com','http://122.163.176.14:8080/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]
 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to Nordy REST API');
});

//READ Request Handlers
app.post('/api/login', (req, res, next) => {

    var parms  = [req.body.username,req.body.password];
    db.query('SELECT * FROM userdetails WHERE Username=? and Password=?', parms, function(err, result) {
      if (err){
        res.send(err);
      }else{
        res.send(result);
      }
    });
    
    });

//Add product form 
app.get('/api/ProductChar2', (req,res)=> {
    var response=false;
    var Family="";
    database.query( 'SELECT * FROM productchar1' ).then( result => {   
        database.query( 'SELECT * FROM productchar2 order by ProductCharFatherId' ).then( result2 => { 
            sbHtml = "<form role='form' ngNativeValidate class='form-horizontal' id='customFormAdd'   name='form'   #f='ngForm'> <div class='row'> <div class='col-md-12'><div class='card-box'>";
            
            async.forEach(result, function (element, callback){ 
                sbHtml+="<div class='form-group row'>" +
                            "<label class='col-sm-12 col-form-label'>" + element.Label + "</label>" +
                            "<div class='col-sm-12'>";
                //console.log(element)
                
                    
                        
                        i=0;
                        drobdownStart=false;
                        
                        async.forEach(result2, function (element2, callback){   
                             if(element.ProductCharFatherId==element2.ProductCharFatherId){
                                  if(element.FamilyMember==1){
                                    Family=element2.ProductChildNickName;
                                  }else{
                                    Family='NOFAMILY';
                                  }
                                    if(element2.ProductChildId==0){
                                        sbHtml+="<input type='number'   class='form-control' name='ProductCharFatherId-input-" + element.ProductCharFatherId + "-"+Family+"' id='ProductCharFatherId-" + element.ProductCharFatherId + "' />";
                                    }else{
                                        
                                        if(drobdownStart==false){
                                            sbHtml+="<select class='form-control' name='ProductCharFatherId-select-" + element.ProductCharFatherId + "' id='ProductCharFatherId-" + element.ProductCharFatherId + "' >";
                                            sbHtml+="<option value='0'>--Select--</option>";
                                            drobdownStart=true;
                                        }
                                        sbHtml+="<option value='" +element2.ProductChildId+"_" +Family+"'>"+element2.ProductChildDesc+"</option>";
                                        
                                       
                                    }
                            i++;
                            }
                            //callback();
                        });
                        if(drobdownStart==true)
                        sbHtml+="</select>";
                
                sbHtml+="</div></div>";
            }, function(err) {
                console.log('iterating done');
            }); 
            sbHtml+="<div class='form-group row'>" +
            "<label class='col-sm-12 col-form-label'>ProductCode *</label>" +
            "<div class='col-sm-12'>";
            sbHtml+="<input type='text'  required   class='form-control' name='ProductCode' id='ProductCode' /></div></div>";
            sbHtml+="<input type='hidden' value='"+Family+"'  required   class='form-control' name='Family' id='Family' />";
            sbHtml+="</div></div><div class='col-md-12 text-right'><button type='button' id='submitAddProduct' onclick='Window.myComponent.test()' class='btn btn-default'>Submit</button></div></div></form>"
               
                
           
            res.send(sbHtml);
        });
    });
});

app.post('/api/productSave', (req, res, next) => {

  
    formdata=req.body.raw;
    var noformfields=["ProductCode","Family"];
    //save data in producthead
    ProductCode=formdata[formdata.length-2].value;
    Family=formdata[formdata.length-1].value;
    database.query( 'INSERT INTO producthead(ProductCode,Family) VALUES(?,?)',[ProductCode,Family]).then( result => {       
       ProductHeaderID=result.insertId;
       
      Finalproductcode="";
      async.forEach(formdata, function (formdata, callback){     
      
        fieldName=formdata.name;
        
        if(noformfields.indexOf(fieldName)<0){
          //console.log(ProductHeaderID);
          filedNameArray=fieldName.split("-");
          if(filedNameArray[1]=="select")
          optionvalue=(formdata.value).split("_")

          console.log(optionvalue[0]);
          ProductCharChildId=filedNameArray[1]=="select"?optionvalue[0]:0;

          formdata.value=formdata.value==''?0:formdata.value;
          ProductCharChildValue=filedNameArray[1]=="select"?0:formdata.value;
          
          
          

          Finalproductcode+=(filedNameArray[1]=="select" && formdata.value!=0 && optionvalue[1]!="NOFAMILY")?optionvalue[1]:"";
          Finalproductcode+=(filedNameArray[1]!="select" && formdata.value!='' && filedNameArray[3]!="NOFAMILY")?filedNameArray[3]:"";

          database.query( 'INSERT INTO productbody(ProductHeaderID,ProductCharFatherId,ProductCharChildId,ProductCharChildValue) VALUES(?,?,?,?)',[ProductHeaderID,filedNameArray[2],ProductCharChildId,ProductCharChildValue] ).then( result => {
          
          
          });
       }
       
      });
      database.query( 'update producthead set Family=? where Id=?',[Finalproductcode,ProductHeaderID] ).then( result => {
          
          
      });
      console.log(Finalproductcode);
      res.send(req.body.raw);
        
    });
    
  
  
  });
 


app.get('/api/getProcess', (req, res) => { 
  
  database.query( 'select * from process where id>0').then( result => { 
    //console.log(result.length);
    res.send({result:result,error:0});
  });
 
});


//process api  
app.post('/api/familysave', (req, res) => {
  FamilyName=req.body.raw.FamilyName;
  familyProcess=req.body.raw.familyProcess;
  ProcessOrder=1;
  database.query( 'select * from family where FamilyName=?',[FamilyName]).then( result => { 
    //console.log(result.length);
    if(result.length>0){
      res.send({message:"Name already exists",error:1});
    }else{
      //find id of process
      database.query( 'select * from process').then( result2 => { 
        async.forEach(result2, function (element, callback){
          //get id of process
          ProcessOrder=0;
            async.forEach(familyProcess, function (familyProcesselement, callback){
              ProcessOrder=ProcessOrder+1;
              if(familyProcesselement==element.MachineName){
                ProcessOrder=familyProcess.indexOf(element.MachineName);
                ProcessOrder=ProcessOrder+1;
              database.query( 'INSERT INTO family(FamilyName,ProcessId,ProcessOrder) VALUES(?,?,?)',[FamilyName,element.Id,ProcessOrder]).then( result => {  
                
                
              });
              
            }
          });  
        });

        res.send({message:"Added Successfully",error:0});
      });
      
    }

  });
 
});


var FamilyRouter = require("./api/routes/family");
app.use('/', FamilyRouter );
 
var ProcessRouter = require("./api/routes/process");
app.use('/', ProcessRouter );


function validateBook(book) {
const schema = {
title: Joi.string().min(3).required()
};
return Joi.validate(book, schema);
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.timeout = 20000;
app.listen(port, () => console.log(`Listening on port ${port}..`));