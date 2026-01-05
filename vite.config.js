import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        catalog: './catalog.html',
        product: './product-aurelius.html',
        checkout: './checkout.html',
        profile: './profile.html',
      },
    },
  },
})

