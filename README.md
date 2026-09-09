# Aniket Ghetla — Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Personal portfolio for Aniket "Harshi" Ghetla — Football Data Scientist & Analyst.
Single-page React + TypeScript app, styled with SCSS modules and design tokens.

## Sections

`Navigation · Hero · About (FIFA-style PlayerCard) · Toolkit · Experience · Education · Projects · Certifications · Hobbies · Contact · Footer`

Section content lives at the top of each component in `src/components/` as plain
data arrays — edit those to update copy, roles, projects, and skills.

## Structure

```
src/
  App.tsx                 section order
  index.scss              global resets + base type
  assets/
    styles/_tokens.scss   colours, fonts, layout variables
    styles/_mixins.scss   shared section/typography mixins
    images/               hero-poster.jpg, fifa-card-portrait.jpg
    video/                hero-touch.mp4  (Hero freeze-frame clip)
  components/
    <Name>.tsx + <Name>.scss   one pair per section
    index.ts                   barrel export
```

Design language (`_tokens.scss`): a floodlit pitch at dusk — deep turf-night
background, chalk-white type, a single amber floodlight accent. Fonts are
**Big Shoulders Display** (headings) and **Space Grotesk** (body), loaded from
Google Fonts in `public/index.html`.

## Run locally

1. Install [Node.js](https://nodejs.org/) (18+), then check it:

    ```bash
    node -v
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the dev server:

    ```bash
    npm start
    ```

   Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
```

`homepage` in `package.json` is set to `"."` so the build uses relative paths and
works from any host or subpath. To deploy to GitHub Pages, set `homepage` to
`https://<user>.github.io/<repo>` and run:

```bash
npm run deploy
```

## Notes

- `package.json` still carries a few dependencies from the original template
  (MUI, Font Awesome, react-vertical-timeline) that this build no longer uses.
  They are harmless; run `npm uninstall @mui/material @mui/icons-material @emotion/react @emotion/styled @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome react-vertical-timeline-component`
  to slim it down.
- Contact links in `src/components/Contact.tsx` are placeholders — update the
  email, LinkedIn, and GitHub URLs.

---

Built on [react-portfolio-template](https://github.com/yujisatojr/react-portfolio-template) by Yuji Sato.
