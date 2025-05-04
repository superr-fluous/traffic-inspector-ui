/**
 * @param color - color in HEX form
 */
const isColorLight = (color: string) => {
	const hex = color.replace("#", "");

	// Convert to RGB
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	// Calculate brightness
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	return brightness > 128; // true = light, false = dark
};

export default { isColorLight }
