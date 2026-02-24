# Testing Guide for Enhanced Diagram Features

## Prerequisites
- PlantUML must be installed and available in PATH
- Node.js and npm are installed
- The server is running on http://localhost:3000

## Testing Class Diagram Features

### Test 1: Create a Basic Class with Attributes
1. Open the application
2. Select "Class Diagram" from dropdown
3. Enter "Person" as class name, click "Add Class"
4. Click on "Person" in the sidebar
5. Add attributes:
   - Name: `name`, Visibility: `+`, Type: `String`
   - Name: `age`, Visibility: `+`, Type: `int`
   - Name: `email`, Visibility: `-`, Type: `String`
6. Click "Generate"
7. **Expected**: Should see a class box with properly formatted attributes including visibility modifiers

### Test 2: Add Methods with Parameters and Return Types
1. From the same class details:
2. Add methods:
   - Name: `getName`, Return Type: `String`, Parameters: empty
   - Name: `setAge`, Return Type: `void`, Parameters: `age: int`
   - Name: `validate`, Return Type: `boolean`, Parameters: `email: String`
3. Click "Generate"
4. **Expected**: Should see methods with correct signatures in PlantUML format

### Test 3: Static and Abstract Members
1. Create new class "Shape" and mark as abstract
2. Add attribute:
   - Name: `sides`, Static: ✓, Type: `int`
3. Add method:
   - Name: `calculateArea`, Abstract: ✓, Return Type: `double`, Visibility: `+`
4. Click "Generate"
5. **Expected**: Should see `abstract` keyword for class and method, `{static}` for attribute

### Test 4: Visibility Modifiers
1. Create class "BankAccount"
2. Add attributes with each visibility:
   - `+ balance: double` (Public)
   - `- PIN: String` (Private)
   - `# accountNumber: String` (Protected)
   - `~ created: Date` (Package)
3. Click "Generate"
4. **Expected**: Each attribute should display with correct modifier symbol

### Test 5: Class Relationships
1. Create three classes: `Animal`, `Dog`, `Cat`
2. Click "Add Relationship" button
3. Create relationship: `Animal` → `Dog` (Inheritance)
4. Create relationship: `Animal` → `Cat` (Inheritance)
5. Try other relationship types: Composition, Aggregation, Association
6. Click "Generate"
7. **Expected**: Should see appropriate relationship arrows between classes

### Test 6: Clear Diagram
1. With a complete class diagram, click "Clear"
2. **Expected**: All classes and relationships should be removed, details pane should reset

## Testing ER Diagram Features

### Test 1: Create Entity with Multiple Data Types
1. Select "ER Diagram" from dropdown
2. Create entity "Employees"
3. Add attributes:
   - `employeeId: INT [PK] [NOT NULL]`
   - `firstName: VARCHAR [NOT NULL]`
   - `salary: DECIMAL`
   - `hireDate: DATE`
   - `isActive: BOOLEAN`
4. Click "Generate"
5. **Expected**: Should see entity box with all attributes and their types/constraints

### Test 2: Primary Keys and Foreign Keys
1. Create entity "Departments" with:
   - `deptId: INT [PK] [NOT NULL]`
   - `name: VARCHAR [NOT NULL]`
2. Create entity "Employees" with:
   - `empId: INT [PK] [NOT NULL]`
   - `deptId: INT [FK] [NOT NULL]`
   - `name: VARCHAR [NOT NULL]`
3. Click "Generate"
4. **Expected**: Should see [PK] and [FK] annotations on attributes

### Test 3: NOT NULL Constraint
1. Create entity "Products" with:
   - `productId: INT [PK] [NOT NULL]`
   - `name: VARCHAR [NOT NULL]`
   - `description: TEXT`
   - `price: DECIMAL [NOT NULL]`
2. Click "Generate"
3. **Expected**: [NOT NULL] should appear only on required attributes

### Test 4: Entity Relationships
1. Create entities: `Customers`, `Orders`, `Products`, `OrderItems`
2. Add attributes to each entity
3. Create relationships:
   - `Customers` → `Orders` (One-to-Many)
   - `Orders` → `OrderItems` (One-to-Many)
   - `Products` → `OrderItems` (One-to-Many)
4. Also test One-to-One and Many-to-Many if needed
5. Click "Generate"
6. **Expected**: Should see appropriate cardinality symbols (||--o{, ||--||, }o--o{)

### Test 5: Clear ER Diagram
1. With a complete ER diagram, click "Clear"
2. **Expected**: All entities and relationships should be removed

## Testing Color Customization

### Test 1: Custom Colors
1. With any diagram type
2. Change Primary Color to red: #ff0000
3. Change Background Color to light gray: #f0f0f0
4. Change Text Color to dark blue: #001a50
5. Click "Generate"
6. **Expected**: Diagram should use the custom colors specified

## Testing Export Functionality

### Test 1: Download Diagram
1. Create and generate any diagram
2. Click "Download" button
3. **Expected**: SVG file should be downloaded with name format: `[diagram-type]-diagram-[timestamp].svg`

### Test 2: Verify SVG Content
1. Open downloaded SVG file
2. **Expected**: Should display the diagram correctly with all elements, attributes, and relationships

## Browser Console Checks

After each major action, check browser console (F12 → Console) for:
- No JavaScript errors
- No warnings about undefined functions
- Proper state logging if needed

## Known Limitations and Edge Cases

1. **Attribute Names**: Can contain most special characters except newlines
2. **Method Parameters**: Should be formatted as "name: Type" separated by commas
3. **Type Names**: Case-sensitive in generated PlantUML
4. **Empty Diagrams**: Cannot add relationships without at least 2 classes/entities
5. **Duplicate Names**: Cannot create duplicate class/entity names in same diagram

## Performance Testing

1. **Create 50+ classes**: Should handle smoothly
2. **Add 100+ attributes**: Should maintain responsive UI
3. **Create 10+ relationships**: Should generate diagram without delay

## Troubleshooting

### "Failed to generate diagram"
- Check if PlantUML is installed: `plantuml -version`
- Check if Java is installed (required by PlantUML): `java -version`
- Check server logs for errors

### Diagram Not Displaying
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)
- Check console for errors (F12)
- Verify PlantUML syntax in network tab

### Attributes/Methods Not Saving
- Check browser console for JavaScript errors
- Clear browser storage if needed
- Reload page

## Completion Checklist

- [ ] All class diagram attributes display correctly
- [ ] All methods with parameters and return types work
- [ ] Visibility modifiers display correctly (+ - # ~)
- [ ] Static and abstract notations work
- [ ] Class relationships work (all 4 types)
- [ ] All ER entity attributes display
- [ ] Data types dropdown works
- [ ] PK, FK, NOT NULL constraints display
- [ ] Entity relationships display (all 3 cardinalities)
- [ ] Color customization works
- [ ] Export/Download works
- [ ] Clear diagram functionality works
- [ ] No console errors or warnings
