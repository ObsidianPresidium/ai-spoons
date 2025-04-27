import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				quietDeps: true,
				silenceDeprecations: ["global-builtin", "color-functions", "import"]
			}
		}
	},
	server: {
		cors: {
			origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/, "https://localhost:8000", "http://localhost:8000", "https://127.0.0.1:8000", "http://127.0.0.1:8000"]
		}
	}
});
