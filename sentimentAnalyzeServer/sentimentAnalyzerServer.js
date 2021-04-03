const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
var getNLUInstance = function getNLUInstance() {
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});
 return naturalLanguageUnderstanding;
}
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
     
    return res.send(getNLUInstance());
});

app.get("/url/sentiment", (req,res) => {
    
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
   
    return res.send(getNLUInstance());
});

app.get("/text/sentiment", (req,res) => {
   
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

