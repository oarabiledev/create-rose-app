import { html } from "roseview";

const outlinedButton = function (parent, text) {
	let btn = html.Button(parent, text);
	btn.style({
		border: "2px solid #6200ea",
		color: "#6200ea",
		backgroundColor: "transparent",
		fontFamily: "'Archivo', sans-serif",
		fontWeight: 500,
		fontSize: "1rem",
		textAlign: "center",
		cursor: "pointer",
		padding: "0.5rem 1rem",
		fontFamily: "'Playfair Display', serif",
		fontWeight: 700,
		transition: "background-color 0.3s, color 0.3s",

		"&:hover": {
			backgroundColor: "#6200ea",
			color: "white"
		},
		"&:active": {
			backgroundColor: "#3700b3",
			borderColor: "#3700b3"
		},
		"@media (max-width: 600px)": {
			fontSize: "0.8rem",
			padding: "0.4rem 0.8rem"
		},
		" > span": {
			/* Demo Of Element Selector */
			color: "red"
		}
	});
	return btn;
};

export default outlinedButton;
