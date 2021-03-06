const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))

args["port"]

const port = args.port || process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(res.statusCode+ ' ' +res.statusMessage);
      res.type("text/plain");
});

function coinFlip() {
    if (Math.random() >= 0.5) {
      return "heads"
    } else {
      return "tails"
    }
}
  
function coinFlips(flips) {
    const values = []
    for (let i = 0; i < flips; i++) {
      values[i] = coinFlip()
    }
    return values
}
  
function countFlips(array) {
    let count = { heads: 0, tails: 0 }
  array.forEach(element => 
    { if (element == "heads") {
      count.heads += 1
    } else {
      count.tails += 1
    }
   })
   return count
}
  
function flipACoin(call) {
    let coin = { call: call, flip: "NULL", result: "NULL"}
    let flip = coinFlip()
    coin.flip = flip
    if (call == flip) {
      coin.result = "win"
    } else {
      coin.result = "lose"
    }
    return coin
}

app.get('/app/flip/', (req, res) => {
  const flip = coinFlip()
	res.status(200).json({"flip" : flip})
});

app.get('/app/flips/:number', (req, res) => {
  const flips = coinFlips(req.params.number)
  const counted = countFlips(flips)
  res.status(200).json({"raw" : flips, "summary" : counted})
});

app.get('/app/flip/call/:call', (req, res) => {
  const called = flipACoin(req.params.call)
  res.status(200).json({called})
});

app.use(function(req, res){
  res.statusCode = 404;
      res.statusMessage = 'NOT FOUND';
      res.end(res.statusCode+ ' ' +res.statusMessage);
      res.type("text/plain");
});