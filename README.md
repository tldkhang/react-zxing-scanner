# react-zxing-scanner

Requires base Zebra Crossing Library

    yarn add @zxing/library

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