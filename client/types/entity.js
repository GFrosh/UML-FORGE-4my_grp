import { qs, generateId } from "../utils.js";

export const addEntity = (state, name, cb) => {
    if (!name) return alert("Entity name cannot be empty.");
    if (state.entities.some(e => e.name === name)) return alert("Entity already exists.");
    state.entities.push({
        id: generateId(),
        name,
        attributes: []  // {name, type, isPK, isFK, isNotNull}
    });
    cb();
}

export const removeEntity = (state, id, cb) => {
    state.entities = state.entities.filter(e => e.id !== id);
	state.erdRelationships = state.erdRelationships.filter(rel => rel.from !== id && rel.to !== id);
	cb();
	qs("#entityDetailsContainer").innerHTML = "<p>Select an entity to edit attributes.</p>";
}

export const addAttributeToEntity = (state, entityId, attrData, cb) => {
    const entity = state.entities.find(e => e.id === entityId);
	if (entity) {
		entity.attributes.push({
			name: attrData.name || "attribute",
			type: attrData.type || "VARCHAR",
			isPK: attrData.isPK || false,
			isFK: attrData.isFK || false,
			isNotNull: attrData.isNotNull || false
		});
		cb(entityId);
	}
}

export const removeAttributeFromEntity = (state, entityId, index, cb) => {
    const entity = state.entities.find(e => e.id === entityId);
	if (entity) {
		entity.attributes.splice(index, 1);
		cb(entityId);
	}
}

export const addErdRelationship = (state, fromId, toId, relationType, cb) => {
    if (!state.erdRelationships.some(rel => rel.from === fromId && rel.to === toId && rel.type === relationType)) {
        state.erdRelationships.push({
            id: generateId(),
            from: fromId,
            to: toId,
            type: relationType,
            label: ""
        });
        cb();
    }
}

export const removeErdRelationship = (state, id, cb) => {
    state.erdRelationships = state.erdRelationships.filter(rel => rel.id !== id);
	cb();
}
