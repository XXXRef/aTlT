const express=require('express');

const print=console.log;

const defaultServerConfig={
    host:"localhost",
    port:8888,
};

const app=express();

//Serve static content
app.use(express.static("./static"));

app.get('/',(req,res)=>{
    res.sendFile("./static/pages/index.html", {root: __dirname});
});

function main(){
    //Acquiring port from env
    const port = process.env.APP_PORT ?? defaultServerConfig.port;

    app.listen(port, ()=>print(`Server listening on port ${port}`));
}

main();