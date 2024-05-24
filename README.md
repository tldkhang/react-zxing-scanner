### react-zxing-scanner

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

Here is a quick example, using the default ScrollView renderer.

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