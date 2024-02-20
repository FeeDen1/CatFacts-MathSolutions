import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
const port = 5000
const apiKey = 'live_W3NBOrEnKNaqjmX3VYL86mjr0IgeoHbegYbmywVdMYIh9SnWfXrKZKJOAC91FAyx'
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))
app.get('/',(req, res) => {
    res.render('index.html')
})

app.get('/math', (req,res) =>{
    res.render('math.ejs',{
        data: '',
        fact: ''
    })
})

app.get('/cats', async (req,res) =>{
    await axios.get('https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`')
    await axios.get('https://meowfacts.herokuapp.com/?lang=rus')
    console.log('запросы сделаны')
    res.render('cats.ejs',{
        imageOfCat: '',
        catFact: ''
    })
})

app.post('/math', async (req,res) =>{
    try{
        let input = encodeURI(req.body.calc).replaceAll('-','%2D').replaceAll('+','%2B').replaceAll('/','(over)')

        const result = await axios.get(`https://newton.now.sh/api/v2/${req.body.operation}/${input}`)
        const numberFact = await axios.get('http://numbersapi.com/random/trivia')



        let data = result.data.result

        res.render('math.ejs', {
            data: data,
            fact: numberFact.data
        })
        data = ''
    } catch(err){
        res.render('math.ejs',{
            data: err.message,
            fact: ''
        })

    }

})

app.post('/cats',async(req,res)=>{
    try{
        let image = await axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`)
        image = image.data[0].url
        let catFact = await axios.get('https://meowfacts.herokuapp.com/?lang=rus')
        catFact = catFact.data.data[0]

        res.render('cats.ejs',{
            imageOfCat: image,
            catFact : catFact
        })
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(port, ()=>{
    console.log('listening')
})