import React from "react";
import { Exception, Result } from "@zxing/library";
export interface ZxingScannerProps {
  onUpdate: (data?: Result) => void;
  onError: (err: Exception) => void;
}

export default class ReacZxingScanner extends React.Component<ZxingScannerProps> {}
