import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { NodePackageImporter } from 'sass-embedded';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				quietDeps: true,
				silenceDeprecations: ["global-builtin", "color-functions", "import"],
				importers: [new NodePackageImporter()]
			}
		}
	}
});
