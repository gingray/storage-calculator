import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: fileURLToPath(new URL('index.html', import.meta.url)),
                check: fileURLToPath(new URL('check-list.html', import.meta.url)),
            },
        }
    },
})