import type { Result } from "./types/index.js";

export class ZapixResponseCore {
	private statusCode = 200;
	private headers: Record<string, string> = {};
	private contentType?: string;

	protected finalize(body: unknown): Result {
		return {
			status: this.statusCode,
			body,
			headers: {
				...(this.contentType ? { "Content-Type": this.contentType } : {}),
				...this.headers,
			},
		};
	}

	status(code: number): this {
		this.statusCode = code;
		return this;
	}

	set(key: string, value: string): this;
	set(headers: Record<string, string>): this;
	set(keyOrHeaders: string | Record<string, string>, value?: string): this {
		if (typeof keyOrHeaders === "string") {
			this.headers[keyOrHeaders] = value || "";
		} else {
			Object.assign(this.headers, keyOrHeaders);
		}
		return this;
	}

	type(value: string): this {
		this.contentType = value.includes("/") ? value : `text/${value}`;
		return this;
	}

	json(body: unknown): Result {
		this.contentType = "application/json";
		return this.finalize(body);
	}

	text(body: string): Result {
		this.contentType = "text/plain";
		return this.finalize(body);
	}

	send(body?: unknown): Result {
		if (body == null) {
			this.statusCode ||= 204;
			return this.finalize(null);
		}

		if (typeof body === "string") {
			this.contentType ??= "text/plain";
			return this.finalize(body);
		}

		this.contentType ??= "application/json";
		return this.finalize(body);
	}

	empty(): Result {
		this.statusCode = 204;
		return this.finalize(null);
	}

	redirect(url: string, status = 302): Result {
		this.statusCode = status;
		this.headers.location = url;
		return this.finalize(null);
	}

	throw(message: string, code?: string, details?: unknown): Result {
		this.contentType = "application/json";

		return this.finalize({
			success: false,
			message,
			code,
			details,
		});
	}
}
