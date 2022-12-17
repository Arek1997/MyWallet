export let theme = localStorage.getItem('theme') || 'dark';
const root = document.documentElement as HTMLHtmlElement;

export const lightTheme = function () {
	theme = 'light';
	localStorage.setItem('theme', theme);
	root.style.setProperty('--first-color', '#F9F9F9');
	root.style.setProperty('--second-color', '#14161F');
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)');
};

export const darkTheme = function () {
	theme = 'dark';
	localStorage.setItem('theme', theme);
	root.style.setProperty('--first-color', '#14161F');
	root.style.setProperty('--second-color', '#F9F9F9');
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .2)');
};
