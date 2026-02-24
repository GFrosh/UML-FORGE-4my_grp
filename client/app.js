// ===============================
// IMPORT STATEMENTS
// ===============================
import rotateNode from "./switch.js";

// ===============================
// STATE DEFINITION - ALL DIAGRAM TYPES
// ===============================
const state = {
  diagramType: "sequence",
  // Color/Styling
  backgroundColor: "#ffffff",
  textColor: "#000000",
  primaryColor: "#2563eb",
  // Sequence Diagram
  actors: [],
  messages: [],
  // Class Diagram
  classes: [],
  classRelationships: [],
  // Use Case Diagram
  actorsUC: [],
  useCases: [],
  useCaseLinks: [],
  ucDirection: "vertical",
  // ER Diagram
  entities: [],
  erdRelationships: [],
  // Activity Diagram
  activities: [],
  activityFlows: [],
  // Component Diagram
  components: [],
  componentDeps: [],
  // State Machine Diagram
  states: [],
  stateTransitions: [],
  // Generated SVG
  lastGeneratedSvg: null
};

// ===============================
// UTILITY: GENERATE UNIQUE ID
// ===============================
function generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

// ===============================
// STATE MUTATION FUNCTIONS - SEQUENCE
// ===============================
function addActor(name) {
  if (!name) return alert("Actor name cannot be empty.");
  if (state.actors.includes(name)) return alert("Actor already exists.");
  state.actors.push(name);
  renderActors();
}

function removeActor(name) {
  state.actors = state.actors.filter(actor => actor !== name);
  state.messages = state.messages.filter(msg => msg.from !== name && msg.to !== name);
  renderActors();
  renderMessages();
}

function addMessage() {
  if (state.actors.length < 2) return alert("You need at least 2 actors.");
  const newMessage = {
    id: generateId(),
    from: state.actors[0],
    to: state.actors[1],
    arrow: "->",
    text: ""
  };
  state.messages.push(newMessage);
  renderMessages();
}

function removeMessage(id) {
  state.messages = state.messages.filter(msg => msg.id !== id);
  renderMessages();
}

// ===============================
// STATE MUTATION FUNCTIONS - CLASS
// ===============================
function addClass(name) {
	if (!name) return alert("Class name cannot be empty.");
	if (state.classes.some(cls => cls.name === name)) return alert("Class already exists.");
	state.classes.push({
		id: generateId(),
		name,
		isAbstract: false,
		attributes: [],  // {name, visibility, type, isStatic}
		methods: []       // {name, visibility, type, parameters, isStatic, isAbstract}
	});
	renderClasses();
}

function removeClass(id) {
	state.classes = state.classes.filter(cls => cls.id !== id);
	state.classRelationships = state.classRelationships.filter(rel => rel.from !== id && rel.to !== id);
	renderClasses();
	document.getElementById("classDetailsContainer").innerHTML = "<p>Select a class to edit its attributes and methods.</p>";
}

function addAttributeToClass(classId, attrData) {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		// attrData = {name, visibility, type, isStatic}
		cls.attributes.push({
			name: attrData.name || "attr",
			visibility: attrData.visibility || "+",
			type: attrData.type || "String",
			isStatic: attrData.isStatic || false
		});
		renderClassDetails(classId);
	}
}

function removeAttributeFromClass(classId, index) {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.attributes.splice(index, 1);
		renderClassDetails(classId);
	}
}

function addMethodToClass(classId, methodData) {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		// methodData = {name, visibility, returnType, parameters, isStatic, isAbstract}
		cls.methods.push({
			name: methodData.name || "method",
			visibility: methodData.visibility || "+",
			returnType: methodData.returnType || "void",
			parameters: methodData.parameters || "",  // "param1: Type1, param2: Type2"
			isStatic: methodData.isStatic || false,
			isAbstract: methodData.isAbstract || false
		});
		renderClassDetails(classId);
	}
}

function removeMethodFromClass(classId, index) {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.methods.splice(index, 1);
		renderClassDetails(classId);
	}
}

function addClassRelationship(fromClassId, toClassId, relationType) {
	// relationType: "inheritance", "composition", "aggregation", "association"
	if (!state.classRelationships.some(rel => rel.from === fromClassId && rel.to === toClassId && rel.type === relationType)) {
		state.classRelationships.push({
			id: generateId(),
			from: fromClassId,
			to: toClassId,
			type: relationType,
			label: ""
		});
		renderClassRelationships();
	}
}

function removeClassRelationship(id) {
	state.classRelationships = state.classRelationships.filter(rel => rel.id !== id);
	renderClassRelationships();
}

// ===============================
// STATE MUTATION FUNCTIONS - USECASE
// ===============================
function addActorUC(name) {
	if (!name) return alert("Actor name cannot be empty.");
	if (state.actorsUC.includes(name)) return alert("Actor already exists.");
	state.actorsUC.push(name);
	renderActorsUC();
}

function removeActorUC(name) {
	state.actorsUC = state.actorsUC.filter(actor => actor !== name);
	state.useCaseLinks = state.useCaseLinks.filter(link => link.actor !== name);
	renderActorsUC();
	renderUCLinks();
}

function addUseCase(name) {
	if (!name) return alert("Use case name cannot be empty.");
	if (state.useCases.includes(name)) return alert("Use case already exists.");
	state.useCases.push(name);
	renderUseCases();
}

function removeUseCase(name) {
	state.useCases = state.useCases.filter(uc => uc !== name);
	state.useCaseLinks = state.useCaseLinks.filter(link => link.useCase !== name);
	renderUseCases();
	renderUCLinks();
}

function addUCLink() {
	if (state.actorsUC.length === 0) return alert("You need at least 1 actor.");
	if (state.useCases.length === 0) return alert("You need at least 1 use case.");
	state.useCaseLinks.push({
		id: generateId(),
		actor: state.actorsUC[0],
		useCase: state.useCases[0]
	});
	renderUCLinks();
}

function removeUCLink(id) {
	state.useCaseLinks = state.useCaseLinks.filter(link => link.id !== id);
	renderUCLinks();
}

// ===============================
// STATE MUTATION FUNCTIONS - ERD
// ===============================
function addEntity(name) {
	if (!name) return alert("Entity name cannot be empty.");
	if (state.entities.some(e => e.name === name)) return alert("Entity already exists.");
	state.entities.push({
		id: generateId(),
		name,
		attributes: []  // {name, type, isPK, isFK, isNotNull}
	});
	renderEntities();
}

function removeEntity(id) {
	state.entities = state.entities.filter(e => e.id !== id);
	state.erdRelationships = state.erdRelationships.filter(rel => rel.from !== id && rel.to !== id);
	renderEntities();
	document.getElementById("entityDetailsContainer").innerHTML = "<p>Select an entity to edit attributes.</p>";
}

function addAttributeToEntity(entityId, attrData) {
	// attrData = {name, type, isPK, isFK, isNotNull}
	const entity = state.entities.find(e => e.id === entityId);
	if (entity) {
		entity.attributes.push({
			name: attrData.name || "attribute",
			type: attrData.type || "VARCHAR",
			isPK: attrData.isPK || false,
			isFK: attrData.isFK || false,
			isNotNull: attrData.isNotNull || false
		});
		renderEntityDetails(entityId);
	}
}

function removeAttributeFromEntity(entityId, index) {
	const entity = state.entities.find(e => e.id === entityId);
	if (entity) {
		entity.attributes.splice(index, 1);
		renderEntityDetails(entityId);
	}
}

function addErdRelationship(fromId, toId, relationType) {
	// relationType: "one-to-one", "one-to-many", "many-to-many"
	if (!state.erdRelationships.some(rel => rel.from === fromId && rel.to === toId && rel.type === relationType)) {
		state.erdRelationships.push({
			id: generateId(),
			from: fromId,
			to: toId,
			type: relationType,
			label: ""
		});
		renderErdRelationships();
	}
}

function removeErdRelationship(id) {
	state.erdRelationships = state.erdRelationships.filter(rel => rel.id !== id);
	renderErdRelationships();
}

// ===============================
// STATE MUTATION FUNCTIONS - ACTIVITY
// ===============================
function addActivity(name) {
	if (!name) return alert("Activity name cannot be empty.");
	if (state.activities.some(a => a === name)) return alert("Activity already exists.");
	state.activities.push(name);
	renderActivities();
}

function removeActivity(name) {
	state.activities = state.activities.filter(a => a !== name);
	state.activityFlows = state.activityFlows.filter(f => f.from !== name && f.to !== name);
	renderActivities();
	renderActivityFlows();
}

function addActivityFlow() {
	if (state.activities.length < 2) return alert("You need at least 2 activities.");
	state.activityFlows.push({
		id: generateId(),
		from: state.activities[0],
		to: state.activities[1]
	});
	renderActivityFlows();
}

function removeActivityFlow(id) {
	state.activityFlows = state.activityFlows.filter(f => f.id !== id);
	renderActivityFlows();
}

// ===============================
// STATE MUTATION FUNCTIONS - COMPONENT
// ===============================
function addComponent(name) {
	if (!name) return alert("Component name cannot be empty.");
	if (state.components.some(c => c === name)) return alert("Component already exists.");
	state.components.push(name);
	renderComponents();
}

function removeComponent(name) {
	state.components = state.components.filter(c => c !== name);
	state.componentDeps = state.componentDeps.filter(d => d.from !== name && d.to !== name);
	renderComponents();
	renderComponentDeps();
}

function addComponentDep() {
	if (state.components.length < 2) return alert("You need at least 2 components.");
	state.componentDeps.push({
		id: generateId(),
		from: state.components[0],
		to: state.components[1]
	});
	renderComponentDeps();
}

function removeComponentDep(id) {
	state.componentDeps = state.componentDeps.filter(d => d.id !== id);
	renderComponentDeps();
}

// ===============================
// STATE MUTATION FUNCTIONS - STATE MACHINE
// ===============================
function addState(name) {
	if (!name) return alert("State name cannot be empty.");
	if (state.states.some(s => s === name)) return alert("State already exists.");
	state.states.push(name);
	renderStates();
}

function removeState(name) {
	state.states = state.states.filter(s => s !== name);
	state.stateTransitions = state.stateTransitions.filter(t => t.from !== name && t.to !== name);
	renderStates();
	renderStateTransitions();
}

function addStateTransition() {
	if (state.states.length < 2) return alert("You need at least 2 states.");
	state.stateTransitions.push({
		id: generateId(),
		from: state.states[0],
		to: state.states[1],
		event: ""
	});
	renderStateTransitions();
}

function removeStateTransition(id) {
	state.stateTransitions = state.stateTransitions.filter(t => t.id !== id);
	renderStateTransitions();
}

// ===============================
// EVENT LISTENERS SETUP
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("diagramType").addEventListener("change", (e) => {
    state.diagramType = e.target.value;
    rotateNode(e.target.value);
  });

  // COLOR PICKER EVENTS
  document.getElementById("primaryColorPicker").addEventListener("input", (e) => {
    state.primaryColor = e.target.value;
  });
  document.getElementById("bgColorPicker").addEventListener("input", (e) => {
    state.backgroundColor = e.target.value;
  });
  document.getElementById("textColorPicker").addEventListener("input", (e) => {
    state.textColor = e.target.value;
  });

  // SEQUENCE EVENTS
  document.getElementById("addActorBtn").addEventListener("click", () => {
    const input = document.getElementById("actorInput");
    addActor(input.value.trim());
    input.value = "";
  });
  document.getElementById("actorInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addActor(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addMessageBtn").addEventListener("click", addMessage);

  // CLASS EVENTS
  document.getElementById("addClassBtn").addEventListener("click", () => {
    const input = document.getElementById("classInput");
    addClass(input.value.trim());
    input.value = "";
  });
  document.getElementById("classInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addClass(e.target.value.trim());
      e.target.value = "";
    }
  });
  
  // Class Relationships
  const addClassRelBtn = document.getElementById("addClassRelationshipBtn");
  if (addClassRelBtn) {
    addClassRelBtn.addEventListener("click", () => {
      if (state.classes.length < 2) return alert("You need at least 2 classes.");
      addClassRelationship(state.classes[0].id, state.classes[1].id, "association");
    });
  }

  // USECASE EVENTS
  document.getElementById("addActorBtnUC").addEventListener("click", () => {
    const input = document.getElementById("actorInputUC");
    addActorUC(input.value.trim());
    input.value = "";
  });
  document.getElementById("actorInputUC").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addActorUC(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addUseCaseBtn").addEventListener("click", () => {
    const input = document.getElementById("useCaseInput");
    addUseCase(input.value.trim());
    input.value = "";
  });
  document.getElementById("useCaseInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addUseCase(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addUCLinkBtn").addEventListener("click", addUCLink);
  document.getElementById("ucDirection").addEventListener("change", (e) => {
    state.ucDirection = e.target.value;
  });

  // ERD EVENTS
  document.getElementById("addEntityBtn").addEventListener("click", () => {
    const input = document.getElementById("entityInput");
    addEntity(input.value.trim());
    input.value = "";
  });
  document.getElementById("entityInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addEntity(e.target.value.trim());
      e.target.value = "";
    }
  });
  
  // ERD Relationships
  const addErdRelBtn = document.getElementById("addErdRelationshipBtn");
  if (addErdRelBtn) {
    addErdRelBtn.addEventListener("click", () => {
      if (state.entities.length < 2) return alert("You need at least 2 entities.");
      addErdRelationship(state.entities[0].id, state.entities[1].id, "one-to-many");
    });
  }

  // ACTIVITY EVENTS
  document.getElementById("addActivityBtn").addEventListener("click", () => {
    const input = document.getElementById("activityInput");
    addActivity(input.value.trim());
    input.value = "";
  });
  document.getElementById("activityInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addActivity(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addActivityFlowBtn").addEventListener("click", addActivityFlow);

  // COMPONENT EVENTS
  document.getElementById("addComponentBtn").addEventListener("click", () => {
    const input = document.getElementById("componentInput");
    addComponent(input.value.trim());
    input.value = "";
  });
  document.getElementById("componentInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addComponent(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addComponentDepBtn").addEventListener("click", addComponentDep);

  // STATE MACHINE EVENTS
  document.getElementById("addStateBtn").addEventListener("click", () => {
    const input = document.getElementById("stateInput");
    addState(input.value.trim());
    input.value = "";
  });
  document.getElementById("stateInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addState(e.target.value.trim());
      e.target.value = "";
    }
  });
  document.getElementById("addStateTransitionBtn").addEventListener("click", addStateTransition);

  // CORE BUTTONS
  document.getElementById("generateBtn").addEventListener("click", generateDiagram);
  document.getElementById("clearBtn").addEventListener("click", clearDiagram);
  document.getElementById("downloadBtn").addEventListener("click", downloadDiagram);
});

// ===============================
// RENDER FUNCTIONS - SEQUENCE
// ===============================
function renderActors() {
  const list = document.getElementById("actorsList");
  list.innerHTML = "";
  state.actors.forEach(actor => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <span>${actor}</span>
      <button data-name="${actor}">×</button>
    `;
    div.querySelector("button").addEventListener("click", (e) => removeActor(e.target.dataset.name));
    list.appendChild(div);
  });
}

function renderMessages() {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = "";
  state.messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message-row";
    div.innerHTML = `
      <select class="from">
        ${state.actors.map(a => `<option value="${a}" ${a === msg.from ? "selected" : ""}>${a}</option>`).join("")}
      </select>
      <select class="arrow">
        <option value="->" ${msg.arrow === "->" ? "selected" : ""}>-></option>
        <option value="-->" ${msg.arrow === "-->" ? "selected" : ""}>--></option>
        <option value="->>" ${msg.arrow === "->>" ? "selected" : ""}>->></option>
      </select>
      <select class="to">
        ${state.actors.map(a => `<option value="${a}" ${a === msg.to ? "selected" : ""}>${a}</option>`).join("")}
      </select>
      <input type="text" class="text" value="${msg.text}" placeholder="Message">
      <button data-id="${msg.id}">Delete</button>
    `;
    div.querySelector(".from").addEventListener("change", (e) => msg.from = e.target.value);
    div.querySelector(".to").addEventListener("change", (e) => msg.to = e.target.value);
    div.querySelector(".arrow").addEventListener("change", (e) => msg.arrow = e.target.value);
    div.querySelector(".text").addEventListener("input", (e) => msg.text = e.target.value);
    div.querySelector("button").addEventListener("click", (e) => removeMessage(e.target.dataset.id));
    container.appendChild(div);
  });
}

// ===============================
// RENDER FUNCTIONS - CLASS
// ===============================
function renderClasses() {
	const list = document.getElementById("classList");
	list.innerHTML = "";
	state.classes.forEach(cls => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `
			<span>${cls.name}</span>
			<button data-id="${cls.id}">×</button>
		`;
		div.querySelector("span").addEventListener("click", () => renderClassDetails(cls.id));
		div.querySelector("button").addEventListener("click", (e) => {
			e.stopPropagation();
			removeClass(e.target.dataset.id);
		});
		list.appendChild(div);
	});
}

function renderClassDetails(classId) {
	const cls = state.classes.find(c => c.id === classId);
	if (!cls) return;
	const container = document.getElementById("classDetailsContainer");
	container.innerHTML = `
		<div class="class-details">
			<h4>${cls.name}</h4>
			<label>
				<input type="checkbox" id="isAbstractChk" ${cls.isAbstract ? "checked" : ""}>
				Abstract Class
			</label>
			<div class="class-section">
				<h5>Attributes</h5>
				<div id="attributesList"></div>
				<div class="attr-form">
					<input type="text" id="attrName" placeholder="Name">
					<select id="attrVisibility">
						<option value="+">+ Public</option>
						<option value="-">- Private</option>
						<option value="#"># Protected</option>
						<option value="~">~ Package</option>
					</select>
					<input type="text" id="attrType" placeholder="Type (e.g., String)">
					<label>
						<input type="checkbox" id="attrStatic">
						Static
					</label>
					<button id="addAttributeBtn">Add Attribute</button>
				</div>
			</div>
			<div class="class-section">
				<h5>Methods</h5>
				<div id="methodsList"></div>
				<div class="method-form">
					<input type="text" id="methodName" placeholder="Name">
					<select id="methodVisibility">
						<option value="+">+ Public</option>
						<option value="-">- Private</option>
						<option value="#"># Protected</option>
						<option value="~">~ Package</option>
					</select>
					<input type="text" id="methodParams" placeholder="Parameters (e.g., name: String, age: int)">
					<input type="text" id="methodReturn" placeholder="Return Type (e.g., void, String)">
					<label>
						<input type="checkbox" id="methodStatic">
						Static
					</label>
					<label>
						<input type="checkbox" id="methodAbstract">
						Abstract
					</label>
					<button id="addMethodBtn">Add Method</button>
				</div>
			</div>
		</div>
	`;
	
	// Update abstract class checkbox
	document.getElementById("isAbstractChk").addEventListener("change", (e) => {
		cls.isAbstract = e.target.checked;
		renderClasses();
	});
	
	const attrList = container.querySelector("#attributesList");
	cls.attributes.forEach((attr, index) => {
		const div = document.createElement("div");
		div.className = "list-item";
		const staticStr = attr.isStatic ? "<<static>> " : "";
		const displayStr = `${attr.visibility} ${staticStr}${attr.name}: ${attr.type}`;
		div.innerHTML = `<span>${displayStr}</span><button data-index="${index}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeAttributeFromClass(classId, parseInt(e.target.dataset.index)));
		attrList.appendChild(div);
	});
	
	const methodList = container.querySelector("#methodsList");
	cls.methods.forEach((method, index) => {
		const div = document.createElement("div");
		div.className = "list-item";
		const staticStr = method.isStatic ? "<<static>> " : "";
		const abstractStr = method.isAbstract ? "<<abstract>> " : "";
		const displayStr = `${method.visibility} ${staticStr}${abstractStr}${method.name}(${method.parameters}): ${method.returnType}`;
		div.innerHTML = `<span>${displayStr}</span><button data-index="${index}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeMethodFromClass(classId, parseInt(e.target.dataset.index)));
		methodList.appendChild(div);
	});
	
	document.getElementById("addAttributeBtn").addEventListener("click", () => {
		const name = document.getElementById("attrName").value.trim();
		if (!name) return alert("Attribute name cannot be empty.");
		addAttributeToClass(classId, {
			name,
			visibility: document.getElementById("attrVisibility").value,
			type: document.getElementById("attrType").value || "String",
			isStatic: document.getElementById("attrStatic").checked
		});
		document.getElementById("attrName").value = "";
		document.getElementById("attrType").value = "";
		document.getElementById("attrStatic").checked = false;
	});
	
	document.getElementById("addMethodBtn").addEventListener("click", () => {
		const name = document.getElementById("methodName").value.trim();
		if (!name) return alert("Method name cannot be empty.");
		addMethodToClass(classId, {
			name,
			visibility: document.getElementById("methodVisibility").value,
			returnType: document.getElementById("methodReturn").value || "void",
			parameters: document.getElementById("methodParams").value || "",
			isStatic: document.getElementById("methodStatic").checked,
			isAbstract: document.getElementById("methodAbstract").checked
		});
		document.getElementById("methodName").value = "";
		document.getElementById("methodParams").value = "";
		document.getElementById("methodReturn").value = "";
		document.getElementById("methodStatic").checked = false;
		document.getElementById("methodAbstract").checked = false;
	});
}

// ===============================
// RENDER FUNCTIONS - USECASE
// ===============================
function renderActorsUC() {
	const list = document.getElementById("actorsListUC");
	list.innerHTML = "";
	state.actorsUC.forEach(actor => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${actor}</span><button data-name="${actor}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeActorUC(e.target.dataset.name));
		list.appendChild(div);
	});
}

function renderUseCases() {
	const list = document.getElementById("useCaseList");
	list.innerHTML = "";
	state.useCases.forEach(uc => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${uc}</span><button data-name="${uc}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeUseCase(e.target.dataset.name));
		list.appendChild(div);
	});
}

function renderUCLinks() {
	const container = document.getElementById("ucLinksContainer");
	container.innerHTML = "";
	state.useCaseLinks.forEach(link => {
		const div = document.createElement("div");
		div.className = "message-row";
		div.innerHTML = `
			<select class="actor">
				${state.actorsUC.map(a => `<option value="${a}" ${a === link.actor ? "selected" : ""}>${a}</option>`).join("")}
			</select>
			<span style="flex: 0 0 auto; padding: 0 10px;">--></span>
			<select class="usecase">
				${state.useCases.map(uc => `<option value="${uc}" ${uc === link.useCase ? "selected" : ""}>${uc}</option>`).join("")}
			</select>
			<button data-id="${link.id}">Delete</button>
		`;
		div.querySelector(".actor").addEventListener("change", (e) => link.actor = e.target.value);
		div.querySelector(".usecase").addEventListener("change", (e) => link.useCase = e.target.value);
		div.querySelector("button").addEventListener("click", (e) => removeUCLink(e.target.dataset.id));
		container.appendChild(div);
	});
}

// ===============================
// RENDER FUNCTIONS - ERD
// ===============================
function renderEntities() {
	const list = document.getElementById("entitiesList");
	list.innerHTML = "";
	state.entities.forEach(entity => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${entity.name}</span><button data-id="${entity.id}">×</button>`;
		div.querySelector("span").addEventListener("click", () => renderEntityDetails(entity.id));
		div.querySelector("button").addEventListener("click", (e) => removeEntity(e.target.dataset.id));
		list.appendChild(div);
	});
}

function renderEntityDetails(entityId) {
	const entity = state.entities.find(e => e.id === entityId);
	if (!entity) return;
	const container = document.getElementById("entityDetailsContainer");
	container.innerHTML = `
		<div class="class-details">
			<h4>${entity.name}</h4>
			<div class="class-section">
				<h5>Attributes</h5>
				<div id="erdAttrsList"></div>
				<div class="attr-form">
					<input type="text" id="erdAttrName" placeholder="Name">
					<select id="erdAttrType">
						<option value="INT">INT</option>
						<option value="VARCHAR">VARCHAR</option>
						<option value="DATE">DATE</option>
						<option value="DECIMAL">DECIMAL</option>
						<option value="BOOLEAN">BOOLEAN</option>
						<option value="TEXT">TEXT</option>
					</select>
					<label>
						<input type="checkbox" id="erdAttrPK">
						Primary Key
					</label>
					<label>
						<input type="checkbox" id="erdAttrFK">
						Foreign Key
					</label>
					<label>
						<input type="checkbox" id="erdAttrNotNull">
						Not Null
					</label>
					<button id="addErdAttrBtn">Add Attribute</button>
				</div>
			</div>
		</div>
	`;
	const attrList = container.querySelector("#erdAttrsList");
	entity.attributes.forEach((attr, index) => {
		const div = document.createElement("div");
		div.className = "list-item";
		const pkStr = attr.isPK ? " (PK)" : "";
		const fkStr = attr.isFK ? " (FK)" : "";
		const nnStr = attr.isNotNull ? " NOT NULL" : "";
		const displayStr = `${attr.name}: ${attr.type}${pkStr}${fkStr}${nnStr}`;
		div.innerHTML = `<span>${displayStr}</span><button data-index="${index}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeAttributeFromEntity(entityId, parseInt(e.target.dataset.index)));
		attrList.appendChild(div);
	});
	
	document.getElementById("addErdAttrBtn").addEventListener("click", () => {
		const name = document.getElementById("erdAttrName").value.trim();
		if (!name) return alert("Attribute name cannot be empty.");
		addAttributeToEntity(entityId, {
			name,
			type: document.getElementById("erdAttrType").value,
			isPK: document.getElementById("erdAttrPK").checked,
			isFK: document.getElementById("erdAttrFK").checked,
			isNotNull: document.getElementById("erdAttrNotNull").checked
		});
		document.getElementById("erdAttrName").value = "";
		document.getElementById("erdAttrPK").checked = false;
		document.getElementById("erdAttrFK").checked = false;
		document.getElementById("erdAttrNotNull").checked = false;
	});
}

// ===============================
// RENDER FUNCTIONS - CLASS RELATIONSHIPS
// ===============================
function renderClassRelationships() {
	const container = document.getElementById("classRelationshipsContainer");
	if (!container) return;  // Container might not exist yet
	
	container.innerHTML = "";
	state.classRelationships.forEach(rel => {
		const fromClass = state.classes.find(c => c.id === rel.from);
		const toClass = state.classes.find(c => c.id === rel.to);
		if (!fromClass || !toClass) return;
		
		const div = document.createElement("div");
		div.className = "message-row";
		const symbols = {
			"inheritance": "--|>",
			"composition": "*--",
			"aggregation": "o--",
			"association": "--"
		};
		const symbol = symbols[rel.type] || "--";
		
		div.innerHTML = `
			<select class="from">
				${state.classes.map(c => `<option value="${c.id}" ${c.id === rel.from ? "selected" : ""}>${c.name}</option>`).join("")}
			</select>
			<span style="flex: 0 0 auto; padding: 0 10px;">${symbol}</span>
			<select class="to">
				${state.classes.map(c => `<option value="${c.id}" ${c.id === rel.to ? "selected" : ""}>${c.name}</option>`).join("")}
			</select>
			<select class="type">
				<option value="inheritance" ${rel.type === "inheritance" ? "selected" : ""}>Inheritance</option>
				<option value="composition" ${rel.type === "composition" ? "selected" : ""}>Composition</option>
				<option value="aggregation" ${rel.type === "aggregation" ? "selected" : ""}>Aggregation</option>
				<option value="association" ${rel.type === "association" ? "selected" : ""}>Association</option>
			</select>
			<button data-id="${rel.id}">Delete</button>
		`;
		
		div.querySelector(".from").addEventListener("change", (e) => {
			rel.from = e.target.value;
			renderClassRelationships();
		});
		div.querySelector(".to").addEventListener("change", (e) => {
			rel.to = e.target.value;
			renderClassRelationships();
		});
		div.querySelector(".type").addEventListener("change", (e) => {
			rel.type = e.target.value;
			renderClassRelationships();
		});
		div.querySelector("button").addEventListener("click", (e) => removeClassRelationship(e.target.dataset.id));
		
		container.appendChild(div);
	});
}

// ===============================
// RENDER FUNCTIONS - ERD RELATIONSHIPS
// ===============================
function renderErdRelationships() {
	const container = document.getElementById("erdRelationshipsContainer");
	if (!container) return;  // Container might not exist yet
	
	container.innerHTML = "";
	state.erdRelationships.forEach(rel => {
		const fromEntity = state.entities.find(e => e.id === rel.from);
		const toEntity = state.entities.find(e => e.id === rel.to);
		if (!fromEntity || !toEntity) return;
		
		const div = document.createElement("div");
		div.className = "message-row";
		const symbols = {
			"one-to-one": "||--||",
			"one-to-many": "||--o{",
			"many-to-many": "}o--o{"
		};
		const symbol = symbols[rel.type] || "--";
		
		div.innerHTML = `
			<select class="from">
				${state.entities.map(e => `<option value="${e.id}" ${e.id === rel.from ? "selected" : ""}>${e.name}</option>`).join("")}
			</select>
			<span style="flex: 0 0 auto; padding: 0 10px;">${symbol}</span>
			<select class="to">
				${state.entities.map(e => `<option value="${e.id}" ${e.id === rel.to ? "selected" : ""}>${e.name}</option>`).join("")}
			</select>
			<select class="type">
				<option value="one-to-one" ${rel.type === "one-to-one" ? "selected" : ""}>One-to-One</option>
				<option value="one-to-many" ${rel.type === "one-to-many" ? "selected" : ""}>One-to-Many</option>
				<option value="many-to-many" ${rel.type === "many-to-many" ? "selected" : ""}>Many-to-Many</option>
			</select>
			<button data-id="${rel.id}">Delete</button>
		`;
		
		div.querySelector(".from").addEventListener("change", (e) => {
			rel.from = e.target.value;
			renderErdRelationships();
		});
		div.querySelector(".to").addEventListener("change", (e) => {
			rel.to = e.target.value;
			renderErdRelationships();
		});
		div.querySelector(".type").addEventListener("change", (e) => {
			rel.type = e.target.value;
			renderErdRelationships();
		});
		div.querySelector("button").addEventListener("click", (e) => removeErdRelationship(e.target.dataset.id));
		
		container.appendChild(div);
	});
}


function renderActivities() {
	const list = document.getElementById("activitiesList");
	list.innerHTML = "";
	state.activities.forEach(activity => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${activity}</span><button data-name="${activity}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeActivity(e.target.dataset.name));
		list.appendChild(div);
	});
}

function renderActivityFlows() {
	const container = document.getElementById("activityFlowsContainer");
	container.innerHTML = "";
	state.activityFlows.forEach(flow => {
		const div = document.createElement("div");
		div.className = "message-row";
		div.innerHTML = `
			<select class="from">
				${state.activities.map(a => `<option value="${a}" ${a === flow.from ? "selected" : ""}>${a}</option>`).join("")}
			</select>
			<span style="flex: 0 0 auto; padding: 0 10px;">→</span>
			<select class="to">
				${state.activities.map(a => `<option value="${a}" ${a === flow.to ? "selected" : ""}>${a}</option>`).join("")}
			</select>
			<button data-id="${flow.id}">Delete</button>
		`;
		div.querySelector(".from").addEventListener("change", (e) => flow.from = e.target.value);
		div.querySelector(".to").addEventListener("change", (e) => flow.to = e.target.value);
		div.querySelector("button").addEventListener("click", (e) => removeActivityFlow(e.target.dataset.id));
		container.appendChild(div);
	});
}

// ===============================
// RENDER FUNCTIONS - COMPONENT
// ===============================
function renderComponents() {
	const list = document.getElementById("componentsList");
	list.innerHTML = "";
	state.components.forEach(comp => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${comp}</span><button data-name="${comp}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeComponent(e.target.dataset.name));
		list.appendChild(div);
	});
}

function renderComponentDeps() {
	const container = document.getElementById("componentDepsContainer");
	container.innerHTML = "";
	state.componentDeps.forEach(dep => {
		const div = document.createElement("div");
		div.className = "message-row";
		div.innerHTML = `
			<select class="from">
				${state.components.map(c => `<option value="${c}" ${c === dep.from ? "selected" : ""}>${c}</option>`).join("")}
			</select>
			<span style="flex: 0 0 auto; padding: 0 10px;">uses</span>
			<select class="to">
				${state.components.map(c => `<option value="${c}" ${c === dep.to ? "selected" : ""}>${c}</option>`).join("")}
			</select>
			<button data-id="${dep.id}">Delete</button>
		`;
		div.querySelector(".from").addEventListener("change", (e) => dep.from = e.target.value);
		div.querySelector(".to").addEventListener("change", (e) => dep.to = e.target.value);
		div.querySelector("button").addEventListener("click", (e) => removeComponentDep(e.target.dataset.id));
		container.appendChild(div);
	});
}

// ===============================
// RENDER FUNCTIONS - STATE MACHINE
// ===============================
function renderStates() {
	const list = document.getElementById("statesList");
	list.innerHTML = "";
	state.states.forEach(st => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `<span>${st}</span><button data-name="${st}">×</button>`;
		div.querySelector("button").addEventListener("click", (e) => removeState(e.target.dataset.name));
		list.appendChild(div);
	});
}

function renderStateTransitions() {
	const container = document.getElementById("stateTransitionsContainer");
	container.innerHTML = "";
	state.stateTransitions.forEach(trans => {
		const div = document.createElement("div");
		div.className = "message-row";
		div.innerHTML = `
			<select class="from">
				${state.states.map(s => `<option value="${s}" ${s === trans.from ? "selected" : ""}>${s}</option>`).join("")}
			</select>
			<input type="text" class="event" value="${trans.event}" placeholder="Event/Condition">
			<select class="to">
				${state.states.map(s => `<option value="${s}" ${s === trans.to ? "selected" : ""}>${s}</option>`).join("")}
			</select>
			<button data-id="${trans.id}">Delete</button>
		`;
		div.querySelector(".from").addEventListener("change", (e) => trans.from = e.target.value);
		div.querySelector(".to").addEventListener("change", (e) => trans.to = e.target.value);
		div.querySelector(".event").addEventListener("input", (e) => trans.event = e.target.value);
		div.querySelector("button").addEventListener("click", (e) => removeStateTransition(e.target.dataset.id));
		container.appendChild(div);
	});
}

// ===============================
// GENERATE PLANTUML STRING - ALL TYPES
// ===============================
function generatePlantUML() {
	let uml = "@startuml\n";
	
	// Add skinparam styling directives
	uml += "skinparam defaultFontColor " + state.textColor + "\n";
	uml += "skinparam backgroundColor " + state.backgroundColor + "\n";
	uml += "skinparam borderColor " + state.primaryColor + "\n";
	uml += "skinparam arrowColor " + state.primaryColor + "\n";
	uml += "skinparam sequenceLifeLineBorderColor " + state.primaryColor + "\n";
	uml += "skinparam sequenceActorFontColor " + state.textColor + "\n";
	uml += "skinparam sequenceActorBackgroundColor " + state.primaryColor + "\n";
	uml += "skinparam sequenceParticipantFontColor " + state.textColor + "\n";
	uml += "skinparam sequenceParticipantBackgroundColor " + state.primaryColor + "\n";
	uml += "skinparam classBkgColor " + state.backgroundColor + "\n";
	uml += "skinparam classBorderColor " + state.primaryColor + "\n";
	uml += "skinparam classAttributeFontColor " + state.textColor + "\n";
	uml += "skinparam classMethodFontColor " + state.textColor + "\n";
	uml += "skinparam usecaseBkgColor " + state.backgroundColor + "\n";
	uml += "skinparam usecaseBorderColor " + state.primaryColor + "\n";
	uml += "skinparam usecaseActorBackgroundColor " + state.primaryColor + "\n";
	uml += "skinparam usecaseActorBorderColor " + state.primaryColor + "\n";
	uml += "skinparam componentBackgroundColor " + state.backgroundColor + "\n";
	uml += "skinparam componentBorderColor " + state.primaryColor + "\n";
	uml += "skinparam stateBkgColor " + state.backgroundColor + "\n";
	uml += "skinparam stateBorderColor " + state.primaryColor + "\n";
	uml += "skinparam entityBkgColor " + state.backgroundColor + "\n";
	uml += "skinparam entityBorderColor " + state.primaryColor + "\n";
	uml += "skinparam activityBackgroundColor " + state.backgroundColor + "\n";
	uml += "skinparam activityBorderColor " + state.primaryColor + "\n";
	uml += "\n";

	if (state.diagramType === "sequence") {
		state.actors.forEach(actor => uml += `actor ${actor}\n`);
		uml += "\n";
		state.messages.forEach(msg => uml += `${msg.from} ${msg.arrow} ${msg.to}: ${msg.text}\n`);
	} else if (state.diagramType === "class") {
		state.classes.forEach(cls => {
			const abstractStr = cls.isAbstract ? "abstract " : "";
			uml += `${abstractStr}class "${cls.name}" {\n`;
			
			// Add attributes
			cls.attributes.forEach(attr => {
				const staticStr = attr.isStatic ? "{static} " : "";
				uml += `  ${attr.visibility} ${staticStr}${attr.name}: ${attr.type}\n`;
			});
			
			// Add methods
			if (cls.methods.length > 0 && cls.attributes.length > 0) {
				uml += `  --\n`;  // Separator between attributes and methods
			}
			cls.methods.forEach(method => {
				const staticStr = method.isStatic ? "{static} " : "";
				const abstractStr = method.isAbstract ? "{abstract} " : "";
				const params = method.parameters ? `(${method.parameters})` : "()";
				uml += `  ${method.visibility} ${staticStr}${abstractStr}${method.name}${params}: ${method.returnType}\n`;
			});
			
			uml += `}\n`;
		});
		
		// Add class relationships
		state.classRelationships.forEach(rel => {
			const fromClass = state.classes.find(c => c.id === rel.from);
			const toClass = state.classes.find(c => c.id === rel.to);
			if (fromClass && toClass) {
				const symbols = {
					"inheritance": "<|--",
					"composition": "*--",
					"aggregation": "o--",
					"association": "--"
				};
				const symbol = symbols[rel.type] || "--";
				uml += `"${fromClass.name}" ${symbol} "${toClass.name}"\n`;
			}
		});
	} else if (state.diagramType === "usecase") {
		if (state.ucDirection === "horizontal") {
			uml += "left to right direction\n";
		} else {
			uml += "top to bottom direction\n";
		}
		uml += "\n";
		state.actorsUC.forEach(actor => uml += `actor "${actor}"\n`);
		state.useCases.forEach(uc => uml += `usecase "${uc}"\n`);
		uml += "\n";
		state.useCaseLinks.forEach(link => uml += `"${link.actor}" --> "${link.useCase}"\n`);
	} else if (state.diagramType === "erd") {
		state.entities.forEach(entity => {
			uml += `entity ${entity.name} {\n`;
			
			entity.attributes.forEach(attr => {
				const pkStr = attr.isPK ? " [PK]" : "";
				const fkStr = attr.isFK ? " [FK]" : "";
				const nnStr = attr.isNotNull ? " [NOT NULL]" : "";
				uml += `  * ${attr.name}: ${attr.type}${pkStr}${fkStr}${nnStr}\n`;
			});
			
			uml += `}\n`;
		});
		
		// Add ERD relationships
		state.erdRelationships.forEach(rel => {
			const fromEntity = state.entities.find(e => e.id === rel.from);
			const toEntity = state.entities.find(e => e.id === rel.to);
			if (fromEntity && toEntity) {
				const symbols = {
					"one-to-one": "||--||",
					"one-to-many": "||--o{",
					"many-to-many": "}o--o{"
				};
				const symbol = symbols[rel.type] || "--";
				uml += `"${fromEntity.name}" ${symbol} "${toEntity.name}"\n`;
			}
		});
	} else if (state.diagramType === "activity") {
		state.activities.forEach(activity => uml += `action "${activity}"\n`);
		uml += "\n";
		state.activityFlows.forEach(flow => uml += `"${flow.from}" --> "${flow.to}"\n`);
	} else if (state.diagramType === "component") {
		state.components.forEach(comp => uml += `component [${comp}]\n`);
		uml += "\n";
		state.componentDeps.forEach(dep => uml += `[${dep.from}] --> [${dep.to}]\n`);
	} else if (state.diagramType === "statemachine") {
		state.states.forEach(st => uml += `state "${st}"\n`);
		uml += "\n";
		state.stateTransitions.forEach(trans => {
			const event = trans.event ? ` : ${trans.event}` : "";
			uml += `"${trans.from}" --> "${trans.to}"${event}\n`;
		});
	}

	uml += "@enduml";
	return uml;
}

// ===============================
// CORE FUNCTIONS
// ===============================
async function generateDiagram() {
	const umlText = generatePlantUML();
	if (!umlText) return alert("Failed to generate UML text.");

	try {
		const response = await fetch("/generate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ uml: umlText })
		});
		const svg = await response.text();

		let activeSection;
		const sections = ["sequenceSection", "classSection", "useCaseSection", "erdSection", "activitySection", "componentSection", "statemachineSection"];
		for (const sectionId of sections) {
			if (document.getElementById(sectionId).style.display !== "none") {
				activeSection = document.getElementById(sectionId);
				break;
			}
		}

		if (activeSection) {
			const previewDiv = activeSection.querySelector(".preview");
			previewDiv.innerHTML = svg;
		}

		const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
		const diagramName = `${state.diagramType}-diagram-${timestamp}.svg`;
		state.lastGeneratedSvg = { content: svg, filename: diagramName };
		document.getElementById("downloadBtn").disabled = false;
	} catch (err) {
		console.error(err);
		alert("Failed to generate diagram: " + err.message);
	}
}

function clearDiagram() {
	state.diagramType = document.getElementById("diagramType").value;
	
	if (state.diagramType === "sequence") {
		state.actors = [];
		state.messages = [];
		renderActors();
		renderMessages();
	} else if (state.diagramType === "class") {
		state.classes = [];
		state.classRelationships = [];
		renderClasses();
		if (document.getElementById("classRelationshipsContainer")) {
			renderClassRelationships();
		}
		document.getElementById("classDetailsContainer").innerHTML = "<p>Select a class to edit its attributes and methods.</p>";
	} else if (state.diagramType === "usecase") {
		state.actorsUC = [];
		state.useCases = [];
		state.useCaseLinks = [];
		state.ucDirection = "vertical";
		document.getElementById("ucDirection").value = "vertical";
		renderActorsUC();
		renderUseCases();
		renderUCLinks();
	} else if (state.diagramType === "erd") {
		state.entities = [];
		state.erdRelationships = [];
		renderEntities();
		if (document.getElementById("erdRelationshipsContainer")) {
			renderErdRelationships();
		}
		document.getElementById("entityDetailsContainer").innerHTML = "<p>Select an entity to edit attributes.</p>";
	} else if (state.diagramType === "activity") {
		state.activities = [];
		state.activityFlows = [];
		renderActivities();
		renderActivityFlows();
	} else if (state.diagramType === "component") {
		state.components = [];
		state.componentDeps = [];
		renderComponents();
		renderComponentDeps();
	} else if (state.diagramType === "statemachine") {
		state.states = [];
		state.stateTransitions = [];
		renderStates();
		renderStateTransitions();
	}

	let activeSection;
	const sections = ["sequenceSection", "classSection", "useCaseSection", "erdSection", "activitySection", "componentSection", "statemachineSection"];
	for (const sectionId of sections) {
		if (document.getElementById(sectionId).style.display !== "none") {
			activeSection = document.getElementById(sectionId);
			break;
		}
	}

	if (activeSection) {
		activeSection.querySelector(".preview").innerHTML = "<h2>Preview</h2><p>Your diagram will appear here.</p>";
	}

	state.lastGeneratedSvg = null;
	document.getElementById("downloadBtn").disabled = true;
}

function downloadDiagram() {
	if (!state.lastGeneratedSvg) {
		alert("No diagram generated yet. Please generate a diagram first.");
		return;
	}
	const { content, filename } = state.lastGeneratedSvg;
	const blob = new Blob([content], { type: "image/svg+xml" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
