import { generateId } from "../utils.js";

export const addState = (state, name, cb) => {
    if (!name) return alert("State name cannot be empty.");
	if (state.states.some(s => s === name)) return alert("State already exists.");
	state.states.push(name);
	cb();
}

export const removeState = (state, name, cbOne, cbTwo) => {
    state.states = state.states.filter(s => s !== name);
	state.stateTransitions = state.stateTransitions.filter(t => t.from !== name && t.to !== name);
	cbOne();
	cbTwo();
}

export const addStateTransition = (state, cb) => {
    if (state.states.length < 2) return alert("You need at least 2 states.");
    state.stateTransitions.push({
        id: generateId(),
        from: state.states[0],
        to: state.states[1],
        event: ""
    });
    cb();
}

export const removeStateTransition = (state, id, cb) => {
    state.stateTransitions = state.stateTransitions.filter(t => t.id !== id);
    cb();
}