const downloadDiagram = (state) => {
    if (!state.lastGeneratedSvg) {
		return alert("No diagram generated yet. Please generate a diagram first.");
	}

	const { content, filename } = state.lastGeneratedSvg;
	const blob = new Blob([content], { type: "image/svg+xml" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

export default downloadDiagram;
