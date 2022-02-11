const express=require('express');

const print=console.log;

const serverConfig={
    host:"localhost",
    port:8080,
};

const app=express();

//Serve static content
app.use(express.static("./static"));

app.get('/',(req,res)=>{
    res.sendFile("./static/pages/index.html", {root: __dirname});
});

function main(){
    app.listen(serverConfig.port, ()=>print(`Server listening on port ${serverConfig.port}`));
}

main();