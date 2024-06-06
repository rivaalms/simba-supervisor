# SIMBA Supervisor

Supervisor Platform for SIMBA Web Apps.

## Prerequisites

Make sure these modules are available on your system:

- nodejs `v21.1.0`

- yarn `^1.19` OR bun `^1.1`

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# bun
bun i

# bun & generate yarn lockfile
bun i -y
```

## Development Server

Start the development server on `http://localhost:3080`:

```bash
# yarn
yarn dev

# bun
bun dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build

# bun
bun build
```

Locally preview production build:

```bash
# yarn
yarn preview

# bun
bun preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
