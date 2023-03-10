import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = isNaN(parseInt(process.env.PORT ?? '3000')) ? 3000 : Number(process.env.PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: './build',
  },
  server: { host: HOST, port: PORT },
});
