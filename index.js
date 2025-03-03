const express=require("express");
const path=require("path");
const fs=require('fs');
const { Console } = require("console");

const app=express();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    fs.readdir('./files',function(err,files){
        res.render('index',{files:files});
    });    
    //res.render('index');
    //res.send("Welcome to first programe, so you can enjoy by learning");
});

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.desc,function(err){
        if(!err && err!=null)  
            return console.log(err);
        else{
            console.log('File created successfully...!');
            res.redirect('/');
        }          
    });
})

app.get('/edit/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render('edit',{filename:req.params.filename,data:data});
    })
});

app.post('/edit',(req,res)=>{
    fs.appendFile(`./files/${req.body.title.split('.')[0]}.txt`,req.body.desc,function(err){
        if(!err && err!=null)  
            return console.log(err);
        else{
            console.log('File Updated successfully...!');
            res.redirect('/');
        }          
    });
});

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render('showdata',{filename:req.params.filename,data:data});
    })
})
app.listen(3000);