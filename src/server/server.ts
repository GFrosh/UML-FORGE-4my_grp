import express, { Request, Response } from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Define request body type
interface GenerateDiagramRequest {
  uml: string;
}

app.use(express.static(path.join(__dirname, "client")));
app.use(cors());
app.use(express.json());

app.post("/generate", (req: Request, res: Response) => {

  const body = req.body as GenerateDiagramRequest;
  const umlText = body.uml;

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
