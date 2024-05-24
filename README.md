# react-zxing-scanner

Install react-zxing-scanner library
    npm i react-zxing-scanner
    yarn add react-zxing-scanner

MacOs recommend install
    bun add react-zxing-scanner

Then you can use the ScannerComponent

    import  React  from  "react";
    import  ScannerComponent  from "../_components/generic/ScannerComponent";

    <ScannerComponent
      started={startScanner}
      onResult={this.handleBarcode}
      showButtons={false}
    />

    function handleBarcode = (barcode) => {
      console.log('scanned result',barcode.text);
    }