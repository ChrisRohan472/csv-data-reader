var express = require("express");

var fs = require("fs");

var { parse } = require("csv-parse");
const { createSecretKey } = require("crypto");

var app = express();

app.get("/all", async (req, res) => {
  try {
    const data = await readDataFromCSV("./data.csv");
    console.log("data" + data);

    data.sort(compareAgeAndSort);
    console.log(data);
    var len = data.length;

    const total_Grades = data.reduce(
      (sum, student) => sum + parseInt(student.Grade),
      0
    );

    var average = total_Grades / parseInt(len);
    console.log(`Average is ${average}`);
    res.json({ data, average });
  } catch (err) {
    console.log("error", err);
    res.json({ message: "error" });
  }
});
app.get("/allP",  (req, res) => {
    
     readDataFromCSV("./data.csv").then(
        (data)=>
        {
            console.log("data" + data);
  
            data.sort(compareAgeAndSort);
            console.log(data);
            var len = data.length;
        
            const total_Grades = data.reduce(
              (sum, student) => sum + parseInt(student.Grade),
              0
            );
        
            var average = total_Grades / parseInt(len);
            console.log(`Average is ${average}`);
            res.json({ data, average });
        }
     ).catch ((err)=> {
      console.log("error", err);
      res.json({ message: "error" });
    })
  });

function compareAgeAndSort(stud1, stud2) {
  if (stud1.Age < stud2.Age) return -1;

  if (stud1.Age > stud2.Age) return 1;
  else return 0;
}

function readDataFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
        if(err)reject(err)
      parse(data, { columns: true }, (err, rows) => {
        resolve(rows);
      });
    });
  });
}

app.listen(8000, () => {
  console.log("Server up and running");
});
