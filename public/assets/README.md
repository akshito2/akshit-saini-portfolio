# Assets Directory

Place your real assets here to replace the placeholders used throughout the website.

## Profile Image

- **File:** `profile-image.jpg`
- Place a professional portrait at `/assets/profile-image.jpg`
- This single file updates the image in both the **Hero** and **About** sections automatically.
- Until this file exists, a stock placeholder portrait is used.

## Portfolio Thumbnails & Videos

- **Thumbnails:** `/assets/portfolio/`
- **Videos:** `/assets/videos/`
- Portfolio data is in `src/data/portfolio.ts` — update `thumbnail` and `videoUrl` fields to point to your real files.
- Example: `videoUrl: '/assets/videos/project-01.mp4'`

## Tool Logos

- **Folder:** `/assets/tools/`
- Tool data is in `src/data/tools.ts` — update names, descriptions, and add logo references there.

## Contact Details

- Contact info is in `src/data/profile.ts` — replace `[ADD EMAIL]`, `[ADD PHONE / WHATSAPP]`, and social URLs with your real details.
- Set your form endpoint (`formEndpoint`) to a Formspree or compatible service URL.
