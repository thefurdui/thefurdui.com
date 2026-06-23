// src/env.d.ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

// unplugin-icons: raw SVG string imports (must precede the component wildcard)
declare module '~icons/*?raw' {
  const src: string
  export default src
}

// unplugin-icons: Astro component imports
declare module '~icons/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
  export default component
}
declare module 'virtual:icons/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
  export default component
}

declare module '@fontsource/*'
declare module '@fontsource-variable/*'
