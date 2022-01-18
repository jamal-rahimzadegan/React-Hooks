import { useEffect } from "react";

interface Payload {
	emitter?: "window" | "document" | HTMLElement;
	cb: Function;
	event: string;
	dependencies?: unknown[];
}

export default function useListenEvent(payload: Payload) {
	const { cb, event, emitter = "window", dependencies = [] } = payload;

	const createEmitter = (): any => {
		if (!!emitter) {
			if (emitter instanceof HTMLElement) return emitter;
			else return emitter === "window" ? window : document;
		} else return {};
	};

	useEffect(() => {
		const eventEmitter = createEmitter();

		eventEmitter?.addEventListener?.(event, cb);
		return () => eventEmitter?.removeEventListener?.(event, cb);
	}, [emitter, event, ...dependencies]);
}
