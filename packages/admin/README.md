# @ecommerce/admin

> Front-end for the admin application.

## Table of contents

[TOC]

## Project Structure

```bash
.
├── components/                 # Application components
├── graphql/                    # Generated types from /admin-api schema
├── layouts/                    # Application specific layouts
├── lib/                        # Application specific lib
├── pages/                      # Pages components
├── public/                     # Serve static files
├── tests/                      # Tests
├── .babelrc.jest.js            # Babel config for jest
├── .env.local                  # env file (should not be deployed)
├── .eslintignore               # eslint ignore
├── .eslintrc.js                # eslint config
├── .gitignore                  # git ignore list
├── codegen.yml                 # Codegen for GQL Types & hooks
├── next-env.d.ts               # This file ensures Next.js types are picked up by the TypeScript compiler
├── next.config.js              # Next config
├── package.json                # build scripts and dependencies
├── postcss.config.js           # PostCSS config
├── README.md                   # This file ;)
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # Typescript configuration
└── tsconfig.test.json          # Typescript configuration for test/local environments
```
