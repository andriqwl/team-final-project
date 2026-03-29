import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    // ВАЖЛИВО: замініть 'назва-твого-репозиторію' на реальну назву з GitHub
    base: command === 'serve' ? '/' : '/Vite_vanilla-app-template/',

    define: {
      global: {},
    },
    root: 'src',
    build: {
      rollupOptions: {
        input: glob.sync('./src/*.html'),
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
