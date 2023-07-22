<div align="center">

<a href="https://vuesheetz.pages.dev/" rel="nofollow">
  <img src="https://raw.githubusercontent.com/caiquegaspar/vuesheetz/main/docs/public/logo.svg" alt="VueSheetz" width="300">
</a>

# VueSheetz

VueSheetz is a versatile and feature-rich Vue component that provides a powerful spreadsheet-like interface for displaying and manipulating tabular data in web applications.

[![npm](https://img.shields.io/npm/dt/vuesheetz)](https://www.npmjs.com/package/vuesheetz)
[![npm](https://img.shields.io/npm/dm/vuesheetz)](https://www.npmjs.com/package/vuesheetz)

---

### Get started with VueSheetz

---

<a href="https://vuesheetz.pages.dev/">
  <img src="https://raw.githubusercontent.com/caiquegaspar/vuesheetz/main/docs/public/github-preview.png" alt="VueSheetz github preview" width="805"/>
</a>

</div>

## Features

Features of VueSheetz:

&nbsp;&nbsp;✓&nbsp; Intuitive spreadsheet-like interface <br>
&nbsp;&nbsp;✓&nbsp; Convenient API <br>
&nbsp;&nbsp;✓&nbsp; Multiple column sorting <br>
&nbsp;&nbsp;✓&nbsp; Validating data <br>
&nbsp;&nbsp;✓&nbsp; Columns text and number formatting <br>
&nbsp;&nbsp;✓&nbsp; Resizing rows/columns <br>

See the full list of current and future features in the [Features Section](https://vuesheetz.pages.dev/guide/features)

## Documentation

- [Developer guides](https://vuesheetz.pages.dev/guide)
- [API Reference](https://vuesheetz.pages.dev/api)
- [Changelog](https://github.com/caiquegaspar/vuesheetz/releases)
- [Demo](https://vuesheetz.pages.dev/guide/demo)

## Get started

### Installing VueSheetz in your Project

With NPM:

```bash
npm install vuesheetz
```

With Yarn:

```bash
yarn add vuesheetz
```

With PNPM:

```bash
pnpm add vuesheetz
```

> VueSheetz requires Vue >=v3.0.0 and Node >=v14.18

## Configuring VueSheetz

After install VueSheetz locally using your preferred package manager, import VueSheetz's component and CSS into your application.

```js
import { VueSheetzComponent } from 'vuesheetz'
import 'vuesheetz/dist/style.css'
```

Here is a full example using a minimal configuration:

```js
<script setup>
import { VueSheetzComponent } from 'vuesheetz'
import 'vuesheetz/dist/style.css'
</script>

<template>
  <VueSheetzComponent
    :data="[
      [1, 2],
      ['Jhon', 'Doe']
    ]"
    height="400px"
    width="100%"
  />
</template>
```

Result:

<img src="https://raw.githubusercontent.com/caiquegaspar/vuesheetz/main/docs/public/basic-demo.png" alt="VueSheetz basic demo preview" width="700"/>

See the list of config options in the [Config Reference](https://vuesheetz.pages.dev/config/)

## Community

If you have questions or need help, reach out to the community at [GitHub Discussions](https://github.com/caiquegaspar/vuesheetz/discussions).

## License

[MIT](./LICENSE) License © 2023-Present [Caíque Gaspar](https://github.com/caiquegaspar)
