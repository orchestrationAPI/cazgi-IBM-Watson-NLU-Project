const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

const dotenv = require('dotenv');
dotenv.config();
function getNLUInstance() {
let api_key = process.env.API_KEY;
let api_url = process.env.API_URL;
  
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const analyzeParams = {
  'url': 'www.ibm.com',
  'features': {
    'keywords': {
      'sentiment': true,
      'emotion': true,
      'limit': 3
    }
  }
};  
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});
  
 naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  }); 
 return naturalLanguageUnderstanding;
}





app.get("/",(req,res)=>{
    res.render();
  });

app.get("/url/emotion", (req,res) => {
   return getNLUInstance();
   // return res.send({"happy":"90","sad":"10"});
  
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
   return getNLUInstance();
   // return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
