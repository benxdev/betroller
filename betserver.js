import express from "express";
import { rollBet } from "./rollbet.mjs";
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



// GET Requests
app.get("/", (req, res) => {
  res.render("main.ejs", { output: null });
});

app.get("/reset", (req, res) => {
  res.render("main.ejs", { output: null });
});

app.get("/main.ejs", (req, res) => {
  res.render("main.ejs", { output: null });
});

app.get("/calc.ejs", (req, res) => {
  res.render("calc.ejs", { output: null });
});

app.get("/about.ejs", (req, res) => {
    res.render("about.ejs");
});

//POST Requests
app.post("/submit", (req, res) => {

  const formInput = req.body;

  let startingAmount = formInput.startingAmount;
  let totalOdds = formInput.rollingOdds;
  let totalBets = formInput.totalBets;

  let winnings = rollBet(startingAmount, totalOdds, totalBets);
  let maxPayout = winnings[winnings.length - 1];

  const data = { 
  output: `₦${maxPayout}`,
  // winPerccentage: winPercentage
  }

  res.locals = data;
  res.render("calc.ejs", data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});








//   const data = JSON.stringify(formInput);
//   writeFile('/user data/formInput.txt', data, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// }); 