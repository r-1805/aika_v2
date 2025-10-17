import { defineConfig } from 'vite'

export default defineConfig(async () => {
    const react = (await import('@vitejs/plugin-react')).default

    return {
        base: '/aika/',
        plugins: [react()],
        css: {
            postcss: './postcss.config.js' // Tailwind будет обрабатыватьс€ через Vite
        },
        preview: {
            // –азрешаем хост Render
            allowedHosts: ['aika-v21.onrender.com']
        }
    }
})
