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
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});
 return naturalLanguageUnderstanding;
}
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
{
  "usage": {
    "text_units": 1,
    "text_characters": 1536,
    "features": 1
  },
  "keywords": [
    {
      "text": "curated online courses",
      "sentiment": {
        "score": 0.792454
      },
      "relevance": 0.864624,
      "emotions": {
        "sadness": 0.188625,
        "joy": 0.522781,
        "fear": 0.12012,
        "disgust": 0.103212,
        "anger": 0.106669
      }
    },
    {
      "text": "free virtual server",
      "sentiment": {
        "score": 0.664726
      },
      "relevance": 0.864593,
      "emotions": {
        "sadness": 0.265225,
        "joy": 0.532354,
        "fear": 0.07773,
        "disgust": 0.090112,
        "anger": 0.102242
      }
    }
  ],
  "language": "en",
  "retrieved_url": "https://www.ibm.com/us-en/"
}
naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });


app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    getNLUInstance;
   // return res.send({"happy":"90","sad":"10"});
  
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
   getNLUInstance;
   // return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
