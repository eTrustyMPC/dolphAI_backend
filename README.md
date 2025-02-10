# SUI hackaton (January 31 - February 10, 2025)

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

# Components

- Loopback Framework 4
- Atoma Cloud (for LLM): <https://cloud.atoma.network/>
- Blockberry for on-chain data: <https://blockberry.one>
- SUI blockchain: <https://sui.io>
- SearApi for collecting search results: <https://serpapi.com/>

## Install pnpm

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install 22 --lts --save --default
nvm use 22
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc
pnpm env use --global 22
node -v
pnpm -v
```

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
pnpm install
```

## Run the application

```sh
pnpm start
```

You can also run `node .` to skip the build step.

Open <http://127.0.0.1:3000> in your browser.

## Rebuild the project

To incrementally build the project:

```sh
pnpm run build
```

To force a full build by cleaning up cached artifacts:

```sh
pnpm run rebuild
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
