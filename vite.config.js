import { defineConfig, loadEnv  } from "vite";
import react from "@vitejs/plugin-react";
// import obfuscator from 'vite-plugin-javascript-obfuscator'
// import fs from 'fs';
// import path from 'path';

// https://vite.dev/config/

// vite.config.js

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const BASE_URL_FE = env.VITE_FE_BASE || '/';
  return {
    base: BASE_URL_FE, // <-- chỉ dùng base khi build
    build: {
        outDir: '../backend/public/'+BASE_URL_FE, // Thư mục output
        emptyOutDir: true, // Xóa sạch trước khi build
    },
    plugins: [
      react(),
      // obfuscator({
      //   compact: true,
      //   controlFlowFlattening: true,
      //   controlFlowFlatteningThreshold: 1,
      //   stringArray: true,
      //   stringArrayEncoding: ['rc4'],
      //   stringArrayThreshold: 1, // ép mọi string vào array mã hóa
      //   splitStrings: true,
      //   splitStringsChunkLength: 4,
      //   selfDefending: true,
      //   transformObjectKeys: true,
      // })
    ],
    server: {
        host: [
            //  "0.0.0.0", // Lắng nghe trên tất cả các giao diện mạng
            "localhost",
            // "192.168.11.75"
        ],
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, 'mkcert/localhost-key.pem')),
        //     cert: fs.readFileSync(path.resolve(__dirname, 'mkcert/localhost.pem')),
        // },
        port: 5177, // Cổng tùy chọn (mặc định là 3000)
        // allowedHosts:["hcodesupport.zapto.org"],
        // hmr: {
        //     overlay:true
        // }
    },
  };
});
