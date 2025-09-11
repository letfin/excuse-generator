const express = require(`express`);
const app = express();
const PORT = 3000;
const bodyParser = require(`body-parser`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(`/`, (req, res)=> {
    res.send(`Hello world!`)    
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})