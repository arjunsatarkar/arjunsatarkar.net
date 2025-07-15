import { createViteLicensePlugin } from 'rollup-license-plugin';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";

const SITE_HOME = "https://arjunsatarkar.net/";
const SOURCE_REPO = "https://github.com/arjunsatarkar/arjunsatarkar.net";

export default defineConfig({
	plugins: [
		sveltekit(),
		createViteLicensePlugin(),
		imagetools(),
		{
			name: 'fileSource',
			transform(code, id) {
				return code.replace('__FILE_SOURCE__', `'${SOURCE_REPO}/tree/main/${path.relative(__dirname, id)}'`);
			}
		},
	],
	define: {
		__SITE_HOME__: JSON.stringify(SITE_HOME),
	}
});
