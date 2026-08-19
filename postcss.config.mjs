import postcssBeamFluid from '@beam-css/postcss-fluid'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    postcssBeamFluid({
      // Aligned with layout.css @custom-media --viewport-sm / --viewport-xl
      minViewport: '40rem',
      maxViewport: '80rem',
      tokenFiles: ['src/styles/theme.css'],
    }),
  ],
}
