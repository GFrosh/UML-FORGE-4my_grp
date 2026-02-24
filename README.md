#Structura

Structura is a lightweight, web-based UML and ER diagram builder powered by a local Node.js server and PlantUML.

It provides a structured interface for creating:

Sequence Diagrams

Class Diagrams

ER Diagrams

Use Case Diagrams


Instead of writing raw PlantUML syntax, users interact with a controlled UI. The application generates valid PlantUML code behind the scenes and renders diagrams dynamically.


---

Architecture Overview

Frontend (HTML, CSS, JavaScript)
↓
Express Server (Node.js)
↓
PlantUML CLI
↓
Generated SVG
↓
Rendered Preview

Structura does not replace PlantUML. It acts as a structured interface layer on top of it.


---

Core Dependency

This project depends directly on:

PlantUML
GitHub Repository: https://github.com/plantuml/plantuml
Official Website: https://plantuml.com/

PlantUML is responsible for parsing UML text and generating diagram outputs.

Structura requires PlantUML to be installed locally and accessible from the command line.


---

System Requirements

Before running this project, ensure the following are installed:

Node.js (v18+ recommended)

Java (OpenJDK 17+)

Graphviz

PlantUML CLI


Verify installations:

java -version
plantuml -version
dot -version

If any of these fail, diagram generation will not work.


---

Installation

Clone the repository:

git clone <your-repo-url>
cd <project-folder>

Install dependencies:

npm install

Start the server:

node server.js

Open the frontend in your browser.


---

How Diagram Generation Works

1. The user defines entities, attributes, messages, or relationships in the UI.


2. The frontend constructs structured state objects.


3. That state is converted into valid PlantUML syntax.


4. The syntax is sent to the backend.


5. The backend writes a temporary .puml file.


6. PlantUML CLI generates an SVG.


7. The SVG is returned and rendered in the preview panel.



PlantUML performs the actual diagram rendering. Structura only generates and orchestrates the input.


---

Current Features

Structured entity creation

Attribute editing via side panel

Sequence message builder

SVG rendering

Modular frontend architecture

Local CLI-based rendering



---

Roadmap

Planned Enhancements

Relationship editor for ER diagrams

Class inheritance support

Async-safe rendering without shared temp files

Save and load project files (JSON format)

Export as PNG, SVG, or PDF

Improved state management architecture


Online PlantUML Support (Planned)

Future versions will include support for the official PlantUML server:

https://plantuml.com/server

This will allow:

Rendering without local Java or Graphviz

Running the app without CLI installation

Optional fallback mode when CLI is unavailable


The project will support two rendering modes:

1. Local CLI mode (default, requires PlantUML installed)


2. Online server mode (no local installation required)




---

Why This Project Exists

Many students struggle with writing raw PlantUML syntax.
Structura bridges that gap by providing:

Controlled input forms

Clean state management

Deterministic UML generation

A clear separation between modelling and syntax


It is designed as an academic and educational tool.


---

Disclaimer

This project does not implement a custom UML engine.
All diagram parsing and rendering logic is handled by PlantUML.

Structura depends entirely on PlantUML for diagram generation.


---

License

MIT License

PlantUML is distributed under its own license.
Refer to the official PlantUML repository for licensing details.


---

Contributing

Pull requests are welcome.

Before contributing:

Ensure PlantUML is installed locally.

Follow the existing architectural structure.

Avoid introducing unnecessary inline DOM mutations.


Clean state. Clean rendering. Clean architecture.- **Activity Diagrams** - Flow of activities and processes
- **Component Diagrams** - Structural relationships between components
- **State Machine Diagrams** - Define states and transitions

### Core Capabilities

✨ **Intuitive UI**
- Easy-to-use sidebar for adding components
- Real-time preview of diagrams
- Interactive builder interface with visual feedback

🎨 **Customizable Styling**
- Primary color picker (accents, borders)
- Background color control
- Text color customization

💾 **Export Functionality**
- Download generated diagrams as SVG files
- Timestamped filenames for organization

🔄 **Dynamic Components**
- Add/remove actors, classes, entities, states, and more
- Edit attributes and methods on-the-fly
- Support for directional layouts (e.g., vertical/horizontal for use cases)

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and transitions
- **JavaScript (ES6+)** - Modular frontend logic
  - Dynamic state management
  - Event-driven architecture
  - DOM manipulation and rendering

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PlantUML** - UML diagram generation engine
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

```
UML-FORGE-4my_grp/
├── client/
│   ├── index.html          # Main HTML template
│   ├── app.js              # Core application logic & state management
│   ├── switch.js           # Diagram type switching logic
│   ├── utils.js            # Utility functions (DOM selectors)
│   └── style.css           # Styling & animations
├── server.js               # Express server & PlantUML integration
├── package.json            # Project dependencies & scripts
└── README.md               # Project documentation
```

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **PlantUML** (must be installed and available in PATH)
  - [PlantUML Installation Guide](http://plantuml.com/starting)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/GFrosh/UML-FORGE-4my_grp.git
   cd UML-FORGE-4my_grp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify PlantUML installation**
   ```bash
   plantuml -version
   ```

## Usage

### Development Mode

Run the application with automatic restart on file changes:

```bash
npm run dev
```

### Production Mode

Start the server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Creating Diagrams

1. **Select Diagram Type** - Choose from the dropdown in the header
2. **Add Components** - Use the sidebar to add actors, classes, entities, etc.
3. **Define Relationships** - Set up connections and flows in the builder section
4. **Customize Appearance** - Adjust colors using the color pickers
5. **Generate & Preview** - Click "Generate" to create the diagram
6. **Download** - Save the SVG file to your computer

## API Endpoints

### POST `/generate`

Generates a UML diagram from PlantUML markup.

**Request:**
```json
{
  "uml": "@startuml\n...\n@enduml"
}
```

**Response:**
- SVG content (image/svg+xml)

## Key Components

### State Management (`app.js`)

The application maintains a single state object that tracks:
- Current diagram type
- Color scheme (background, text, primary)
- Components for each diagram type (actors, classes, entities, etc.)
- Generated SVG output

### Rendering Functions

- `renderActors()` / `renderMessages()` - Sequence diagrams
- `renderClasses()` / `renderClassDetails()` - Class diagrams
- `renderActorsUC()` / `renderUseCases()` / `renderUCLinks()` - Use case diagrams
- `renderEntities()` / `renderEntityDetails()` - ER diagrams
- `renderActivities()` / `renderActivityFlows()` - Activity diagrams
- `renderComponents()` / `renderComponentDeps()` - Component diagrams
- `renderStates()` / `renderStateTransitions()` - State machines

### PlantUML Generation (`generatePlantUML()`)

Converts the application state into PlantUML markup with applied styling directives.

## Features in Detail

### Sequence Diagrams
- Add multiple actors
- Define message flows with arrow types (`->`, `-->`, `->>`)
- Set message descriptions

### Class Diagrams
- Create classes with custom names
- Add attributes and methods to each class
- Remove attributes or methods individually

### Use Case Diagrams
- Define actors and use cases separately
- Link actors to use cases
- Choose between vertical and horizontal layouts

### ER Diagrams
- Create entities with attributes
- Support for attribute annotations (e.g., PK for primary keys)

### Activity Diagrams
- Add activities and define flow paths
- Visual activity flow representation

### Component Diagrams
- Define components and their dependencies
- Show "uses" relationships between components

### State Machine Diagrams
- Create states with names
- Define transitions with event triggers
- Visualize state flow

## Styling & Customization

The application uses PlantUML's `skinparam` directives to apply colors and styling:
- `defaultFontColor` - Text color
- `backgroundColor` - Diagram background
- `borderColor` / `arrowColor` - Primary color accents
- Type-specific parameters for sequences, classes, use cases, entities, components, and states

## Browser Compatibility

- Chrome/Edge (v88+)
- Firefox (v85+)
- Safari (v14+)

## Limitations

- PlantUML must be installed on the server
- Diagram complexity depends on PlantUML capabilities
- Real-time collaboration not currently supported

## Future Enhancements

- Export to additional formats (PNG, PDF)
- Undo/redo functionality
- Collaboration features
- Diagram templates
- Advanced PlantUML options
- Custom styling presets

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the ISC License.

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/GFrosh/UML-FORGE-4my_grp).

---

**Created by:** GFrosh  
**Last Updated:** 2026-02-24
