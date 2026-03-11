import { generateId } from "../utils.js";

export const addActivity = (state, name, cb) => {
    if (!name) return alert("Activity name cannot be empty.");
	if (state.activities.some(a => a === name)) return alert("Activity already exists.");
	state.activities.push(name);
	cb();
}

export const removeActivity = (state, name, cbOne, cbTwo) => {
    state.activities = state.activities.filter(a => a !== name);
	state.activityFlows = state.activityFlows.filter(f => f.from !== name && f.to !== name);
	cbOne();
	cbTwo();
}

export const addActivityFlow = (state, cb) => {
    if (state.activities.length < 2) return alert("You need at least 2 activities.");
    state.activityFlows.push({
        id: generateId(),
        from: state.activities[0],
        to: state.activities[1]
    });
    cb();
}

export const removeActivityFlow = (state, id, cb) => {
    state.activityFlows = state.activityFlows.filter(f => f.id !== id);
    cb();
}
