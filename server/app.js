const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const PORT = 3000;
const bodyParser = require(`body-parser`);
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'dist')))


mongoose.connect(`mongodb+srv://admin:T1sTDsv2tuqohWzL@cluster0.kijny7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=> console.log(`Connected to DB`));

const excuseSchema = new mongoose.Schema({
    author: String,
    excuse: String,
    id: String 
});

const Excuse = mongoose.model('Excuse', excuseSchema);

app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..' , 'dist' , 'index.html'));
});

function randomId(length) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
};


app.post('/excuse-add', (req, res) => {
    const {author, excuse} = req.body;
    console.log(req.body);
    try{
        const id = randomId(16);
        const excuseModel = Excuse({author: author, excuse: excuse, id:id});
        excuseModel.save();
        res.send('Excuse saved');
    }catch(err){
        res.status(404).send(err);
    }
    
});

app.get('/random-excuse/:count', async(req, res) => {
    const count = req.params.count;
    console.log(req.body);

    if(count <=5){
        try{
            const randomDoc = await Excuse.aggregate([
                { $sample: { size: count } }
            ]);

            res.json(randomDoc);
        }catch(err){
            res.status(404).send(err);
        }
        
    } else {
        res.status(404).send('incorrect count');
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})

