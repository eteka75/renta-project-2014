// vite.config.js
import { defineConfig } from "file:///C:/Users/eteka/Downloads/VEHICULE%20A%20LOUER/new_webapp/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/Users/eteka/Downloads/VEHICULE%20A%20LOUER/new_webapp/node_modules/laravel-vite-plugin/dist/index.mjs";
import { ViteImageOptimizer } from "file:///C:/Users/eteka/Downloads/VEHICULE%20A%20LOUER/new_webapp/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import react from "file:///C:/Users/eteka/Downloads/VEHICULE%20A%20LOUER/new_webapp/node_modules/@vitejs/plugin-react/dist/index.mjs";
var DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: void 0,
  include: void 0,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false
            // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false
          },
          convertPathData: false
        }
      },
      "sortAttrs",
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
        }
      }
    ]
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 100
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true
  },
  cache: false,
  cacheLocation: void 0
};
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true
    }),
    react(),
    ViteImageOptimizer(DEFAULT_OPTIONS)
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxldGVrYVxcXFxEb3dubG9hZHNcXFxcVkVISUNVTEUgQSBMT1VFUlxcXFxuZXdfd2ViYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxldGVrYVxcXFxEb3dubG9hZHNcXFxcVkVISUNVTEUgQSBMT1VFUlxcXFxuZXdfd2ViYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ldGVrYS9Eb3dubG9hZHMvVkVISUNVTEUlMjBBJTIwTE9VRVIvbmV3X3dlYmFwcC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGxhcmF2ZWwgZnJvbSAnbGFyYXZlbC12aXRlLXBsdWdpbic7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB0ZXN0OiAvXFwuKGpwZT9nfHBuZ3xnaWZ8dGlmZnx3ZWJwfHN2Z3xhdmlmKSQvaSxcbiAgICBleGNsdWRlOiB1bmRlZmluZWQsXG4gICAgaW5jbHVkZTogdW5kZWZpbmVkLFxuICAgIGluY2x1ZGVQdWJsaWM6IHRydWUsXG4gICAgbG9nU3RhdHM6IHRydWUsXG4gICAgYW5zaUNvbG9yczogdHJ1ZSxcbiAgICBzdmc6IHtcbiAgICAgIG11bHRpcGFzczogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdwcmVzZXQtZGVmYXVsdCcsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBvdmVycmlkZXM6IHtcbiAgICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICByZW1vdmVWaWV3Qm94OiBmYWxzZSwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N2Zy9zdmdvL2lzc3Vlcy8xMTI4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYW51cElEczoge1xuICAgICAgICAgICAgICBtaW5pZnk6IGZhbHNlLFxuICAgICAgICAgICAgICByZW1vdmU6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ3NvcnRBdHRycycsXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnYWRkQXR0cmlidXRlc1RvU1ZHRWxlbWVudCcsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbeyB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHBuZzoge1xuICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I3BuZ1xuICAgICAgcXVhbGl0eTogMTAwLFxuICAgIH0sXG4gICAganBlZzoge1xuICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I2pwZWdcbiAgICAgIHF1YWxpdHk6IDEwMCxcbiAgICB9LFxuICAgIGpwZzoge1xuICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I2pwZWdcbiAgICAgIHF1YWxpdHk6IDEwMCxcbiAgICB9LFxuICAgIHRpZmY6IHtcbiAgICAgIC8vIGh0dHBzOi8vc2hhcnAucGl4ZWxwbHVtYmluZy5jb20vYXBpLW91dHB1dCN0aWZmXG4gICAgICBxdWFsaXR5OiAxMDAsXG4gICAgfSxcbiAgICAvLyBnaWYgZG9lcyBub3Qgc3VwcG9ydCBsb3NzbGVzcyBjb21wcmVzc2lvblxuICAgIC8vIGh0dHBzOi8vc2hhcnAucGl4ZWxwbHVtYmluZy5jb20vYXBpLW91dHB1dCNnaWZcbiAgICBnaWY6IHt9LFxuICAgIHdlYnA6IHtcbiAgICAgIC8vIGh0dHBzOi8vc2hhcnAucGl4ZWxwbHVtYmluZy5jb20vYXBpLW91dHB1dCN3ZWJwXG4gICAgICBsb3NzbGVzczogdHJ1ZSxcbiAgICB9LFxuICAgIGF2aWY6IHtcbiAgICAgIC8vIGh0dHBzOi8vc2hhcnAucGl4ZWxwbHVtYmluZy5jb20vYXBpLW91dHB1dCNhdmlmXG4gICAgICBsb3NzbGVzczogdHJ1ZSxcbiAgICB9LFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjYWNoZUxvY2F0aW9uOiB1bmRlZmluZWQsXG4gIH07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbGFyYXZlbCh7XG4gICAgICAgICAgICBpbnB1dDogJ3Jlc291cmNlcy9qcy9hcHAuanN4JyxcbiAgICAgICAgICAgIHJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFjdCgpLFxuICAgICAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoREVGQVVMVF9PUFRJT05TKSxcbiAgICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThWLFNBQVMsb0JBQW9CO0FBQzNYLE9BQU8sYUFBYTtBQUNwQixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLFdBQVc7QUFDbEIsSUFBTSxrQkFBa0I7QUFBQSxFQUNwQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixVQUFVO0FBQUEsRUFDVixZQUFZO0FBQUEsRUFDWixLQUFLO0FBQUEsSUFDSCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFVBQ04sV0FBVztBQUFBLFlBQ1Qsc0JBQXNCO0FBQUEsWUFDdEIsZUFBZTtBQUFBO0FBQUEsVUFDakI7QUFBQSxVQUNBLFlBQVk7QUFBQSxZQUNWLFFBQVE7QUFBQSxZQUNSLFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFDQSxpQkFBaUI7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFVBQ04sWUFBWSxDQUFDLEVBQUUsT0FBTyw2QkFBNkIsQ0FBQztBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUE7QUFBQSxJQUVILFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxNQUFNO0FBQUE7QUFBQSxJQUVKLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxLQUFLO0FBQUE7QUFBQSxJQUVILFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxNQUFNO0FBQUE7QUFBQSxJQUVKLFNBQVM7QUFBQSxFQUNYO0FBQUE7QUFBQTtBQUFBLEVBR0EsS0FBSyxDQUFDO0FBQUEsRUFDTixNQUFNO0FBQUE7QUFBQSxJQUVKLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxNQUFNO0FBQUE7QUFBQSxJQUVKLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUCxlQUFlO0FBQ2pCO0FBQ0YsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sbUJBQW1CLGVBQWU7QUFBQSxFQUN0QztBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
