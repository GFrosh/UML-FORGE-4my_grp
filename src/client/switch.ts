import { qs } from "./utils.js";

const sequenceSection = qs("#sequenceSection") as HTMLElement | null;
const classSection = qs("#classSection") as HTMLElement | null;
const useCaseSection = qs("#useCaseSection") as HTMLElement | null;
const erdSection = qs("#erdSection") as HTMLElement | null;
const activitySection = qs("#activitySection") as HTMLElement | null;
const componentSection = qs("#componentSection") as HTMLElement | null;
const statemachineSection = qs("#statemachineSection") as HTMLElement | null;

export default function rotateNode(sect: string): void {

    const sections = [
        sequenceSection,
        classSection,
        useCaseSection,
        erdSection,
        activitySection,
        componentSection,
        statemachineSection
    ];

    // Hide all sections
    sections.forEach(section => {
        if (section) {
            section.style.display = "none";
        }
    });

    // Show selected section
    switch (sect) {
        case "sequence":
            sequenceSection?.style.setProperty("display", "flex");
            break;

        case "class":
            classSection?.style.setProperty("display", "flex");
            break;

        case "usecase":
            useCaseSection?.style.setProperty("display", "flex");
            break;

        case "erd":
            erdSection?.style.setProperty("display", "flex");
            break;

        case "activity":
            activitySection?.style.setProperty("display", "flex");
            break;

        case "component":
            componentSection?.style.setProperty("display", "flex");
            break;

        case "statemachine":
            statemachineSection?.style.setProperty("display", "flex");
            break;
    }
}