/* eslint-disable react-hooks/exhaustive-deps */
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ZxingScannerProps } from "../dist/index";
import style from "./app.module.css";
import {
  checkArray,
  getDeviceCamera,
  requestPermissionCamera,
} from "./function";
import { useCamera } from "./hooks/useCamera";
import "./index.css";

const ReactZxingScanner = ({
  onUpdate,
  onError,
  height,
  width,
  isSelectCamera = true,
  hints,
}: ZxingScannerProps) => {
  const [lineTop, setLineTop] = useState(0);
  const [direction, setDirection] = useState(1);
  const lineSpeed = 2; // Adjust the speed of the moving line
  const previewElemRef = useRef(null);
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>("");
  const { isPermissionCamera, listDevices, setListDevices } = useCamera();

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
    if (isPermissionCamera && checkArray(listDevices)) {
      await autostartScanner(listDevices);
    } else {
      const hasPermission = await requestPermissionCamera();
      if (!hasPermission) {
        window.alert("No camera permission!");
        return;
      }
      const devices = await getDeviceCamera();
      setListDevices(devices);

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

  const stopCamera = (videoElement: { srcObject: null } | any) => {
    // const videoElement = previewElemRef.current;
    if (videoElement && videoElement?.srcObject) {
      const stream = videoElement.srcObject;
      stream.getTracks().forEach((track: { stop: () => any }) => track.stop());
      videoElement.srcObject = null;
    }
  };

  const autostartScanner = async (devices: MediaDeviceInfo[]) => {
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

  const scanFromDevice = useCallback(async (deviceId: string) => {
    const videoElement = previewElemRef.current;

    const hintsDefault = new Map();
    hintsDefault.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128]);

    const codeReader = new BrowserMultiFormatReader(hints || hintsDefault);
    codeReader.timeBetweenDecodingAttempts = 100;

    await codeReader
      .decodeFromVideoDevice(deviceId, videoElement, (result) => {
        if (!!result) {
          onUpdate(result);
          codeReader.reset();
        }
      })
      .catch((error) => {
        console.error("Error video stream: ", error);
        if (!!onError) {
          onError(error);
        }
      });
  }, []);

  const onChangeCamera = useCallback(
    (e: { target: { value: SetStateAction<string | undefined> } | any }) => {
      setSelectedDevice(e.target.value);
      scanFromDevice(e.target.value);
    },
    []
  );

  return (
    <div className={"relative h-[100vh] w-full flex-1 overflow-hidden"}>
      <video
        ref={previewElemRef}
        autoPlay
        muted
        className={style.webcam}
        style={{
          height: height,
          width: width,
        }}
      />
      {isSelectCamera && checkArray(listDevices) && (
        <div
          style={{
            position: "absolute",
            top: "5vw",
            left: "2vw",
            zIndex: 999999,
          }}
        >
          <select onChange={onChangeCamera} value={selectedDevice}>
            {listDevices.map((device: MediaDeviceInfo) => {
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

export default ReactZxingScanner;
