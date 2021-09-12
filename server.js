var express = require('express');
var body_parser = require("body-parser");
var app = express();
var path =  require("path");
var axios = require('axios');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
var static_path = path.join(__dirname,'./view');

app.use(express.static(static_path));

var output;

app.post('/data', function(req,res)
{
    console.log(req.body);

    var data = req.body;

    var config = {
            method:'post',
            url:"https://codexweb.netlify.app/.netlify/functions/enforceCode",
            headers:{
                "Content-type":"application/json"
            },
            data:data
    };

    axios(config).then((response)=>{
        console.log(response.data.output);
        output = response.data.output;
    }).catch((error)=>{
        console.log(error);
    })
})

app.get("/output",(req,res)=>{
    res.send(output);
})

app.listen(8000, ()=>{
    console.log("Server is running");
})