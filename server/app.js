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
.then(async()=> {
    console.log(`Connected to DB`);

});

const excuseSchema = new mongoose.Schema({
    author: String,
    excuse: String,
    date:  String,
    likes: Array,
});

const Excuse = mongoose.model('Excuse', excuseSchema);

  



app.get('/random-excuse', async (req, res) => {
    try{
        let randExc = (await Excuse.aggregate([{ $sample: { size: 1 } }]))[0]
        randExc.likes = randExc.likes.length; 
        res.json(randExc);
    } catch(err){
        res.status(500).send('server error');
    }
});

app.post('/excuse-add', async(req, res) => {
    const {author, excuse} = req.body;
    let trimedExcuse = excuse.trim();
    let filteredExcuse = trimedExcuse.split(' ').filter(word => !/[!@#$%^&*(\[)\]_+\-=~`'",?.]/.test(word));
    if(excuse.length <= 200 && filteredExcuse.length >= 3){
        try{
        const excuseModel = Excuse({author: author, excuse: excuse, date: getCurrentDate() });
        await excuseModel.save();
        res.send('Excuse saved');
    }catch(err){
        res.status(400).send('Request error');
    }
        
    } else {
        res.status(400).send('Bad request');
    }

    
});

app.get(`/all-members`, async(req, res) => {
try{
    const excuses = await Excuse.find({});
    let authors = [];
    excuses.forEach((i) => {
        if (i.author !== undefined) authors.push(i.author);
    });
    res.json(authors);
} catch(err) {
    res.status(500).send('server error')
}
});

app.get(`/like/:id`, async(req, res) => {
    let ip_adress = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    const id = req.params.id;
    try{
        const currentExcuse = await Excuse.findOne({_id:id});
        let ipArr = currentExcuse.likes;
        if (!ipArr.includes(ip_adress)) {
            ipArr.push(ip_adress);
        }else{
            ipArr.filter(ip => ip != ip_adress);
        }   
        await Excuse.findOneAndUpdate({_id:id}, {likes:ipArr}, {new:true});
        res.send('Like saved');
    } catch(err) {
        res.status(400).send('Request error');
    }
    
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'src', 'components' , 'AdminPanel', 'AdminPanel.jsx' ));
});


app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..' , 'dist' , 'index.html'));
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
});

