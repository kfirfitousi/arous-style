# Arous Style

### Online catalog for Arous Elbahar's second-hand store.

-   Built with `React`, `Next.js` and `TypeScript`
-   Managing state with `React Query`
-   Handling forms and validation with `React Hook Form` and `zod`
-   Managing content with `Contentful CMS`
-   Styling with `TailwindCSS`
-   Deployed with `Vercel`

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

# Configuration

### Environment Variables

For a quick start, rename `.env.local.example` in the project root to `.env.local` and open it. This file contains all the neccessary environment variables for the project.

<details><summary>NEXT_PUBLIC_CONTENTFUL_SPACE_ID</summary>

Your Contentful space ID.  
You can find it in the dashboard (https://app.contentful.com) under `Settings` -> `General Settings` -> `Space ID`.

</details>

<details><summary>NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN</summary>

Your Contentful access token.  
You can create a new access token in the dashboard (https://app.contentful.com) under `Settings` -> `API keys` -> `Add API key`.  
After creating your API key, copy the "Content Delivery API - access token" value.

</details>

<details><summary>NEXT_PUBLIC_EMAIL_ADDRESS</summary>

This Gmail address will send itself a new mail for every contact form submission.  
This google account must generate and use an App Password (see `NEXT_PUBLIC_PASSWORD`).

</details>

<details><summary>NEXT_PUBLIC_PASSWORD</summary>

An App Password for the google account mentioned in `NEXT_PUBLIC_EMAIL_ADDRESS`.  
See https://support.google.com/accounts/answer/185833?hl=en for information on how to generate an App Password.

</details>

### Contact Form

The contact form is using the `nodemailer` package to send a new mail for every submission.  
The mail is sent from the Gmail address mentioned in `NEXT_PUBLIC_EMAIL_ADDRESS`.  
The mail recipient, the subject and the body are configurable in [src/config/index.ts](src/config/index.ts).

### Product Categories

Contentful's tags are used to categorize products.  
You can edit these tags in the dashboard (https://app.contentful.com) under `Settings` -> `Tags`.  
The tag name is used as a label for the category.

# Development

To start the development server, run:

```bash
npm run dev
```

Then open http://localhost:3000 with your browser.

# Deployment

The easiest way to deploy this project is with Vercel.  
Click the button below to start.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkfirfitousi%2Farous-style&env=NEXT_PUBLIC_CONTENTFUL_SPACE_ID,NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,NEXT_PUBLIC_EMAIL_ADDRESS,NEXT_PUBLIC_PASSWORD&envDescription=Contentful%20and%20Nodemailer%20configuration&envLink=https%3A%2F%2Fgithub.com%2Fkfirfitousi%2Farous-style%2Fblob%2Fmaster%2FREADME.md&project-name=arous-style&repo-name=arous-style)
