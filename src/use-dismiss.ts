import { useEffect } from "react";

interface Params {
	id: string;
	cb: Function;
}

type EventAction = "addEventListener" | "removeEventListener";

export default function useDismiss(args: Params) {
	const { id, cb } = args;

	const handleClickOutside = (ev) => !ev.target.closest("#" + id) && cb();

	const handleKeyPress = (ev) => ev.key === "Escape" && cb();

	const manageEvents = (action: EventAction) => {
		document[action]("scroll", () => cb());
		document[action]("keydown", handleKeyPress);
		document[action]("click", handleClickOutside);
		document[action]("ontouchstart", handleClickOutside);
	};

	useEffect(() => {
		manageEvents("addEventListener");

		return () => {
			manageEvents("removeEventListener");
		};
	}, []);
}
