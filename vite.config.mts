
import react from '@vitejs/plugin-react'
import { flowPlugin, esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow';
import { extname } from 'path';


export default {
  plugins: [
    react(),
  ]
}