import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function markdownBlog() {
  return {
    name: 'markdown-blog',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;

      const match = code.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!match) return `export default ${JSON.stringify({ data: {}, content: code })}`;

      const yamlStr = match[1];
      const content = match[2].trim();
      const data = {};

      yamlStr.split('\n').forEach((line) => {
        const colon = line.indexOf(':');
        if (colon === -1) return;
        const key = line.slice(0, colon).trim();
        let val = line.slice(colon + 1).trim();
        if (!key) return;
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (val === 'true') data[key] = true;
        else if (val === 'false') data[key] = false;
        else data[key] = val;
      });

      return `export default ${JSON.stringify({ data, content })}`;
    },
  };
}

export default defineConfig({
  plugins: [react(), markdownBlog()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
