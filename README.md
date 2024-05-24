
<h1 align="center">

  [![Icon][gif-scan]] react-zxing-scanner

</h1>

<div align="center">

Performant ReactJS Scanner barcode.
[![Icon][gif-scan]]
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

[downloads-badge]: assets/downloads.svg
[version-badge]: assets/version.svg
[package]: https://www.npmjs.com/package/react-zxing-scanner
[npmtrends]: https://npmtrends.com/react-zxing-scanner
[gif-scan]: assets/barcode.gif
