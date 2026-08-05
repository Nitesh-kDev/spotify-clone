# Spotify Web Player Clone

A front-end clone of the Spotify Web Player interface, built from scratch with **vanilla HTML, CSS, and JavaScript** — no frameworks, no libraries.

🔗 **Live Demo:** 

## Features

- **Responsive layout** — grid-based UI that adapts across 6 breakpoints, from desktop down to small mobile screens, with a collapsible sidebar on smaller devices
- **Search & filter** — live search box filters songs, artists, and albums in real time; quick-filter chips (All / Music / Artists / Albums) narrow results by category
- **Horizontal carousels** — auto-generated scroll carousels for each content row, with previous/next controls that disable at the start/end
- **Player bar UI** — a fixed bottom player dock that updates the now-playing track, artist, and cover art when a card is clicked, with a working play/pause toggle
- **Keyboard shortcuts** — press `/` to focus search, `m` to toggle the mobile menu
- **Accessible markup** — descriptive `alt` text on all images, `aria-label`s on icon-only buttons

## Tech Used

- HTML5
- CSS3 (CSS Grid, Flexbox, custom properties, media queries)
- Vanilla JavaScript (DOM manipulation, event delegation, no frameworks)
- [Font Awesome](https://fontawesome.com/) for icons
- Google Fonts (Poppins, Montserrat)

## Project Structure

```
spotify-clone/
├── index.html
├── css/
│   └── spotify_clone.css
├── js/
│   └── spotify_clone.js
├── assets/
│   └── (images — add your own image files here, see note below)
└── README.md
```

## Running Locally

No build step needed — just open `index.html` in a browser, or serve the folder with any static server (e.g. the VS Code "Live Server" extension).

## Author

Built by **Nitesh Kumar** as a front-end practice project.
