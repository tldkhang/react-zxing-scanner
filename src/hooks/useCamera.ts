/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getDeviceCamera, requestPermissionCamera } from "../function";

export const useCamera = () => {
  const [isPermissionCamera, setIsPermissionCamera] = useState<boolean>(false);
  const [listDevices, setListDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const checkPermission = async () => {
      const isCamera = await requestPermissionCamera();
      if (isCamera) {
        const devices = await getDeviceCamera();
        setListDevices(devices);
      }
      setIsPermissionCamera(isCamera);
    };

    checkPermission();
  }, []);

  return {
    isPermissionCamera,
    setIsPermissionCamera,
    listDevices,
    setListDevices,
  };
};
