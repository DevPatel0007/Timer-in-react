# Timer in React

A simple React timer app built with Vite, TypeScript, Tailwind CSS, and TanStack Router.

## Project Overview

- Uses React 19 with TypeScript.
- Routes are defined in `src/routes` using TanStack Router.
- Styling is handled with Tailwind CSS.
- Includes ESLint and Prettier for linting and formatting.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing

Run the test suite with Vitest:

```bash
npm run test
```

## Linting & Formatting

Run ESLint:

```bash
npm run lint
```

Format files and apply fixes:

```bash
npm run format
```

Check formatting with Prettier:

```bash
npm run check
```

## Project Structure

- `src/routes/` — file-based route definitions
- `src/components/` — reusable UI components
- `src/styles.css` — global styles and Tailwind imports
- `vite.config.ts` — Vite configuration

## Notes

This project is configured for Vite and can be extended with additional routes, components, and Tailwind utilities as needed.

  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
