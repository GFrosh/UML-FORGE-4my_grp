# UML Forge

A web-based UML diagram generator that allows users to create, visualize, and download multiple types of UML diagrams in a single, intuitive application.

## Overview

**UML Forge** is a full-stack application that provides an interactive interface for designing various UML diagram types. It combines a modern frontend with a Node.js/Express backend to generate professional SVG diagrams using PlantUML.

## Features

### Supported Diagram Types

- **Sequence Diagrams** - Model interactions between objects over time
- **Class Diagrams** - Define classes with attributes and methods
- **Use Case Diagrams** - Illustrate system actors and use cases
- **Entity-Relationship (ER) Diagrams** - Design database schemas
- **Activity Diagrams** - Flow of activities and processes
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
