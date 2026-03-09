import { generateId } from "../utils.js";

export const addActorUC = (state, name, cb) => {
    if (!name) return alert("Actor name cannot be empty.");
	if (state.actorsUC.includes(name)) return alert("Actor already exists.");
	state.actorsUC.push(name);
	cb();
}

export const removeActorUC = (state, name, cbOne, cbTwo) => {
    state.actorsUC = state.actorsUC.filter(actor => actor !== name);
	state.useCaseLinks = state.useCaseLinks.filter(link => link.actor !== name);
	cbOne();
	cbTwo();
}

export const addUseCase = (state, name, cb) => {
    if (!name) return alert("Use case name cannot be empty.");
	if (state.useCases.includes(name)) return alert("Use case already exists.");
	state.useCases.push(name);
	cb();
}

export const removeUseCase = (state, name, cbOne, cbTwo) => {
    state.useCases = state.useCases.filter(uc => uc !== name);
	state.useCaseLinks = state.useCaseLinks.filter(link => link.useCase !== name);
	cbOne();
	cbTwo();
}


export const addUCLink = (state, cb) => {
    if (state.actorsUC.length === 0) return alert("You need at least 1 actor.");
    if (state.useCases.length === 0) return alert("You need at least 1 use case.");
    state.useCaseLinks.push({
        id: generateId(),
        actor: state.actorsUC[0],
        useCase: state.useCases[0]
    });
    cb();
}

export const removeUCLink = (state, id, cb) => {
    state.useCaseLinks = state.useCaseLinks.filter(link => link.id !== id);
	cb();
}