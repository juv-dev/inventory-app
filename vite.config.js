import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "", "");
  return {
    server: { port: 1805 },
    plugins: [
      vue({
        template: {
          compilerOptions: { isCustomElement: (tag) => tag === "swiper-container" || tag === "swiper-slide" },
        },
      }),
      tailwindcss(),
    ],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    base: env.VITE_BASE_PATH ?? "./",
    build: {
      emptyOutDir: true,
      manifest: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: "[name]-[hash].js",
          chunkFileNames: "[name].[hash].js",
          compact: true,
          manualChunks: {
            vendor: [
              "vue",
              "vue-router",
              "vue-final-modal",
              "pinia",
              "pristinejs",
            ],
          },
          assetFileNames: ({ name }) => {
            // images
            if (/\.(gif|jpe?g|png|webp|svg)$/.test(name ?? "")) {
              return "images/[name]-[hash].[ext]";
            }

            //json
            if (/\.json$/.test(name ?? "")) {
              return "json/[name]-[hash].[ext]";
            }

            //css
            if (/\.css$/.test(name ?? "")) {
              return "css/[name]-[hash].[ext]";
            }

            //fonts
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(name ?? "")) {
              return "fonts/[name]-[hash].[ext]";
            }

            return "[name]-[hash].[ext]";
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "@vueuse/motion",
        "@vueuse/core",
        "swiper",
        "vue-final-modal",
        "pinia",
        "pristinejs",
      ],
    },
  };
});
