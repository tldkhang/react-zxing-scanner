<h1 align="center">
  🥥 react-zxing-scanner
</h1>

<div align="center">

Performant ReactJS Scanner barcode.

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]

</div>


## Installation

```bash
yarn add react-zxing-scanner
```

or

```bash
npm i react-zxing-scanner
```

MacOS recommend install

```bash
bun add react-zxing-scanner
```

## Usage

Here is a quick example

```tsx
import React from 'react';
import  BarcodeScanner  from "react-zxing-scanner";

export const App = () => {

  return (
    <>
       <BarcodeScanner />
    </>
  );
};
```

[downloads-badge]: src/assets/downloads.svg
[package]: https://www.npmjs.com/package/react-zxing-scanner
[npmtrends]: https://npmtrends.com/react-zxing-scanner
[version-badge]: src/assets/version.svg
