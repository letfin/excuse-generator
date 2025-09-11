const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const PORT = 3000;
const bodyParser = require(`body-parser`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(`mongodb+srv://admin:T1sTDsv2tuqohWzL@cluster0.kijny7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=> console.log(`Connected to DB`))

app.get(`/`, (req, res)=> {
    res.send(`Hello world!`)    
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})

