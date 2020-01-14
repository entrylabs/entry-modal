# entry-modal
[![npm version](https://badge.fury.io/js/%40entrylabs%2Fmodal.svg)](https://badge.fury.io/js/%40entrylabs%2Fmodal)

## Install
### Using npm
```
$ npm install --save @entrylabs/tool
```
### Using yarn
```
$ yarn add @entrylabs/tool
```

## Usage
### Import - React Component
#### Using ECMAScript module
```javascript
import '@entrylabs/modal/dist/entry-modal.css'
import { Component } from '@entrylabs/modal';
const { Alert, Confirm, Prompt } = Component;
```

#### Using CommonJS module
```javascript
require('@entrylabs/modal/dist/entry-modal.css');
const { Component: { Alert, Confirm, Prompt } } = require('@entrylabs/modal');
```

### Import - script
```html
<link rel="stylesheet" href="{prefix}/entry-modal.css" />
<script src="{prefix}/entry-modal.js"></script>
const { alert, confirm, prompt } = EntryTool;
```

### React props
``` javascript
<Alert
  content="content"
  title="title"
  theme="entry" // [entry, line] default = entry
  onEvent={() => {}}
  options={{ 
    positiveButtonText: "positiveButtonText"
  }}
/>
<Confirm
  content="content"
  title="title"
  theme="entry" // [entry, line] default = entry
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
  theme="entry" // [entry, line] default = entry
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

