var http=require("http");
var request=require("request");
var express=require("express");
var app=express();
var fs=require("fs");

// http.createServer(function(req,res){
//     if(req.url=="/"){
//         request("http://apis.map.qq.com/ws/district/v1/list?key=GZYBZ-UUR6F-EWBJF-NXHRV-3F4Q6-PSBYM",function(err,respone,body){
//             if(!err&&respone.statusCode==200){
//                 console.log(typeof(body))

//                 res.end(body["message"])
//             }
//         })
//     }
// }).listen(3079,function(){
//     console.log("启动在3079")
// })

app.set("view engine","html")
app.set("views","/");
app.use(express.static("public"));

//一级
app.get("/json",function(req,res){
    request("http://apis.map.qq.com/ws/district/v1/getchildren?&key=GZYBZ-UUR6F-EWBJF-NXHRV-3F4Q6-PSBYM",function(err,respone,body){
        if(!err&&respone.statusCode==200){
            res.end(body)
        }
    })
})

//二级和三级
app.all("/json/:id",function(req,res){
    var cityid=req.originalUrl.split("/");
    request("http://apis.map.qq.com/ws/district/v1/getchildren?&id="+cityid[2]+"&key=GZYBZ-UUR6F-EWBJF-NXHRV-3F4Q6-PSBYM",function(err,respone,body){
        if(!err&&respone.statusCode==200){
            res.end(body)
        }
    })
})

app.get("/",function(req,res){
    fs.readFile("./ajax.html",function(err,data){
        if(err){throw err};
        res.end(data)
    })
})

app.listen(3079,function(){
   console.log("启动在3079")
})