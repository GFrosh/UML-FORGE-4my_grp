# Structura 🛠️

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Java](https://img.shields.io/badge/Java-OpenJDK%2017%2B-orange.svg)](https://openjdk.org/)
[![PlantUML](https://img.shields.io/badge/PlantUML-Required-red.svg)](https://plantuml.com/)

## Screenshots 📱
![A screenshot of Structura](https://github.com/GFrosh/Structura/blob/master/client/Assets/screenshotOne.png/)

Structura is a lightweight, web-based UML and ER diagram builder powered by a Node.js server and PlantUML.  
It provides a structured interface for creating:

- Sequence Diagrams  
- Class Diagrams  
- ER Diagrams  
- Use Case Diagrams  
- Activity Diagrams  
- Component Diagrams  
- State Machine Diagrams  

Instead of writing raw PlantUML syntax, users interact with a controlled UI. The application generates valid PlantUML code behind the scenes and renders diagrams dynamically.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/GFrosh/Structura.git
cd Structura

# Install dependencies
npm install

# Start the server
node server.js

# Open in browser
http://localhost:3000
```

---


### 💻 Desktop App (Electron Startup)

```bash
npm start
```


## 🏗️ Architecture Overview

```
Frontend (HTML, CSS, JavaScript)
↓
Express Server (Node.js)
↓
PlantUML CLI
↓
Generated SVG
↓
Rendered Preview || Download Image
```

Structura does not replace PlantUML — it acts as a structured interface layer on top of it.

---

## 📦 System Requirements

- Node.js (v18+ recommended)  
- Java (OpenJDK 17+)  
- Graphviz  
- PlantUML CLI  

Verify installations:

```bash
java -version
plantuml -version
dot -version
```

---

## 🔧 Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)  
- Dynamic state management & event-driven architecture  

**Backend**
- Node.js, Express.js  
- PlantUML CLI integration  
- CORS  

---

## 📂 Project Structure

```
Structura/
├── client/
│   ├── index.html          # Main HTML template
│   ├── app.js              # Core application logic & state management
│   ├── switch.js           # Diagram type switching logic
│   ├── utils.js            # Utility functions
│   └── style.css           # Styling & animations
├── server.js               # Express server & PlantUML integration
├── package.json            # Dependencies & scripts
└── README.md               # Documentation
```

---

## 🎨 Features

- Structured entity creation  
- Attribute editing via side panel  
- Sequence message builder  
- SVG rendering  
- Customizable styling (colors, backgrounds, text)  
- Export diagrams as SVG  
- Modular frontend architecture  

---

## 🛤️ Roadmap

- Relationship editor for ER diagrams  
- Class inheritance support  
- Async-safe rendering without shared temp files  
- Save/load project files (JSON format)  
- Export as PNG, SVG, PDF  
- Online PlantUML server support  

---

## 🤝 Contributing

Contributions are welcome!  

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

**Guidelines:**
- Ensure PlantUML is installed locally  
- Follow the existing architectural structure  
- Avoid unnecessary inline DOM mutations  
- Keep state management clean  

---

## 📜 License

This project is licensed under the **ISC License**.  
PlantUML is distributed under its own license — see [PlantUML repository](https://github.com/plantuml/plantuml) for details.

---

## 💡 Why Structura?

Many students struggle with writing raw PlantUML syntax. Structura bridges that gap by providing:

- Controlled input forms  
- Clean state management  
- Deterministic UML generation  
- Clear separation between modelling and syntax  

Designed as an academic and educational tool.

---

## 🧑‍💻 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/GFrosh/Structura/issues).

---

**Created by:** Gideon Onyegbula
**Last Updated:** 2026-04-17
