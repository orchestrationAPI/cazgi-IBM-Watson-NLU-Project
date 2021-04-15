const express = require('express');
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
const app = new express();
const path = require('path');  
const port = process.env.PORT || 3000;

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());




app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
   const analyzeParams = {
  'url': req.query.url,
  'features': {
    'keywords': {
      'sentiment': false,
      'emotion': true,
      'limit': 1
    }
  }
};
   var naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    let obj = analysisResults.result.keywords;
    objresult = obj.map(res=>res.emotion)
    console.log(objresult);
    return res.send(objresult);
  })
  .catch(err => {
    console.log('error:', err);
  });
    
});

app.get("/url/sentiment", (req,res) => {
    //return res.send("url sentiment for "+req.query.url);
    const analyzeParams = {
  'url': req.query.url,
  'features': {
    'keywords': {
      'sentiment': true,
      'emotion': false,
      'limit': 1
    }
  }
};
   var naturalLanguageUnderstanding = getNLUInstance();
   naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    let obj = analysisResults.result.keywords;
    objresult = obj.map(res=>res.sentiment)
    console.log(objresult);
    return res.send(objresult);
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/text/emotion", (req,res) => {
    //return res.send({"happy":"10","sad":"90"});
    const analyzeParams = {
  'url': req.query.url,
  'features': {
    'keywords': {
      'sentiment': false,
      'emotion': true,
      'limit': 1
    }
  }
};
   var naturalLanguageUnderstanding = getNLUInstance();
   naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    let obj = analysisResults.result.keywords;
    objresult = obj.map(res=>res.emotion)
    console.log(objresult);
    return res.send(objresult);
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/text/sentiment", (req,res) => {
    //return res.send("text sentiment for "+req.query.text);
    const analyzeParams = {
  'url': req.query.url,
  'features': {
    'keywords': {
      'sentiment': true,
      'emotion': false,
      'limit': 1
    }
  }
};
   var naturalLanguageUnderstanding = getNLUInstance();
   naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    let obj = analysisResults.result.keywords;
    objresult = obj.map(res=>res.sentiment)
    console.log(objresult);
    return res.send(objresult);
  })
  .catch(err => {
    console.log('error:', err);
  });
});

//app.listen(port, () => console.log('Listening on port ${port}'));

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

