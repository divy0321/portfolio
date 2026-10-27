# Divy Abusaria — Developer Portfolio

A responsive, dark-themed student developer portfolio built with plain HTML, CSS, and JavaScript. No build tools or package installation are required.

## Run it locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For local development, you can also use VS Code with the Live Server extension.

## Personalize before publishing
Open `script.js` and update `PORTFOLIO_CONFIG`:
- `email`: your real public contact email
- `github`: your GitHub profile URL
- `linkedin`: your LinkedIn profile URL
- `repositories`: real URLs for Reading List, Quiz, Python Basic Programs, Messy Python Code, and Buggy Python Code

The skills are presented as learning areas for a student portfolio. Adjust them to reflect your actual experience. Skill bars are illustrative, not measured assessments.

## Chatbot
The chatbot works immediately in **demo mode** using local responses. To connect an AI model:
1. Create a backend/serverless endpoint that accepts `POST { "message": "..." }`.
2. The endpoint should return JSON like `{ "reply": "..." }`.
3. Store your AI provider API key as a server-side environment variable in that backend.
4. Set `chatApiEndpoint` in `script.js` to your endpoint URL (for example `/api/chat`).
5. Deploy the backend and site, then test the chatbot.

**Security:** Never put a private API key in `script.js`, HTML, or any public repository. Browser JavaScript is visible to visitors. A backend is required to keep the key private.

## Publish it
You can host this static site on GitHub Pages, Netlify, or Vercel. If using GitHub Pages, create a repository, upload the contents of this folder, and enable Pages in the repository settings.

## Files
- `index.html` — page content and sections
- `style.css` — responsive styling
- `script.js` — navigation, contact form, project links, chatbot demo/configuration
- `assets/` — place your own images or downloadable resume here if desired

## Before sharing publicly
- Replace all placeholder links and email.
- Add only skills and project descriptions that accurately reflect your work.
- Add a real resume PDF if you want a resume download button.
- Test mobile layout and contact links.
