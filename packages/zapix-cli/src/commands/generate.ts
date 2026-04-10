export async function generateHandler(type: string, name?: string, options?: { module?: string }) {
	switch (type) {
		case "module":
		case "m":
			console.log("Generating module:", name);
			break;
		case "controller":
		case "c":
			if (!options?.module) {
				console.log("Error: --module is required for controllers");
				return;
			}
			console.log(`Generating controller: ${name} in module ${options.module}`);
			break;
		case "middleware":
		case "mid":
			console.log(`Generating middleware: ${name}`, options?.module ? `in module ${options.module}` : "");
			break;
		default:
			console.log("Unknown type", type);
	}

	console.log("Done! ✅");
}
