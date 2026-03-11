import { generateId } from "../utils.js";

export const addComponent = (state, name, render) => {
    if (!name) return alert("Component name cannot be empty.");
	if (state.components.some(c => c === name)) return alert("Component already exists.");
	state.components.push(name);
	render();
}

export const removeComponent = (state, name, cbOne, cbTwo) => {
    state.components = state.components.filter(c => c !== name);
    state.componentFlows = state.componentFlows.filter(f => f.from !== name && f.to !== name);
    cbOne();
    cbTwo();
}

export const addComponentDep = (state, render) => {
    if (state.components.length < 2) return alert("You need at least 2 components.");
    state.componentDeps.push({
        id: generateId(),
        from: state.components[0],
        to: state.components[1]
    });
    render();
}

export const removeComponentDep = (state, id, render) => {
    state.componentDeps = state.componentDeps.filter(d => d.id !== id);
    render();
}
