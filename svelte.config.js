import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			// GitHub Pages 프로젝트 페이지는 https://<사용자>.github.io/huijun-hyejeong-wd/ 처럼
			// 저장소 이름이 하위 경로로 붙으므로, 배포 빌드에서만 이 경로를 base로 설정한다.
			base: process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
