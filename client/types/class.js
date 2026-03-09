import { qs, generateId } from "../utils.js";

export const addClass = (state, name, cb) => {
    if (!name) return alert("Class Name cannot be empty!");
    if (state.classes.some(cls => cls.name === name)) return alert("Class already exists.");

    state.classes.push({
        id: generateId(),
        name,
		isAbstract: false,
		attributes: [],
		methods: []
    });
    cb();
}


export const removeClass = (state, id, cb) => {
	state.classes = state.classes.filter(cls => cls.id !== id);
	state.classRelationships = state.classRelationships.filter(rel => rel.from !== id && rel.to !== id);
	cb();
	qs("#classDetailsContainer").innerHTML = "<p>Select a class to edit its attributes and methods.</p>";
}


export const addAttributeToClass = (state, classId, attrData, cb) => {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.attributes.push({
			name: attrData.name || "attr",
			visibility: attrData.visibility || "+",
			type: attrData.type || "String",
			isStatic: attrData.isStatic || false
		});
		cb(classId);
	}
}


export const removeAttributeFromClass = (state, classId, index, cb) => {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.attributes.splice(index, 1);
		cb(classId);
	}
}


export const addMethodToClass = (state, classId, methodData, cb) => {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.methods.push({
			name: methodData.name || "method",
			visibility: methodData.visibility || "+",
			returnType: methodData.returnType || "void",
			parameters: methodData.parameters || "",  // "param1: Type1, param2: Type2"
			isStatic: methodData.isStatic || false,
			isAbstract: methodData.isAbstract || false
		});
		cb(classId);
	}
}

export const removeMethodFromClass = (state, classId, index, cb) => {
	const cls = state.classes.find(c => c.id === classId);
	if (cls) {
		cls.methods.splice(index, 1);
		cb(classId);
	}
}


export const addClassRelationship = (state, fromClassId, toClassId, relationType, cb) => {
	if (!state.classRelationships.some(rel => rel.from === fromClassId && rel.to === toClassId && rel.type === relationType)) {
		state.classRelationships.push({
			id: generateId(),
			from: fromClassId,
			to: toClassId,
			type: relationType,
			label: ""
		});
		cb();
	}
}

export const removeClassRelationship = (state, id, cb) => {
	state.classRelationships = state.classRelationships.filter(rel => rel.id !== id);
	cb();
}

// FIND OUT THE USE OF THE "SOME" METHOD IN JS
// \\    \\ ABOUT THE STOPPROPAGATION METHOD 