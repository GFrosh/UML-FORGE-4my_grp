const generatePlantUML = (state) => {
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


	switch (state.diagramType) {
		case "sequence":
			state.actors.forEach(actor => uml += `actor ${actor}\n`);
			uml += "\n";
			state.messages.forEach(msg => uml += `${msg.from} ${msg.arrow} ${msg.to}: ${msg.text}\n`);
			break;
		case "class":
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
			break;
		case "usecase":
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
			break;
		case "erd":
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
			break;
		case "activity":
			state.activities.forEach(activity => uml += `action "${activity}"\n`);
			uml += "\n";
			state.activityFlows.forEach(flow => uml += `"${flow.from}" --> "${flow.to}"\n`);
			break;
		case "component":
			state.components.forEach(comp => uml += `component [${comp}]\n`);
			uml += "\n";
			state.componentDeps.forEach(dep => uml += `[${dep.from}] --> [${dep.to}]\n`);
			break;
		case "statemachine":
			state.states.forEach(st => uml += `state "${st}"\n`);
			uml += "\n";
			state.stateTransitions.forEach(trans => {
				const event = trans.event ? ` : ${trans.event}` : "";
				uml += `"${trans.from}" --> "${trans.to}"${event}\n`;
			});
			break;
		default:
			break;
	}

	uml += "@enduml";
	return uml;
}

export default generatePlantUML;
