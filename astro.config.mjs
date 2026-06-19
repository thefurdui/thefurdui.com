// @ts-check
import { defineConfig } from 'astro/config'
import { beamFluidOptions } from './postcss/beam-fluid-options.mjs'
import postcssBeamFluid from './postcss/postcss-beam-fluid.mjs'

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [postcssBeamFluid(beamFluidOptions)],
      },
    },
  },
})
