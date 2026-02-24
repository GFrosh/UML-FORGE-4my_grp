import { qs } from "./utils.js";

const sequenceSection = qs("#sequenceSection");
const classSection = qs("#classSection");
const useCaseSection = qs("#useCaseSection");


export default function rotateNode(sect) {
    switch (sect) {
        case "sequence":
            sequenceSection.style.display = "flex";
            classSection.style.display = "none";
            useCaseSection.style.display = "none";
            break;
            
        case "class":
            classSection.style.display = "flex";
            sequenceSection.style.display = "none";
            useCaseSection.style.display = "none";
            break;
        
        case "usecase":
            useCaseSection.style.display = "flex";
            sequenceSection.style.display = "none";
            classSection.style.display = "none";
            break;
    }
}
