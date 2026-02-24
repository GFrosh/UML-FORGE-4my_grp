import { qs } from "./utils.js";

const sequenceSection = qs("#sequenceSection");
const classSection = qs("#classSection");
const useCaseSection = qs("#useCaseSection");
const erdSection = qs("#erdSection");
const activitySection = qs("#activitySection");
const componentSection = qs("#componentSection");
const statemachineSection = qs("#statemachineSection");

export default function rotateNode(sect) {
    // Hide all sections
    sequenceSection.style.display = "none";
    classSection.style.display = "none";
    useCaseSection.style.display = "none";
    erdSection.style.display = "none";
    activitySection.style.display = "none";
    componentSection.style.display = "none";
    statemachineSection.style.display = "none";
    
    // Show selected section
    switch (sect) {
        case "sequence":
            sequenceSection.style.display = "flex";
            break;
        case "class":
            classSection.style.display = "flex";
            break;
        case "usecase":
            useCaseSection.style.display = "flex";
            break;
        case "erd":
            erdSection.style.display = "flex";
            break;
        case "activity":
            activitySection.style.display = "flex";
            break;
        case "component":
            componentSection.style.display = "flex";
            break;
        case "statemachine":
            statemachineSection.style.display = "flex";
            break;
    }
}
