# Smart Portfolio Builder

A no-code portfolio generator built with React. Fill in a simple form, watch your portfolio update live, rearrange sections by dragging them, then export a ready-to-host HTML file or print it as a CV.

**Live demo:** https://sanjeet-saini.github.io/portfolio_builder-/

## Features

- **Live preview** – every change in the form appears instantly
- **Drag and drop** – reorder portfolio sections (Hero, Skills, Experience, Projects, Contact) and individual projects
- **3 themes** (Minimal, Dark, Colorful) and **4 templates** (Developer, Designer, Student, Freelancer)
- **Profile photo upload** – stored as a data URL with `FileReader`
- **Smart suggestions** – rule-based tips for missing or weak sections
- **Mobile preview** and **zoom** controls
- **Export to HTML** – download a standalone portfolio page
- **Print / save as PDF** – a print-friendly CV layout
- **Auto-save** – all data is kept in `localStorage`

## Tech stack

- **React 19** (hooks: `useState`, `useEffect`, `useMemo`)
- **Vite**
- HTML5 Drag and Drop API
- Web Storage API (`localStorage`) and `FileReader`
- Lucide React icons
- CSS3

## Project structure

```
src/
├── main.jsx
├── styles.css
├── pages/App.jsx              # App state, auto-save, suggestions, toolbar
├── components/
│   ├── Form.jsx               # Profile, skills, experience, projects, contact
│   ├── Preview.jsx            # Live preview with draggable sections
│   ├── Section.jsx            # Draggable section wrapper
│   └── ThemeSwitcher.jsx      # Theme picker
└── utils/
    ├── defaultData.js         # Demo content, themes and templates
    ├── exportPortfolio.js     # Standalone HTML export and print view
    └── storage.js             # Safe localStorage helpers
```

## Getting started

```bash
git clone https://github.com/sanjeet-saini/portfolio_builder-.git
cd portfolio_builder-
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

This builds the app and publishes the `dist` folder to the `gh-pages` branch, which GitHub Pages serves.

## Author

**Sanjeet Saini** · [GitHub](https://github.com/sanjeet-saini) · [LinkedIn](https://www.linkedin.com/in/sanjeet-saini-880b1827a)
