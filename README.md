# Arous Style

### Online catalog for Arous Elbahar's second-hand store.

-   Built with `React` and `Next.js`
-   Managing state with `React Query`
-   Handling forms and validation with `React Hook Form` and `zod`
-   Managing content with `Contentful CMS`
-   Styling with `TailwindCSS`

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

# Configuration

For a quick start, rename `.env.local.example` to `.env.local` and open it. This file contains all the neccessary configurations for this project.

<details><summary>NEXT_PUBLIC_CONTENTFUL_SPACE_ID</summary>

Your Contentful space ID.  
You can find it in the dashboard (https://app.contentful.com) under `Settings` -> `General Settings` -> `Space ID`

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

# Development

To start the development server, run:

```bash
npm run dev
```

Then open http://localhost:3000 with your browser.
