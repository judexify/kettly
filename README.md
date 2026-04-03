# Kettly — Enterprise Brewing Solutions

> RFC 2324 compliant. Brews nothing. Ships to production.

## What is this?

Kettly is a fully functional SaaS dashboard that secretly makes no sense.

It looks like a real product. It has a sidebar, analytics, reports, and a status bar that boots with system logs. But the sidebar does nothing. The only way to navigate is by holding down a kettle. Short-clicking it causes chaos. The app ends with an HTTP 418 error and a brief history of why that exists.

Built for the **DEV April Fools Challenge 2025** — prompt: `HTCPCP IYKYK`.

---

## The Joke

On 1 April 1998, Larry Masinter published RFC 2324 — the Hyper Text Coffee Pot Control Protocol — as an April Fools' joke. Buried inside was HTTP status code **418: I'm a Teapot**, returned when a teapot is asked to brew coffee.

In 2017, someone tried to delete it. The internet revolted. 418 survived.

Kettly is built in its honour.

---

## Features

- **Entry screen** — type less than 4 characters and a login button appears. Type more and the extra letters fall off the screen into a kettle that overflows into a cup
- **Fake sidebar** — Overview, Analytics, Reports. All return `418 I'm a Teapot (RFC 2324)`
- **The kettle** — the only true navigation
  - Short click → chaos
  - Hold 1 second → advances to next page
- **HTCPCP boot sequence** — fires on dashboard load
- **418 ending modal** — appears after all pages are visited
- **Larry Masinter lore modal** — the full story of 418, written for non-technical humans, plus a joke
- **Fully responsive** — mobile nav with active state driven by the kettle

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

No frameworks. No build tools. No dependencies. No real functionality.

---

## How to Run

Just open `index.html` in a browser.
```bash
git clone https://github.com/judexify/kettly.git
cd kettly
open index.html
```

---

## Project Structure
```
kettly/
├── index.html
├── style.css
└── script.js
```

---

## RFC Compliance

| Protocol | Status |
|---|---|
| HTCPCP/1.0 | ✅ Initializing |
| BREW command | ✅ 200 OK |
| Coffee brewing | ❌ 418 I'm a Teapot |
| Real value | ❌ None detected |

---

## License

MIT — do whatever you want with it. Larry would probably approve.

---

*Built on 1 April 2025. Larry Masinter, wherever you are — this one's for you.*
