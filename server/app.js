const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const PORT = 3000;
const bodyParser = require(`body-parser`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(`mongodb+srv://admin:T1sTDsv2tuqohWzL@cluster0.kijny7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=> console.log(`Connected to DB`));

const excuseSchema = new mongoose.Schema({
    autor: String,
    excuse: String,
    id: String 
});

const Excuse = mongoose.model('Excuse', excuseSchema);

app.get(`/`, (req, res)=> {
    res.send(`Hello world!`)    
})

app.post('/excuse-add', (req, res) => {
    const {autor, excuse} = req.body;
    const excuseModel = Excuse({autor: autor, excuse: excuse});

    excuseModel.save();
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})

