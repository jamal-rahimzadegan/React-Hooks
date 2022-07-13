import React, { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number): string {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
			const handler = setTimeout(() => setDebouncedValue(value), delay);
			return () => clearTimeout(handler);
		},[value]
	);

	return debouncedValue;
}
