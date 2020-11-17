const express = require('express');
// const people = require('./people.json');
const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('index')
});
const port = process.env.port || 8080;
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit: '50mb'}))

app.post('/submit', (req,res)=>{  
    var Connection = require('tedious').Connection;  
    var config = {  
        server: 'kingstondb.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'kingstondb', //update me
                password: 'Nguyentheduy1@'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'kingston_event'  //update me
        }
    };  
    var connection = new Connection(config); 
    var ok=1; 
    connection.on('connect', function(err) {  
        if(!err){
          console.log("Connected");  
          executeStatement1();  
        }else{
          res.render("error")
          ok=0;
        }
        // If no error, then good to proceed.  
    });  
  
    var Request = require('tedious').Request  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement1(){
      request = new Request("INSERT INO [dbo].[register]([name],[phone],[addr],[email],[purchasedPro],[receiptNum],[bill]) VALUES(@user_name,@user_phone,@user_addr,@email_check,@user_where,@user_product,@thum_base64)", function(err) {  
       if (err) {  
           console.log(err);  
           ok=0;
           res.render("error") }  
       });  
       request.addParameter('user_name', TYPES.NVarChar,req.body.user_name);  
       request.addParameter('user_phone', TYPES.NVarChar , req.body.user_phone);  
       request.addParameter('user_addr', TYPES.NVarChar , req.body.user_addr);  
       request.addParameter('email_check', TYPES.NVarChar , req.body.email_check);  
       request.addParameter('user_where', TYPES.NVarChar , req.body.user_where);  
       request.addParameter('user_product', TYPES.NVarChar , req.body.user_product);  
       request.addParameter('thum_base64', TYPES.NVarChar , req.body.thum_base64);  
       request.on('row', function(columns) {  
           columns.forEach(function(column) {  
             if (column.value === null) {  
               console.log('NULL');  
             } else {  
               console.log("Product id of inserted item is " + column.value);  
             }  
           });  
       });       
       connection.execSql(request);  
    }
    res.contentType('json');
    res.send({ some: JSON.stringify({response:ok}) });
});
