/* eslint-disable react-hooks/exhaustive-deps */
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import { useCamera } from "./CameraProvider.js";
import {
  checkArray,
  getDeviceCamera,
  requestPermissionCamera,
} from "./function/requestPermission.js";

const BarcodeScanner = () => {
  const [lineTop, setLineTop] = useState(0);
  const [direction, setDirection] = useState(1);
  const lineSpeed = 2; // Adjust the speed of the moving line
  const previewElemRef = useRef(null);

  const { isCamera, listDevicesRef, selectedDevice, onSelectedDevice } =
    useCamera();

  useEffect(() => {
    const interval = setInterval(() => {
      // Move the line top position based on direction
      setLineTop((prevTop) => prevTop + lineSpeed * direction);

      // Check if the line has reached the bottom or top of the overlay
      if (lineTop >= 500 || lineTop <= 0) {
        // Change direction when reaching the bottom or top
        setDirection((prevDirection) => -prevDirection);
      }
    }, 100); // Adjust the interval based on desired smoothness

    return () => clearInterval(interval);
  }, [direction, lineTop]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move the line top position based on direction
      setLineTop((prevTop) => prevTop + lineSpeed * direction);

      // Check if the line has reached the bottom or top of the overlay
      if (lineTop >= 500 || lineTop <= 0) {
        // Change direction when reaching the bottom or top
        setDirection((prevDirection) => -prevDirection);
      }
    }, 100); // Adjust the interval based on desired smoothness

    return () => clearInterval(interval);
  }, [direction, lineTop]);

  const init = async () => {
    if (isCamera && checkArray(listDevicesRef.current)) {
      await autostartScanner(listDevicesRef.current);
    } else {
      const hasPermission = await requestPermissionCamera();
      if (!hasPermission) {
        window.alert("No camera permission!");
        return;
      }
      const devices = await getDeviceCamera();

      listDevicesRef.current = devices;

      await autostartScanner(devices);
    }
  };

  useEffect(() => {
    const videoElement = previewElemRef.current;

    init();

    return () => {
      stopCamera(videoElement);
    };
  }, []);

  const stopCamera = (videoElement) => {
    // const videoElement = previewElemRef.current;
    if (videoElement && videoElement?.srcObject) {
      const stream = videoElement.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  };

  const autostartScanner = async (devices) => {
    if (!!selectedDevice) {
      await scanFromDevice(selectedDevice);
      return;
    }
    const device =
      devices.find((d) => /back|rear|environment/.test(d.label)) ||
      devices.pop();
    if (device?.deviceId) {
      await scanFromDevice(device.deviceId);
    }
  };

  const scanFromDevice = useCallback(async (deviceId) => {
    const videoElement = previewElemRef.current;

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128]);
    // hints.set(DecodeHintType.TRY_HARDER, true);

    const codeReader = new BrowserMultiFormatReader(hints);
    codeReader.timeBetweenDecodingAttempts = 100;

    await codeReader
      .decodeFromVideoDevice(deviceId, videoElement, (result) => {
        if (!!result) {
          // onUpdate(result);
          codeReader.reset();
        }
      })
      .catch((error) => {
        console.error("Error video stream: ", error);
        // onError(error);
      });
  }, []);

  const onChangeCamera = useCallback((e) => {
    onSelectedDevice(e.target.value);
    scanFromDevice(e.target.value);
  }, []);

  return (
    <div className={"relative h-[100vh] w-full flex-1 overflow-hidden"}>
      <video
        ref={previewElemRef}
        autoPlay
        muted
        className={style.webcam}
        style={{
          height: "100vh",
        }}
      />
      {checkArray(listDevicesRef.current) && (
        <div
          style={{
            position: "absolute",
            top: "5vw",
            left: "2vw",
            zIndex: 999999,
          }}
        >
          <select onChange={onChangeCamera} value={selectedDevice}>
            {listDevicesRef.current.map((device) => {
              return (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div className="absolute left-0 top-0 z-[999] flex h-[100vh] w-[100vw] flex-col items-center justify-around ">
        <div
          className={`flex h-[100vw] w-full items-center justify-center`}
          style={{ backgroundColor: "rgba(21, 21, 21, 0.5)" }}
        >
          <div className="text-[34px] text-white">바코드를 스캔하세요</div>
        </div>
        <div className="flex items-center">
          <div
            className={`h-[60vw] w-[10vw]`}
            style={{ backgroundColor: "rgba(21, 21, 21, 0.5)" }}
          />
          <div
            id="scan-bar"
            className="relative h-[60vw] w-[80vw] border-2 border-white bg-transparent"
          >
            <div
              className={`absolute left-0 h-[3px] w-full bg-[#20D932] ${style.moveUpDown}`}
            />
          </div>
          <div
            className={` h-[60vw] w-[10vw]`}
            style={{ backgroundColor: "rgba(21, 21, 21, 0.5)" }}
          />
        </div>
        <div
          className={`h-full w-full `}
          style={{ backgroundColor: "rgba(21, 21, 21, 0.5)" }}
        />
      </div>
    </div>
  );
};

export default BarcodeScanner;
