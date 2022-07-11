import { useEffect } from "react";

interface Params {
	id: string;
	cb: () => unknown;
}

export default function useDismiss(args: Params): void {
	const { id, cb } = args;

	const handleClick = (e) => !e.target.closest("#" + id) && cb();

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("ontouchstart", handleClick);
		document.addEventListener("scroll", cb);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("ontouchstart", handleClick);
			document.removeEventListener("scroll", cb);
		};
	}, []);
}
