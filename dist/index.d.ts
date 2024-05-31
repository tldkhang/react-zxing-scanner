import { DecodeHintType, Exception, Result } from "@zxing/library";
export interface ZxingScannerProps {
  onUpdate: (data?: Result) => void;
  onError: (err: Exception) => void;
  height?: string;
  width?: string;
  isSelectCamera?: boolean;
  hints?: Map<DecodeHintType, any>;
  timeBetweenDecodingAttempts?: number;
}

export { default as ReactZxingScanner } from "../src/ReactZxingScanner";
export * from "../src/function";

export { useCamera } from "../src/hooks/useCamera";
