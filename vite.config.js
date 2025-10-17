import { defineConfig } from 'vite'

export default defineConfig(async () => {
    const react = (await import('@vitejs/plugin-react')).default

    return {
        base: '/aika/',
        plugins: [react()],
        css: {
            postcss: './postcss.config.js' // Tailwind ����� �������������� ����� Vite
        },
        preview: {
            // ��������� ���� Render
            allowedHosts: ['aika-v21.onrender.com']
        }
    }
})
