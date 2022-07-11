import { useEffect } from "react";

interface Params {
	id: string;
	cb: Function;
}

export default function useDismiss(args: Params) {
	const { id, cb } = args;

	const handleClick = (ev) => !ev.target.closest("#" + id) && cb();

	const manageEvents = (action: "add" | "remove") => {
		document[`${action}EventListener`]("click", handleClick);
		document[`${action}EventListener`]("ontouchstart", handleClick);
		document[`${action}EventListener`]("scroll", () => cb());
	};

	useEffect(() => {
		manageEvents("add");

		return () => {
			manageEvents("remove");
		};
	}, []);
}
