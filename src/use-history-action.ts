import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function useHistoryAction() {
	const [pathList, setPathList] = useState([]);
	const [action, setAction] = useState<"forward" | "backward">("forward");
	const [currentRoute, setCurrentRoute] = useState<string>("/");
	const history = useHistory();

	useEffect(() => {
		return history.listen((location) => {
			if (history.action === "PUSH") {
				setPathList([location.pathname]);
				setAction("forward");
			}

			if (history.action === "POP") {
				if (pathList[1] === location.pathname) {
					setPathList(([_, ...keys]) => keys);
					setAction("forward");
				} else {
					setPathList((keys) => [location.pathname, ...keys]);
					setAction("backward");
				}
			}

			setCurrentRoute(location.pathname);
		});
	}, [pathList]);

	return { action, currentRoute };
}
