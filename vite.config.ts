import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";

const SOURCE_REPO = "https://github.com/arjunsatarkar/arjunsatarkar.net"

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools(),
		{
			name: 'file_source',
			transform(code, id) {
				return code.replace('__FILE_SOURCE__', `'${SOURCE_REPO}/tree/main/${path.relative(__dirname, id)}'`);
			}
		}],
});
