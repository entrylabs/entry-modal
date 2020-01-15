# entry-modal
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/783a03f8ddd54c6784bcaa3bd01c90d6)](https://www.codacy.com/gh/entrylabs/entry-modal?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=entrylabs/entry-modal&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/%40entrylabs%2Fmodal.svg)](https://badge.fury.io/js/%40entrylabs%2Fmodal)

## Install
### Using npm
```bash
$ npm install --save @entrylabs/tool
```
### Using yarn
```bash
$ yarn add @entrylabs/tool
```

## Usage
### Import - React Component
#### Using ECMAScript module
```javascript
import '@entrylabs/modal/dist/entry/entry-modal.css'
import { Alert, Confirm, Prompt } from '@entrylabs/modal';
```

#### Using CommonJS module
```javascript
require('@entrylabs/modal/dist/entry-modal.css');
const { Alert, Confirm, Prompt } = require('@entrylabs/modal');
```

### Import - script
```html
<link rel="stylesheet" href="{prefix}/entry/entry-modal.css" />
<script src="{prefix}/entry-modal.js"></script>
const { alert, confirm, prompt } = EntryTool;
```

### React props
``` javascript
<Alert
  content="content"
  title="title"
  onEvent={() => {}}
  options={{ 
    positiveButtonText: "positiveButtonText"
  }}
/>
<Confirm
  content="content"
  title="title"
  onEvent={() => {}}
  options={{ 
    negativeButtonText: "negativeButtonText",
    positiveButtonText: "positiveButtonText"
  }}
/>
<Prompt
  content="content"
  defaultValue="defaultValue"
  title="title"
  onEvent={() => {}}
  options={{ 
    placeholder: "ppp",
    negativeButtonText: "negativeButtonText",
    positiveButtonText: "positiveButtonText"
  }}
/>
```

### iife props
```javascript
await EntryTool.alert('content', 'title', {
  positiveButtonText: "positiveButtonText"
});
const bool = await EntryTool.confirm('content', 'title', {
  negativeButtonText: "negativeButtonText",
  positiveButtonText: "positiveButtonText"
});
const value = await EntryTool.prompt('content', 'defaultValue', 'title', {
  placeholder: "ppp",
  negativeButtonText: "negativeButtonText",
  positiveButtonText: "positiveButtonText"
});
```
