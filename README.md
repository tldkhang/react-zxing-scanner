<h1 align="center" style="display: flex; justify-content: center, align-items: center">
<image src="assets/barcode.gif" style="width: 48px; height: 48px; margin-right:8px; margin-top: 4px" />
react-zxing-scanner
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
<div align="center">

or

</div>

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
