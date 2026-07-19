import adapter from '@sveltejs/adapter-netlify';

/**
 * @param {{ filename: string }} options
 * @returns {boolean | undefined}
 */
function runesMode({ filename }) {
	return filename.split(/[/\\]/).includes('node_modules') ? undefined : true;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: runesMode
	},
	kit: {
		adapter: adapter()
	}
};

export default config;