/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getDeviceCamera,
  requestPermissionCamera,
} from "./function/requestPermission.js";

export const CameraContext = createContext({
  onSelectedDevice: () => {},
  selectedDevice: "",
  listDevicesRef: [],
  isCamera: false,
});

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const listDevicesRef = useRef([]);

  const [selectedDevice, setSelectedDevice] = useState(undefined);
  const [isCamera, setIsCamera] = useState(false);
  const onSelectedDevice = (newTitle) => {
    setSelectedDevice(newTitle);
  };

  const init = async () => {
    const hasPermission = await requestPermissionCamera();

    if (hasPermission) {
      setIsCamera(true);
      const devices = await getDeviceCamera();
      listDevicesRef.current = devices;
      autostartScanner(devices);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const autostartScanner = async (devices) => {
    const device =
      devices.find((d) => /back|rear|environment/.test(d.label)) ||
      devices.pop();
    if (device?.deviceId) {
      onSelectedDevice(device?.deviceId);
    }
  };

  return (
    <CameraContext.Provider
      value={{ listDevicesRef, selectedDevice, onSelectedDevice, isCamera }}
    >
      {children}
    </CameraContext.Provider>
  );
};
