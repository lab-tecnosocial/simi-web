/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx}",
	"./node_modules/swiper/swiper-bundle.esm.js"
  ],
  theme: {
    extend: {
		fontFamily: {
			custom: ['"Text Me One"', 'sans-serif'],
			schoolbell: ['Schoolbell', 'cursive'],
			abel: ['Abel', 'sans-serif'],
			baloo: ['"Baloo Thambi"', 'cursive'],
			nunito: ['Nunito', 'sans-serif'],
			asap: ['Asap', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
		},
		colors: {
			qumir: '#59CB07',
			caramel: '#89E219',
			futuro: '#4B4B4B',
			riti: '#FFFFFF',
			azul_cool: '#1EAFF6',
			yawar: '#FF4B4B',
			mostaza: '#FFC803',
			pinki: '#CE82FF',
			titulo: '#59CB07',
			texto: '#2A2E25',
			texto2: '#BBBDB9',
			resaltar: '#07B7CB',
		},
		// otras configuraciones
	},
  },
  plugins: [],
}

