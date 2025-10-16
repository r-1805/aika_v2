import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const react = (await import('@vitejs/plugin-react')).default

  return {
    base: '/aika/',
    plugins: [react()],
    preview: {
      // ��������� ���� Render, ������� ������ � ������
      allowedHosts: ['aika-v21.onrender.com']
    }
  }
})