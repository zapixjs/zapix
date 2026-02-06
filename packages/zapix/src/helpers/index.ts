/**
 * Safely parses a JSON string into the specified type.
 * Returns `undefined` if parsing fails or input is empty.
 *
 * @template T - The expected type of the parsed object
 * @param jsonString - The string to parse
 * @returns Parsed object of type T, or undefined if invalid
 */
export function tryParseJson<T = unknown>(jsonString?: string): T | undefined {
	if (!jsonString) return undefined;

	try {
		return JSON.parse(jsonString) as T;
	} catch {
		return undefined;
	}
}
