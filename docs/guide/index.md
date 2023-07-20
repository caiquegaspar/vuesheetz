---
title: Getting Started
---

# Getting Started

## Overview

VueSheetz is a versatile and feature-rich JavaScript library that provides a powerful spreadsheet-like interface for displaying and manipulating tabular data in web applications.

## Trying VueSheetz Online

You can try VueSheetz online on [StackBlitz](https://stackblitz.com/edit/vuesheetz?file=src%2FApp.vue). It runs VueSheetz directly in the browser, and it is almost identical to the local setup but doesn't require installing anything on your machine.

## Adding VueSheetz to your Project

::: code-group

```bash [npm]
npm install vuesheetz
```

```bash [yarn]
yarn add vuesheetz
```

```bash [pnpm]
pnpm add vuesheetz
```

:::tip
VueSheetz requires Vite >=v3.0.0 and Node >=v14.18
:::

## Configuring VueSheetz

After install VueSheetz locally using your preferred package manager, import VueSheetz's component and CSS into your application.

```vue
<script setup>
import { VueSheetzComponent } from 'vuesheetz'
import 'vuesheetz/dist/style.css'
</script>

<template>
  <main>
    <VueSheetzComponent
      :data="[
        [1, 2],
        ['Jhon', 'Doe']
      ]"
      height="400px"
      width="100%"
    />
  </main>
</template>
```

Result:

<VueSheetzComponent :data="[[1, 2], ['Jhon', 'Doe']]" height="400px" width="100%" />

See the list of config options in the [Config Reference](../config/)

## Community

If you have questions or need help, reach out to the community at [GitHub Discussions](https://github.com/caiquegaspar/vuesheetz/discussions).
