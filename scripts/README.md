The `/resume` route reads its content from `resume.md`. Keep its current headings,
`label: value` contact/skill fields, and two-level entry lists. Entry headings use
` · ` separators, with the date last (and the project URL immediately before it).

After editing the resume or its styles, run `pnpm resume:pdf`. This builds the
site, exports `/resume` as one US Letter page (8.5 × 11 in) using its print styles,
and updates the PDF in both `public/` and `dist/`. Commit the PDF with the source
changes. Ordinary site builds serve the checked-in PDF and do not require a
browser on the deployment server.

Export requires Google Chrome. Set `CHROME_PATH` to use another installed Chromium
executable. The exporter waits for fonts, checks that content stays within the
print margins, checks for failed resources, and always closes its browser and
preview server.
