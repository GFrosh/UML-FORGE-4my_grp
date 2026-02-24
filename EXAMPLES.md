# Enhanced Diagram Examples

## Class Diagram Example

### Input (Using the UI)
- Class 1: `Animal` (Abstract)
  - Attributes:
    - `+ name: String`
    - `# age: int`
    - `- isAlive: boolean`
  - Methods:
    - `+ move(): void`
    - `+ eat(food: String): void`
    - `{abstract} + makeSound(): void`
    - `{static} + getSpecies(): String`

- Class 2: `Dog`
  - Attributes:
    - `+ breed: String`
    - `{static} + species: String = "Canine"`
  - Methods:
    - `+ bark(): void`
    - `+ play(owner: String): void`

- Class 3: `Cat`
  - Attributes:
    - `+ color: String`
  - Methods:
    - `+ meow(): void`
    - `+ scratch(target: String): void`

- Relationships:
  - Animal <|-- Dog (Inheritance)
  - Animal <|-- Cat (Inheritance)

### Generated PlantUML
```
@startuml
skinparam defaultFontColor #000000
skinparam backgroundColor #ffffff
skinparam borderColor #2563eb
skinparam arrowColor #2563eb

abstract class "Animal" {
  + name: String
  # age: int
  - isAlive: boolean
  --
  + move(): void
  + eat(food: String): void
  {abstract} + makeSound(): void
  {static} + getSpecies(): String
}

class "Dog" {
  + breed: String
  {static} + species: String
  --
  + bark(): void
  + play(owner: String): void
}

class "Cat" {
  + color: String
  --
  + meow(): void
  + scratch(target: String): void
}

"Animal" <|-- "Dog"
"Animal" <|-- "Cat"

@enduml
```

## ER Diagram Example

### Input (Using the UI)
- Entity 1: `Customers`
  - Attributes:
    - `customerId: INT [PK] [NOT NULL]`
    - `firstName: VARCHAR [NOT NULL]`
    - `lastName: VARCHAR [NOT NULL]`
    - `email: VARCHAR [NOT NULL]`
    - `phone: VARCHAR`
    - `createdDate: DATE [NOT NULL]`

- Entity 2: `Orders`
  - Attributes:
    - `orderId: INT [PK] [NOT NULL]`
    - `customerId: INT [FK] [NOT NULL]`
    - `orderDate: DATE [NOT NULL]`
    - `totalAmount: DECIMAL [NOT NULL]`
    - `status: VARCHAR [NOT NULL]`

- Entity 3: `Products`
  - Attributes:
    - `productId: INT [PK] [NOT NULL]`
    - `name: VARCHAR [NOT NULL]`
    - `price: DECIMAL [NOT NULL]`
    - `quantity: INT`
    - `description: TEXT`

- Entity 4: `OrderItems`
  - Attributes:
    - `orderItemId: INT [PK] [NOT NULL]`
    - `orderId: INT [FK] [NOT NULL]`
    - `productId: INT [FK] [NOT NULL]`
    - `quantity: INT [NOT NULL]`
    - `unitPrice: DECIMAL [NOT NULL]`

- Relationships:
  - Customers ||--o{ Orders (One-to-Many)
  - Orders ||--o{ OrderItems (One-to-Many)
  - Products ||--o{ OrderItems (One-to-Many)

### Generated PlantUML
```
@startuml
skinparam defaultFontColor #000000
skinparam backgroundColor #ffffff
skinparam borderColor #2563eb

entity "Customers" {
  * customerId: INT [PK] [NOT NULL]
  * firstName: VARCHAR [NOT NULL]
  * lastName: VARCHAR [NOT NULL]
  * email: VARCHAR [NOT NULL]
  * phone: VARCHAR
  * createdDate: DATE [NOT NULL]
}

entity "Orders" {
  * orderId: INT [PK] [NOT NULL]
  * customerId: INT [FK] [NOT NULL]
  * orderDate: DATE [NOT NULL]
  * totalAmount: DECIMAL [NOT NULL]
  * status: VARCHAR [NOT NULL]
}

entity "Products" {
  * productId: INT [PK] [NOT NULL]
  * name: VARCHAR [NOT NULL]
  * price: DECIMAL [NOT NULL]
  * quantity: INT
  * description: TEXT
}

entity "OrderItems" {
  * orderItemId: INT [PK] [NOT NULL]
  * orderId: INT [FK] [NOT NULL]
  * productId: INT [FK] [NOT NULL]
  * quantity: INT [NOT NULL]
  * unitPrice: DECIMAL [NOT NULL]
}

"Customers" ||--o{ "Orders"
"Orders" ||--o{ "OrderItems"
"Products" ||--o{ "OrderItems"

@enduml
```

## Features Implemented

### Class Diagram Features
✅ Visibility modifiers (+, -, #, ~)
✅ Data types for attributes
✅ Static attributes (with {static} notation)
✅ Method parameters with types
✅ Return types for methods
✅ Static methods
✅ Abstract classes and methods
✅ Class relationships (Inheritance, Composition, Aggregation, Association)

### ER Diagram Features
✅ Data types (INT, VARCHAR, DATE, DECIMAL, BOOLEAN, TEXT)
✅ Primary Key (PK) constraints
✅ Foreign Key (FK) constraints
✅ Not Null (NOT NULL) constraints
✅ Entity relationships (One-to-One, One-to-Many, Many-to-Many)

### UI Improvements
✅ Dedicated forms for attributes and methods
✅ Checkbox controls for static, abstract, and constraint flags
✅ Dropdown menus for visibility modifiers and data types
✅ Visual display of all details in list items
✅ Responsive form layout with flex display
✅ Color-coded styling for better visibility

## Testing Checklist

- [ ] Create a class with various visibility modifiers
- [ ] Create methods with parameters and return types
- [ ] Mark a class as abstract
- [ ] Create inheritance relationships between classes
- [ ] Generate a class diagram and verify PlantUML output
- [ ] Create an entity with various data types
- [ ] Mark attributes with PK, FK, and NOT NULL constraints
- [ ] Create entity relationships with different cardinalities
- [ ] Generate an ER diagram and verify PlantUML output
- [ ] Test color customization on both diagram types
- [ ] Download generated diagrams as SVG files
