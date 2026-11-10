# Little Things — Personal Website

A personal portfolio built with Vue 2 and Vuetify. It includes an about section, hobbies with a working music player and food photo gallery, likes and dislikes, and a grade calculator.

## Technology

- Vue 2.7
- Vuetify 2.7
- Vue Router 3
- Vue CLI 5

## Requirements

- Node.js
- npm

## Install and run

```sh
npm install
npm run serve
```

The development server prints its local URL after startup. The home page is at `/`, and the grade calculator is at `/grade-calculator`.

## Validation

```sh
npm run lint
npm run build
```

The production build is generated in `dist/`.

## Update content and assets

Edit `src/data/personalContent.js` to update the personal introduction, education, music tracks, food gallery, likes, dislikes, and footer text.

- Store images in `public/images/` and reference them with paths such as `/images/profile.webp`.
- Store album art in `public/images/music/` and audio files in `public/audio/`.
- Preserve the existing data structure when changing records so the current page components continue to work.

`public/_redirects` contains a single-page-app route rewrite for static hosts that support the Netlify redirects format.
