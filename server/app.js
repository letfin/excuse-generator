const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const PORT = 3000;
const bodyParser = require(`body-parser`);
const path = require('path');
const { getCurrentDate } = require('./utils.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'dist')))

mongoose.connect(`mongodb+srv://admin:T1sTDsv2tuqohWzL@cluster0.kijny7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=> console.log(`Connected to DB`));

const excuseSchema = new mongoose.Schema({
    author: String,
    excuse: String,
    data:   String
});

const Excuse = mongoose.model('Excuse', excuseSchema);

app.get('/random-excuse', async (req, res) => {
    res.json((await Excuse.aggregate([{ $sample: { size: 1 } }]))[0]);
});

app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..' , 'dist' , 'index.html'));
});

app.post('/excuse-add', (req, res) => {
    const {author, excuse} = req.body;
    try {
        const excuseModel = Excuse({author: author, excuse: excuse, data: getCurrentDate()});
        excuseModel.save();
        res.send('Excuse saved');
    } catch(err){
        res.status(404).send(err);
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})

