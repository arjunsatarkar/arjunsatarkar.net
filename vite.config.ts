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
		{
			name: "canonicals",
			transform(code, id) {
				const PAGE_SVELTE = "+page.svelte";
				if (!id.endsWith("/" + PAGE_SVELTE)) return null;
				let canonical = SITE_HOME + path.relative(path.resolve(__dirname, "src/routes"), id.slice(0, id.length - PAGE_SVELTE.length));
				if (!canonical.endsWith("/")) canonical += "/";
				return code.replace("__CANONICAL_URL__", `'${canonical}'`);
			}
		}
	],
	define: {
		__SITE_HOME__: JSON.stringify(SITE_HOME)
	}
});
