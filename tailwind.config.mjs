/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'!./src/pages/index.astro',
		'!./src/components/Header.astro',
		'!./src/components/Footer.astro',
	],
	theme: {
		extend: {
			fontFamily: {
				custom: ['"Text Me One"', 'sans-serif'],
				schoolbell: ['Schoolbell', 'cursive'],
				abel: ['Abel', 'sans-serif'],
				baloo: ['"Baloo Thambi"', 'cursive'],
			  },
		},
	},
	corePlugins: {
		container: false,
		navbar: false,
	},
	plugins: [],
}
