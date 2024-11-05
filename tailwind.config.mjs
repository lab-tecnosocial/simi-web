/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'!./src/pages/index.astro',
		'!./src/components/Header.astro',
		'!./src/components/Footer.astro',
	],
	theme: {
		extend: {},
	},
	corePlugins: {
		container: false,
		navbar: false,
	},
	plugins: [],
}
