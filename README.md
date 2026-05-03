# LEVEL 0

*From zero to your 1st portfolio.*

LEVEL 0 is currently a local MVP for a visual portfolio builder. The goal is simple: start from a finished portfolio template, edit mapped content directly on the preview, and export a standalone codebase as a ZIP.

## Project Status

MVP in progress - free template builder and ZIP export are working locally.

## Short Description

LEVEL 0 is built for people who want a faster way to launch a personal portfolio without starting from a blank page. Instead of assembling blocks in a generic website builder, you choose a finished portfolio direction, edit the content visually, and export a project you can run on its own.

## Current MVP Features

- Pick from 6 free portfolio templates.
- Edit mapped text directly inside the live preview.
- Replace mapped images from your local machine for previewing.
- Update accent colors using preset theme options.
- Export a standalone portfolio project as a ZIP.
- Use the builder locally without auth, billing, or backend setup.

## Free Templates

All current templates are available as Free:

- Simple Starter
- Dark Starter
- Profile Card
- Light vCard
- Developer OS
- Arcade Neon

## How the Visual Editor Works

1. Choose a finished template that matches the portfolio style you want.
2. Open the editor and click mapped text directly on the preview to update headings, descriptions, and other content.
3. Replace mapped images locally to preview how your portfolio will look with your own assets.
4. Edit mapped links such as social or resume buttons from the preview flow.
5. Change the accent color preset to quickly restyle highlights, buttons, badges, and supporting UI.
6. Export the result as a standalone ZIP when the portfolio looks right.

## ZIP Export

LEVEL 0 exports a separate portfolio project instead of shipping the editor into production. The exported ZIP is a standalone Next.js app containing the generated portfolio structure and template code for the design you selected.

Current export behavior:

- The ZIP is meant to be unzipped and run as its own project.
- Free export currently keeps the `Built with LEVEL 0` watermark.
- Text content and template structure export correctly.
- Local blob-based image uploads used in the editor preview are not bundled into the exported ZIP yet.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## How to Test Exported ZIP

1. Run LEVEL 0 locally.
2. Open any template in the editor.
3. Make a few content edits and export the ZIP.
4. Unzip the exported archive into a separate folder.
5. Inside the exported project, run:

```bash
npm install
npm run dev
```

6. Open the local URL shown by Next.js and verify the exported portfolio renders correctly.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- JSZip

## Current Limitations

- LEVEL 0 is currently a local MVP, not a full hosted product.
- Image uploads are local preview only right now.
- Blob/local uploaded images are not bundled into exported ZIP yet.
- The free export keeps a `Built with LEVEL 0` watermark.
- Website import exists only as a placeholder UI right now.
- Auth, save/load, payment, import, and AI features are planned but not implemented.
- There is no automated test suite in the repository yet.

## Roadmap

- Auth
- Save/load portfolios
- Website import
- AI rewrite
- Paid templates
- Clean export without watermark

## Screenshots

Screenshots coming soon.

- `[Placeholder]` Home page
- `[Placeholder]` Template gallery
- `[Placeholder]` Visual editor
- `[Placeholder]` ZIP export flow
