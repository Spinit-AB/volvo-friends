# Volvo Friends

A private company project built with [Next.js](https://nextjs.org) and [Sanity CMS](https://www.sanity.io/).

## Quick Start

Use Node.js 26.13.1 (`nvm use`) and pnpm 10.33.0, the versions used for local validation. Supported Node.js versions are declared in `package.json`; the Sanity stack requires at least 22.12. Use a supported version in the deployment build environment as well.

Install the locked dependencies and run the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Sanity Studio runs at [http://localhost:3000/studio](http://localhost:3000/studio).

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before delivery. The build needs network access to fetch Google Fonts and Sanity content.

## Dependency maintenance

The November 2026 refresh updates Next.js/React and the Sanity stack together. Keep `next` and `eslint-config-next` on the same version, and check plugin peer requirements before updating Sanity.

- TypeScript stays on 6.0.3 because the installed `typescript-eslint` supports versions below 6.1. TypeScript 7 does not yet expose the compiler API used by this tooling ([TypeScript migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0)).
- ESLint stays on 9.39.5 because `eslint-plugin-react` 7.37.5 declares support through ESLint 9. ESLint 10 crashes when loading its rules. ESLint 9 is deprecated upstream; revisit this when the React plugin supports ESLint 10.
- pnpm stays pinned to 10.33.0. The attempted upgrade to 12.21.0 failed to execute on the local machine (`ENOEXEC`); update the pin only after verifying installation and builds with a working release.

Review [Sanity's v5–v6 guide](https://www.sanity.io/docs/help/v5-to-v6) and the [next-sanity v12–v13 guide](https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/MIGRATE-v12-to-v13.md) when changing Studio or live-preview configuration. This app keeps its existing embedded Studio and manual content-fetching setup.

`pnpm-workspace.yaml` scopes security overrides to Sanity CLI dependencies whose upstream versions still select vulnerable releases. Remove the overrides when upstream adopts fixed versions. Validate both `pnpm build` and `pnpm exec sanity build /tmp/volvo-studio-build` when changing them.

## Documentation

Detailed setup instructions, environment variables, development workflow, deployment guides, and architectural documentation are maintained in our company's Teams channel. Please refer there for internal documentation.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **CMS:** Sanity 6
- **Package Manager:** pnpm
- **Styling:** CSS Modules
- **Internationalization:** Multi-language support (EN/SV)
