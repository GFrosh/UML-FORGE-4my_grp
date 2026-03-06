import { generateId } from "../utils.js";

export const addActor = (state, actor, callback) => {
	if (!actor) return alert('Actor name cannot be empty');
	if (state.actors.includes(actor)) {
		return alert('Actor already exists');
	}
    state.actors.push(actor);
    callback();
};

export const removeActor = (state, name, cbOne, cbTwo) => {
	if (!name) return alert('Actor name cannot be empty');
	
  	state.actors = state.actors.filter(actor => actor !== name);
	state.messages = state.messages.filter(msg => msg.from !== name && msg.to !== name);
	cbOne();
	cbTwo();
};

export const addMessage = (state, callback) => {
	if (state.actors.length < 2) return alert("You need at least 2 actors.");
	const newMessage = {
		id: generateId(),
		from: state.actors[0],
		to: state.actors[1],
		arrow: "->",
		text: ""
	};
	state.messages.push(newMessage);
	callback();
};

export const removeMessage = (state, id, callback) => {
	state.messages = state.messages.filter(msg => msg.id !== id);
	callback();
};
