<h1 style="display: flex !important; justify-content: center !important;">
  <image src="assets/barcode.gif" style="width: 48px; height: 48px; margin-right:8px "/>
  <div>react-zxing-scanner<div>
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
import React from "react";
import BarcodeScanner from "react-zxing-scanner";

export const App = () => {
  return (
    <>
      <BarcodeScanner />
    </>
  );
};
```

[downloads-badge]: assets/downloads.svg
[version-badge]: assets/version.svg
[package]: https://www.npmjs.com/package/react-zxing-scanner
[npmtrends]: https://npmtrends.com/react-zxing-scanner
