import { defineConfig, transformerDirectives } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  transformers: [
    transformerDirectives(),
  ]
  // ...UnoCSS options
})