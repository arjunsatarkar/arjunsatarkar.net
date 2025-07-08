import { canonicals } from "@arjunsatarkar/sveltekit-canonicals"
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";

const SITE_HOME = "https://arjunsatarkar.net/";
const SOURCE_REPO = "https://github.com/arjunsatarkar/arjunsatarkar.net";

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools(),
		{
			name: 'fileSource',
			transform(code, id) {
				return code.replace('__FILE_SOURCE__', `'${SOURCE_REPO}/tree/main/${path.relative(__dirname, id)}'`);
			}
		},
		canonicals({
			replace: "__CANONICAL_URL__",
			routesDir: path.resolve(__dirname, "src/routes"),
			siteUrlRoot: SITE_HOME,
			trailingSlash: "always"
		}),
	],
	define: {
		__SITE_HOME__: JSON.stringify(SITE_HOME)
	}
});
