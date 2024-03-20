# NDC Identity Verification

## before you begin

These packages utilize `pnpm` for monorepo capabilities.

```cmd
npm install -g pnpm
```

Then, we need to init the git submodules:

```cmd
pnpm run init
```

**Note:** In order to run everything on M1 processors, the following steps are also needed:
- Make sure Xcode Command Line Tools are installed: `xcode-select --install`;
- Make sure you have a supported Python version (works with 3.11, but not with 3.12);
- Make sure you are using Node version 18.

Reference: [node-gyp on macOS](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-macos)

## get started

Start local development, be sure to uncomment out the below in `gateway/public/index.html` (temporary):

```html
<!-- <script id="env-config" type="application/json">
%ENV_CONFIG%
</script> -->
```

Then start the dev server:

```cmd
pnpm run dev
```

Your gateway and local dev server should now be connected. Modify your components in `/widget`; changes should reflect immediately.
