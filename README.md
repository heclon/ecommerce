# Ecommerce

This project contains an extensible and reusable monorepo archetype that can be used for setting up an Ecommerce `app`, with its `admin` modules.
The `ui` package contains multiple UI components based on React and TailwindCSS, and it has been setup with Storybook.
Enjoy.

## Table of contents

[TOC]

## Project Structure

```bash
.
├── packages/                   # The magic happens here
│   ├── admin/                  # Next.js admin front-end
│   ├── app/                    # Next.js, main front-end
│   ├── datamodel/              # Prisma datamodel
│   └── ui/                     # UI components
├── .editorconfig               # editor config
├── .gitignore                  # git ignore list
├── .auth0                      # Email templates in Auth0
├── .nvmrc                      # nvm config
├── .prettierrc                 # Prettier configuration
├── commitlint.config.js        # Commitlint configuration
├── lerna.json                  # Lerna config
├── package.json                # build scripts and dependencies
├── README.md                   # This file ;)
├── tsconfig.json               # Root tsconfig file
└── yarn.lock                   # yarn lock file
```

## Quickstart

### Prerequisites

- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)
- [Node.js 16.14](https://nodejs.org/en/) (Or LTS)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [Docker](https://www.docker.com/)

```bash
# ensure you have the prerequisites
# install
brew install node && brew install yarn

# OR update
brew update && brew upgrade && brew install yarn

# install dependencies
yarn install
```

## Development

### .env configuration

There is a different .env file for each subdirectory and the root directory: `/datamodel`, `/admin`, `/app`, `/common`, & `/`.

Fill in any missing values from 1Password

### Commands

```bash

# serve the ui with storybook
yarn dev:ui
```

## Building

You can build storybook with:

```bash

# build application (app, api, ui)
yarn build:ui
```

## Help

### GraphQL

- [Mercurius](https://mercurius.dev/)
- [How to GraphQL](https://www.howtographql.com/)
- [Introduction to GraphQL](https://graphql.org/learn/)

A series of articles regarding the GraphQL spec (simplified):

- https://blog.graphql.guide/the-graphql-spec-simplified-93005ce0671f
- https://blog.graphql.guide/the-graphql-spec-simplified-the-type-system-10861e5bded7

### Language

- [Mozilla JavaScript References](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Typescript Docs](https://www.typescriptlang.org/docs/)

### React/ Next.js

- [Next.js](https://nextjs.org/)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

### UI

- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Headless UI](https://headlessui.dev/)
