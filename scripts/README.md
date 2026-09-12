The `/resume` route reads its content from `resume.md`. Keep its current headings,
`label: value` contact/skill fields, and two-level entry lists. Entry headings use
` · ` separators, with the date last (and the project URL immediately before it).

Every `pnpm build` builds the site and exports `/resume` as one US Letter page
(8.5 × 11 in) using its print styles. The PDF is written only to
`dist/andrei-furdui-resume.pdf` and served at `/andrei-furdui-resume.pdf`.
Commit the resume source and styles; the PDF is generated build output.
`pnpm resume:pdf` remains an alias for the full build.

Cloudflare Pages should use `pnpm build` as its build command and `dist` as its
output directory. `.node-version` selects the Node version for the build image.
The pinned [`@sparticuz/chromium`](https://github.com/Sparticuz/chromium)
development dependency supplies headless Chromium and its shared libraries for
Linux x64 builds, so dependency installation must include dev dependencies.
Keep its Chromium major aligned with `playwright-core` when upgrading.

Other platforms use an installed Google Chrome. Set `CHROME_PATH` to use another
installed Chromium executable on any platform. The exporter waits for fonts,
checks that content stays within the print margins, checks for failed resources,
and closes its browser and preview server. An export failure fails the build.

To check the generated download locally, run `pnpm build` followed by
`pnpm preview`. `pnpm dev` does not generate or serve the PDF from `dist/`.

The PDF's `X-Robots-Tag: noindex, follow` response header is configured in
`public/_headers`. Astro copies this file into `dist/` for Cloudflare Pages to
apply after deployment; Astro's local preview server does not apply these rules.
