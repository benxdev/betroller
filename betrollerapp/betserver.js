import express from "express";
import BetRollerApp  from  "./bet-roller.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { writeFile } from 'node:fs';

// DOESN'T USUALLY CHANGE, SHOULDN'T USUALLY CHANGE
const __dirname = dirname(fileURLToPath(import.meta.url)); 

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


function getOutput() {
  const roll = new BetRollerApp(startingAmount, totalOdds, totalBets, winIndex);
  let resultArray = roll.rollBet();
  let outputAmount = resultArray[resultArray.length];
  return outputAmount;
}

app.use(getOutput);

// GET Requests
app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.get("/main.ejs", (req, res) => {
    res.render("main.ejs");
});

app.get("/calc.ejs", (req, res) => {
    res.render("calc.ejs");
});

app.get("/about.ejs", (req, res) => {
    res.render("about.ejs");
});

//POST Requests
app.post("/submit", (req, res) => {
  const formInput = req.body;
  console.log(formInput);


    app.render("calc.ejs", outputAmount)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});








//   const data = JSON.stringify(formInput);
//   writeFile('/user data/formInput.txt', data, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// }); 