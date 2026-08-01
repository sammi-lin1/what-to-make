## About

I volunteer at a culinary kitchen and each class they give out a recipe. So I have a stack of recipes in my cabinet from them which I've collected over several classes. I occasionally use that stack to draw inspiration on what to make for dinner/lunch when I'm struggling to think of a dish. However, my stack isn't exhaustive and I find myself wishing for a website that with a click of a button could generate a random recipe from those classes. Aaaand that's what this is!

## Contents

- [Backend service](app-express) - an Express service with endpoints
- [Frontend app](app-react) - a React app

## Tech Stack

- React
- Vite
- Vitest
- ExpressJS
- GitHub Actions

## Getting started

1. Build your app.

```bash
npm install
npm run build # both Express backend and React frontend
npm run build:backend # only Express backend
npm run build:frontend # only React frontend
```

2. Start your app.

```bash
npm install
npm run start # both Express backend and React frontend
npm run start:backend # only Express backend
npm run start:frontend # only React frontend
```

---

Boilerplate retrieved from [Alva Labs](https://www.alvalabs.io/).

Developer Note: I started with this framework because the entry point was super easy. In future versions, I'll be switching to Next.js

## Next Steps

V1 of What to Make
UI updates including finalizing colorway and adding better loading graphics.

V2 of What to Make
In the next version, this app will be using Next.js as the framework. There really isn't a good reason for why I chose to use a boilerplate besides the fact that the entry point was so straightforward. After that overhaul, I'd like to introduce a browsing feature and a more robust pdf to json parser that can handle messy data however it may be structured.
