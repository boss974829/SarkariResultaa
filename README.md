# SarkariResultaa

SarkariResultaa is an independent reading desk for Indian government exam notices. It lists online forms, results, and admit cards in English and Hindi, then sends you to the recruiting board’s own website to apply, pay, or download a document.

It is **not** a government website. It does not accept applications, fees, documents, or OTPs.

## What you can do

- Browse three home columns: **Result**, **Admit Card**, and **Latest Job**, plus answer keys, syllabi, admissions, certificates, and desk notes.
- Filter the desk by qualification: all levels, 10th / ITI, 12th, or graduate.
- Open a notice for dates, fee, age, vacancy table, how to apply, and the official link.
- Switch the whole desk between **English** and **हिन्दी**. The choice stays in this browser.
- Save a notice. Bookmarks stay in this browser only. There is no account.
- Search by board, post, or result.
- Use the age calculator on the tools page. It counts years, months, and days as on a date. It does not decide eligibility.
- Watch the “Closing this week” strip for forms whose last date is near.

## Important

Confirm every date, fee, age limit, and vacancy on the official PDF before you pay. Figures on this desk are a reading summary. If they differ from the board’s notice, the board’s notice wins.

A real application is filed on the board’s domain (for example `ssc.gov.in`, `upsc.gov.in`, `ibps.in`). SarkariResultaa never collects money.

SarkariResultaa is not affiliated with SSC, UPSC, any railway board, any state commission, or any other recruiting body. It is also not affiliated with other job websites that use a government-result name.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home desk: counts, qualification filter, and notice columns |
| `/notice/:slug` | One notice, with dates, fee, vacancy, steps, and the official link |
| `/category/:slug` | A full column: latest jobs, results, admit cards, and the rest |
| `/board/:slug` | Notices for one recruiting body, plus its official site |
| `/boards` | The board list |
| `/search` | Search by words, with an optional qualification filter |
| `/saved` | Notices saved in this browser |
| `/tools` | Age calculator |
| `/disclaimer` | What this desk is, and what it is not |
| `/privacy` | What stays in the browser |
| `/contact` | Where to go for a real correction (the board, not this desk) |

## Stack

- [TanStack Start](https://tanstack.com/start) and React 19
- TanStack Router, file routes in `src/routes`
- Tailwind CSS 4
- Vite and Nitro, deployed on Vercel
- TypeScript
- Notices are typed data in the repo. There is no scraper and no account database for readers.

Saved notices and the language choice use `localStorage`.

## Project layout

```text
src/routes          pages
src/components      header, columns, notice article, logo
src/data            boards and the notice catalog
src/lib             catalog helpers, Hindi phrases, notice detail, saved notices
public/favicon.svg  the SR mark
```

The notice catalog lives in `src/data/notices.ts`. Each notice has a board, a category, a qualification, dates, and a link to that board’s site. Hindi copy for titles and interface text lives in `src/lib/translate.ts`.

## Run it locally

You need Node.js 22.

```bash
npm install
npm run dev
```

The dev server listens on port `8080`.

```bash
npm run typecheck
npm run build
```

`npm run build` writes a Vercel-ready Nitro output. `npm run preview` serves that build.

## Add or correct a notice

1. Add a board in `src/data/boards.ts` only if it is missing. Use the board’s own URL.
2. Add the notice in `src/data/notices.ts`.
3. Add the English title, headline, and summary to the Hindi map in `src/lib/translate.ts` if the desk should show them in Hindi.
4. Run `npm run typecheck`.

Do not paste a merit list, a hall-ticket PDF, or a payment link that is not on the board’s domain.

## Deploy

The app is set up for Vercel. The framework is TanStack Start. The build command is `npm run build`.

Connect this repository in the Vercel dashboard, or let a linked project deploy on every push to `main`. No database URL is required for the public desk. Saved notices stay in the visitor’s browser.

## Logo

The mark is a white badge with red, green, and yellow stars and the letters **SR**. It is drawn in `src/components/logo.tsx` and repeated as `public/favicon.svg`.

## License

The source in this repository is published so the desk can be read and run. Recruiting-board names, notices, and documents remain the property of those boards. Do not present this project as an official result portal.
