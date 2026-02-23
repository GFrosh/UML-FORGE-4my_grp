// ===============================
// GLOBAL APPLICATION STATE
// ===============================

const state = {
  diagramType: "sequence",
  actors: [],
  messages: [],
  classes: [],
  useCases: [],
  useCaseLinks: []
};



// ===============================
// UTILITY: GENERATE UNIQUE ID
// ===============================
function generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}



// ===============================
// STATE MUTATION FUNCTIONS
// ===============================
function addActor(name) {
  if (!name) return;

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
// EVENT LISTENERS (Basic Wiring)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("diagramType")
    .addEventListener("change", (e) => {
      state.diagramType = e.target.value;
      console.log("Diagram type changed:", state.diagramType);
    });

  document.getElementById("addActorBtn")
    .addEventListener("click", () => {
      const input = document.getElementById("actorInput");
      addActor(input.value.trim());
      input.value = "";
    });

  document.getElementById("addMessageBtn")
    .addEventListener("click", addMessage);
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
// GENERATE PLANTUML STRING
// ===============================

function generatePlantUML() {
  if (state.diagramType !== "sequence") {
    alert("Only sequence diagram supported for now.");
    return "";
  }

  let uml = "@startuml\n";

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
}


document.getElementById("generateBtn")
  .addEventListener("click", async () => {

    const umlText = generatePlantUML();
    if (!umlText) return;

    try {
      const response = await fetch("http://10.100.171.107:3000/generate", {
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
      alert("Failed to generate diagram:", err);
    }
});
