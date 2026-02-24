// ===============================
// IMPORT STATEMENTS
// ===============================
import rotateNode from "./switch.js";



// ===============================
// GLOBAL APPLICATION STATE
// ===============================

const state = {
  diagramType: "sequence",
  actors: [],
  messages: [],
  classes: [],
  useCases: [],
  actorsUC: [],
  useCaseLinks: []
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

  if (state.actors.includes(name)) {
      return alert("Actor already exists.");
  }

    state.actors.push(name);
    renderActors();
}


function removeActor(name) {
    state.actors = state.actors.filter(actor => actor !== name);

    // Also remove messages involving that actor
    state.messages = state.messages.filter(msg =>
    msg.from !== name && msg.to !== name
  );

  renderActors();
  renderMessages();
}


function addMessage() {
  if (state.actors.length < 2) {
      return alert("You need at least 2 actors.");
  }

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
	if (!name) {
		return alert("Class name cannot be empty.");
	}
	
	if (state.classes.some(cls => cls.name === name)) {
		return alert("Class already exists.");
	}

	state.classes.push({
		id: generateId(),
		name,
		attributes: [],
		methods: []
	});

	renderClasses();
}

function removeClass(id) {
	state.classes = state.classes.filter(cls => cls.id !== id);
	renderClasses();
	document.getElementById("classDetailsContainer").innerHTML = "<p>Select a class to edit its attributes and methods.</p>";
}

function addAttributeToClass(classId, attributeName) {
	if (!attributeName) {
		return alert("Attribute name cannot be empty.");
	}

	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.attributes.push(attributeName);
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

function addMethodToClass(classId, methodName) {
	if (!methodName) {
		return alert("Method name cannot be empty.");
	}

	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.methods.push(methodName);
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


// ===============================
// STATE MUTATION FUNCTIONS - USECASE
// ===============================
function addActorUC(name) {
	if (!name) return alert("Actor name cannot be empty.");

	if (state.actorsUC.includes(name)) {
		return alert("Actor already exists.");
	}

	state.actorsUC.push(name);
	renderActorsUC();
}

function removeActorUC(name) {
	state.actorsUC = state.actorsUC.filter(actor => actor !== name);
	
	// Also remove links involving that actor
	state.useCaseLinks = state.useCaseLinks.filter(link => link.actor !== name);

	renderActorsUC();
	renderUCLinks();
}

function addUseCase(name) {
	if (!name) return alert("Use case name cannot be empty.");

	if (state.useCases.includes(name)) {
		return alert("Use case already exists.");
	}

	state.useCases.push(name);
	renderUseCases();
}

function removeUseCase(name) {
	state.useCases = state.useCases.filter(uc => uc !== name);
	
	// Also remove links involving that use case
	state.useCaseLinks = state.useCaseLinks.filter(link => link.useCase !== name);

	renderUseCases();
	renderUCLinks();
}

function addUCLink() {
	if (state.actorsUC.length === 0) {
		return alert("You need at least 1 actor.");
	}

	if (state.useCases.length === 0) {
		return alert("You need at least 1 use case.");
	}

	const newLink = {
		id: generateId(),
		actor: state.actorsUC[0],
		useCase: state.useCases[0]
	};

	state.useCaseLinks.push(newLink);
	renderUCLinks();
}

function removeUCLink(id) {
	state.useCaseLinks = state.useCaseLinks.filter(link => link.id !== id);
	renderUCLinks();
}


// ===============================
// EVENT LISTENERS (Basic Wiring)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("diagramType").addEventListener("change", (e) => {
      state.diagramType = e.target.value;
      rotateNode(e.target.value);
	});

  // SEQUENCE DIAGRAM EVENTS
  document.getElementById("addActorBtn")
    .addEventListener("click", () => {
      const input = document.getElementById("actorInput");
      addActor(input.value.trim());
      input.value = "";
    });

  document.getElementById("addMessageBtn")
    .addEventListener("click", addMessage);

  // CLASS DIAGRAM EVENTS
  document.getElementById("addClassBtn")
	.addEventListener("click", () => {
	  const input = document.getElementById("classInput");
	  addClass(input.value.trim());
	  input.value = "";
	});

  // USE CASE DIAGRAM EVENTS
  document.getElementById("addActorBtnUC")
	.addEventListener("click", () => {
	  const input = document.getElementById("actorInputUC");
	  addActorUC(input.value.trim());
	  input.value = "";
	});

  document.getElementById("addUseCaseBtn")
	.addEventListener("click", () => {
	  const input = document.getElementById("useCaseInput");
	  addUseCase(input.value.trim());
	  input.value = "";
	});

  document.getElementById("addUCLinkBtn")
	.addEventListener("click", addUCLink);

});




// ===============================
// RENDER ACTORS
// ===============================

function renderActors() {
    const actorsList = document.getElementById("actorsList");
    actorsList.innerHTML = "";


    state.actors.forEach(actor => {
        const div = document.createElement("div");
        div.className = "list-item";
    
        div.innerHTML = `
          <span>${actor}</span>
          <button data-name="${actor}">x</button>
        `;

        div.querySelector("button").addEventListener("click", (e) => {
          removeActor(e.target.dataset.name);
        });
    
        actorsList.appendChild(div);
      });
}



function renderClasses() {
	const classesList = document.getElementById("classList");
	classesList.innerHTML = "";

	state.classes.forEach(cls => {
		const div = document.createElement("div");
		div.className = "list-item";

		div.innerHTML = `
		<span>${cls.name}</span>
		<button data-id="${cls.id}">&times;</button>
		`;

		div.querySelector("span").addEventListener("click", () => {
			renderClassDetails(cls.id);
		});

		div.querySelector("button").addEventListener("click", (e) => {
			e.stopPropagation();
			removeClass(e.target.dataset.id);
		});

    	classesList.appendChild(div);
  	});
}

function renderClassDetails(classId) {
	const cls = state.classes.find(c => c.id === classId);
	if (!cls) return;

	const container = document.getElementById("classDetailsContainer");
	container.innerHTML = `
		<div class="class-details">
			<h4>${cls.name}</h4>
			
			<div class="class-section">
				<h5>Attributes</h5>
				<div id="attributesList"></div>
				<input type="text" id="attributeInput" placeholder="Attribute name (e.g., name: String)">
				<button id="addAttributeBtn">Add Attribute</button>
			</div>

			<div class="class-section">
				<h5>Methods</h5>
				<div id="methodsList"></div>
				<input type="text" id="methodInput" placeholder="Method name (e.g., getName())">
				<button id="addMethodBtn">Add Method</button>
			</div>
		</div>
	`;

	// Render existing attributes
	const attrList = container.querySelector("#attributesList");
	cls.attributes.forEach((attr, index) => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `
			<span>${attr}</span>
			<button data-index="${index}">&times;</button>
		`;
		div.querySelector("button").addEventListener("click", (e) => {
			removeAttributeFromClass(classId, parseInt(e.target.dataset.index));
		});
		attrList.appendChild(div);
	});

	// Render existing methods
	const methodList = container.querySelector("#methodsList");
	cls.methods.forEach((method, index) => {
		const div = document.createElement("div");
		div.className = "list-item";
		div.innerHTML = `
			<span>${method}</span>
			<button data-index="${index}">&times;</button>
		`;
		div.querySelector("button").addEventListener("click", (e) => {
			removeMethodFromClass(classId, parseInt(e.target.dataset.index));
		});
		methodList.appendChild(div);
	});

	// Add event listeners
	document.getElementById("addAttributeBtn").addEventListener("click", () => {
		const input = document.getElementById("attributeInput");
		addAttributeToClass(classId, input.value.trim());
		input.value = "";
	});

	document.getElementById("addMethodBtn").addEventListener("click", () => {
		const input = document.getElementById("methodInput");
		addMethodToClass(classId, input.value.trim());
		input.value = "";
	});
}


// ===============================
// RENDER MESSAGES
// ===============================
function renderMessages() {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = "";

  state.messages.forEach(msg => {

    const div = document.createElement("div");
    div.className = "message-row";

    div.innerHTML = `
      <select class="from">
        ${state.actors.map(actor =>
          `<option value="${actor}" ${actor === msg.from ? "selected" : ""}>${actor}</option>`
        ).join("")}
      </select>

      <select class="arrow">
        <option value="->" ${msg.arrow === "->" ? "selected" : ""}>-></option>
        <option value="-->" ${msg.arrow === "-->" ? "selected" : ""}>--></option>
        <option value="->>" ${msg.arrow === "->>" ? "selected" : ""}>->></option>
      </select>

      <select class="to">
        ${state.actors.map(actor =>
          `<option value="${actor}" ${actor === msg.to ? "selected" : ""}>${actor}</option>`
        ).join("")}
      </select>

      <input type="text" class="text" value="${msg.text}" placeholder="Message">

      <button data-id="${msg.id}">Delete</button>
    `;

    // Update state on change
    div.querySelector(".from").addEventListener("change", (e) => {
      msg.from = e.target.value;
    });

    div.querySelector(".to").addEventListener("change", (e) => {
      msg.to = e.target.value;
    });

    div.querySelector(".arrow").addEventListener("change", (e) => {
      msg.arrow = e.target.value;
    });

    div.querySelector(".text").addEventListener("input", (e) => {
      msg.text = e.target.value;
    });

    div.querySelector("button").addEventListener("click", (e) => {
      removeMessage(e.target.dataset.id);
    });

    container.appendChild(div);
  });
}


// ===============================
// RENDER USE CASE COMPONENTS
// ===============================
function renderActorsUC() {
	const actorsList = document.getElementById("actorsListUC");
	actorsList.innerHTML = "";

	state.actorsUC.forEach(actor => {
		const div = document.createElement("div");
		div.className = "list-item";

		div.innerHTML = `
		  <span>${actor}</span>
		  <button data-name="${actor}">&times;</button>
		`;

		div.querySelector("button").addEventListener("click", (e) => {
			removeActorUC(e.target.dataset.name);
		});

		actorsList.appendChild(div);
	});
}

function renderUseCases() {
	const ucList = document.getElementById("useCaseList");
	ucList.innerHTML = "";

	state.useCases.forEach(uc => {
		const div = document.createElement("div");
		div.className = "list-item";

		div.innerHTML = `
		  <span>${uc}</span>
		  <button data-name="${uc}">&times;</button>
		`;

		div.querySelector("button").addEventListener("click", (e) => {
			removeUseCase(e.target.dataset.name);
		});

		ucList.appendChild(div);
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
			${state.actorsUC.map(actor =>
			  `<option value="${actor}" ${actor === link.actor ? "selected" : ""}>${actor}</option>`
			).join("")}
		  </select>

		  <span style="flex: 0 0 auto; padding: 0 10px;">--></span>

		  <select class="usecase">
			${state.useCases.map(uc =>
			  `<option value="${uc}" ${uc === link.useCase ? "selected" : ""}>${uc}</option>`
			).join("")}
		  </select>

		  <button data-id="${link.id}">Delete</button>
		`;

		// Update state on change
		div.querySelector(".actor").addEventListener("change", (e) => {
			link.actor = e.target.value;
		});

		div.querySelector(".usecase").addEventListener("change", (e) => {
			link.useCase = e.target.value;
		});

		div.querySelector("button").addEventListener("click", (e) => {
			removeUCLink(e.target.dataset.id);
		});

		container.appendChild(div);
	});
}


// ===============================
// GENERATE PLANTUML STRING
// ===============================

function generatePlantUML() {
	let uml = "@startuml\n";

	if (state.diagramType === "sequence") {
		// Optional: declare actors explicitly
		state.actors.forEach(actor => {
			uml += `actor ${actor}\n`;
		});
	
		uml += "\n";
	
		state.messages.forEach(msg => {
			uml += `${msg.from} ${msg.arrow} ${msg.to}: ${msg.text}\n`;
		});
	
		uml += "@enduml";
	
		return uml;
	} else if (state.diagramType === "class") {
		state.classes.forEach(cls => {
			uml += `class ${cls.name} {\n`;
			cls.attributes.forEach(attr => {
				uml += `  ${attr}\n`;
			});
			cls.methods.forEach(method => {
				uml += `  ${method}()\n`;
			});
			uml += `}\n`;
		});

		uml += "@enduml";
		return uml;
	} else if (state.diagramType === "usecase") {
		state.actorsUC.forEach(actor => {
			uml += `actor ${actor}\n`;
		});
		uml += "\n";
		state.useCases.forEach(uc => {
			uml += `usecase ${uc}\n`;
		});
		state.useCaseLinks.forEach(link => {
			uml += `${link.actor} --> ${link.useCase}\n`;
		});

		uml += "@enduml";
		return uml;
	}
}


document.getElementById("generateBtn").addEventListener("click", async () => {

    const umlText = generatePlantUML();
    if (!umlText) return alert("Failed to generate UML text.");

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uml: umlText })
      });

      const svg = await response.text();

      document.getElementById("previewArea").innerHTML = svg;

    } catch (err) {
      console.error(err);
      alert("Failed to generate diagram:" + err.message);
    }
});
