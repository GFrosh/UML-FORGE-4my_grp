const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {

    const umlText = req.body.uml;

    fs.writeFileSync("temp.puml", umlText);

    exec("plantuml -tsvg temp.puml", (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error generating diagram");
        }

        const svg = fs.readFileSync("temp.svg", "utf8");
        res.send(svg);
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});
