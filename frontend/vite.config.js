import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: {
      // Make sure to stringify the environment variables
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
      },
    },
  });
};
