import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

const keyPath = path.resolve(__dirname, 'ssl/key.pem');
const certPath = path.resolve(__dirname, 'ssl/cert.pem');
const hasSsl = fs.existsSync(keyPath) && fs.existsSync(certPath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: hasSsl ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    } : false
  }
})
