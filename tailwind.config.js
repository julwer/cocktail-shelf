/** @type {import('tailwindcss').Config} */
export const content = [
	'./components/**/*.{tsx}',
	'./pages/**/*.{tsx}',
	'./UI/**/*.{tsx}',
	'./src/**/*.{html,js,tsx}',
	'./index.html',
];
export const theme = {
	colors: {
		primary: '#1ccc7c',
		secondary: '#f56465',
		'main-txt': '#2c3c5c',
		'second-txt': '#9ca4c3',
		outline: '#d0dae8',
		form: '#e3e7ee',
		white: '#ffffff',
		red: '#ef4444',
	},
};
export const plugins = [];
module.exports = { content: content, theme: theme, plugins: plugins };
