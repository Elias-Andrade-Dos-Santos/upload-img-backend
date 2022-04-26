var express = require("express");
var app = express();
var cors  = require("cors");
const uploadUser = require('./middlewares/uploadImage')

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //autorizar requisição em qualquer rota
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors()); 
    next();
})

   

app.post("/upload-image",uploadUser.single('image'), function (req, res) {

    if(req.file){
        console.log(req.file);
        return res.json({
            error: false,
            mensagem: "Upload realized com sucesso!"
        });
    }

    return res.status(400).json({
        erro: true,
        mensagem: "Error: Upload não realizedo com sucesso! "
    })

});

app.listen(port, ()=>{
    console.log("server is runing")
});