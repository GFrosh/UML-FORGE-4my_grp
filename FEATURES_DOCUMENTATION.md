# Enhanced UML Diagram Features Documentation

## Overview
This document describes the enhanced features for Class Diagrams and ER Diagrams in the Structura UML builder.

## Class Diagram Enhancements

### Attributes with Full Details
Each class attribute now supports:
- **Visibility Modifiers**: 
  - `+` Public
  - `-` Private
  - `#` Protected
  - `~` Package/Internal
- **Data Type**: Specify the type (e.g., String, int, boolean)
- **Static**: Mark attributes as static (will show `{static}` notation)

### Methods with Full Details
Each class method now supports:
- **Visibility Modifiers**: Same as attributes (+, -, #, ~)
- **Return Type**: Specify the return type (e.g., void, String, int)
- **Parameters**: Full parameter list with types (e.g., "name: String, age: int")
- **Static**: Mark methods as static
- **Abstract**: Mark methods as abstract

### Abstract Classes
Classes can now be marked as abstract, which will be displayed in the diagram with `<<abstract>>` notation.

### Class Relationships
The following relationship types are supported:
- **Inheritance**: Shown with `<|--` arrow (child to parent)
- **Composition**: Shown with `*--` arrow (strong ownership)
- **Aggregation**: Shown with `o--` arrow (weak ownership)
- **Association**: Shown with `--` arrow (general relationship)

### PlantUML Syntax Example
```plantuml
abstract class "Shape" {
  + Public attributes here
  - Private attributes here
  # Protected attributes here
  ~ Package attributes here
  --
  + public methods
  - private methods
  {static} static methods
  {abstract} abstract methods
}

class "Circle" {
  + radius: float
  + calculateArea(): float
}

"Shape" <|-- "Circle"
```

## ER Diagram Enhancements

### Attributes with Full Details
Each entity attribute now supports:
- **Name**: Attribute name
- **Data Type**: 
  - INT
  - VARCHAR
  - DATE
  - DECIMAL
  - BOOLEAN
  - TEXT
- **Primary Key (PK)**: Mark as primary key
- **Foreign Key (FK)**: Mark as foreign key
- **Not Null**: Mark as NOT NULL constraint

### Entity Relationships
The following relationship types are supported:
- **One-to-One**: Shown with `||--||` connector
- **One-to-Many**: Shown with `||--o{` connector
- **Many-to-Many**: Shown with `}o--o{` connector

### PlantUML Syntax Example
```plantuml
entity "Users" {
  * userId: INT [PK] [NOT NULL]
  * username: VARCHAR [NOT NULL]
  * email: VARCHAR [NOT NULL]
  * createdAt: DATE
}

entity "Posts" {
  * postId: INT [PK] [NOT NULL]
  * userId: INT [FK] [NOT NULL]
  * title: VARCHAR [NOT NULL]
  * content: TEXT
  * createdAt: DATE
}

"Users" ||--o{ "Posts"
```

## How to Use

### Creating a Class with Attributes and Methods

1. Select "Class Diagram" from the diagram type dropdown
2. Enter a class name and click "Add Class"
3. Click on the class name in the sidebar to edit it
4. In the "Class Details" section:
   - Check "Abstract Class" if needed
   - Add attributes:
     - Enter attribute name (required)
     - Select visibility modifier (default: + Public)
     - Enter data type (default: String)
     - Check "Static" if needed
     - Click "Add Attribute"
   - Add methods:
     - Enter method name (required)
     - Select visibility modifier (default: + Public)
     - Enter parameters (optional)
     - Enter return type (default: void)
     - Check "Static" if needed
     - Check "Abstract" if needed
     - Click "Add Method"

### Creating Class Relationships

1. Add at least 2 classes
2. Click "Add Relationship" button
3. Select the source class, target class, and relationship type
4. The relationships will be displayed in the diagram

### Creating an Entity with Attributes

1. Select "ER Diagram" from the diagram type dropdown
2. Enter an entity name and click "Add Entity"
3. Click on the entity name to edit it
4. In the "Entity Details" section:
   - Add attributes:
     - Enter attribute name (required)
     - Select data type from dropdown
     - Check "Primary Key" if it's a PK
     - Check "Foreign Key" if it's an FK
     - Check "Not Null" if it's NOT NULL
     - Click "Add Attribute"

### Creating Entity Relationships

1. Add at least 2 entities
2. Click "Add Relationship" button
3. Select the source entity, target entity, and relationship type
4. The relationships will be displayed in the diagram

## Color Customization

All diagrams support custom colors:
- **Primary Color**: Used for borders, arrows, and accents
- **Background Color**: Used for the diagram background
- **Text Color**: Used for all text elements

## Export

- Click "Generate" to preview the diagram
- Click "Download" to save the diagram as an SVG file

## Notes

- PlantUML must be installed on the server for diagram generation
- Attribute and method names can contain special characters
- Type names are case-sensitive in the generated PlantUML
- Relationships are directional (the arrow points from source to target)
