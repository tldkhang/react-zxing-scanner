/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserCodeReader } from "@zxing/browser";
import { checkArray } from "../function";

export const useCamera = () => {
  const requestPermissionCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        // video: true,
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      terminateStream(stream);
      return true;
    } catch (err) {
      return handlePermissionException(err);
    }
  };
  const terminateStream = (stream: MediaStream) => {
    if (!!stream) {
      stream?.getTracks().forEach((track) => track.stop());
    }
  };

  const handlePermissionException = (err: any) => {
    let permission: any = null;
    switch (err.name) {
      case "NotAllowedError":
      case "NotFoundError":
        permission = false;
        break;
      default:
        break;
    }
    return permission;
  };
  const getDeviceCamera = async () => {
    const devices = (await BrowserCodeReader.listVideoInputDevices()) || [];
    if (!checkArray(devices)) {
      return [];
    }
    return devices;
  };

  return {
    requestPermissionCamera,
    getDeviceCamera,
  };
};
