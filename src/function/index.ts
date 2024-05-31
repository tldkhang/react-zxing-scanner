import { BrowserCodeReader } from "@zxing/browser";
import { DEFAULT_CONSTRAINTS } from "../constants";

/**
 * The function checks if an array is empty or not and returns a boolean value.
 * @param {String[] | any} array - The parameter "array" is of type "StringMap[] | any", which means
 * it can either be an array of objects with string keys and any values, or any other type of data.
 * @returns a boolean value. It returns `true` if the input array is not empty (i.e., it is an array
 * and has at least one element), and `false` otherwise.
 */
export function checkArray(array: String[] | any) {
  if (Array.isArray(array) && array?.length > 0) {
    if (array.length === 1 && array[0] === undefined) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}

/**
 * The function `requestPermissionCamera` requests permission to access the camera using the
 * `getUserMedia` method and handles any exceptions that may occur.
 * @returns The `requestPermissionCamera` function returns a boolean value (`true`) if the camera
 * permission is successfully granted, and it returns the result of the `handlePermissionException`
 * function if there is an error while trying to get the camera permission.
 */
export const requestPermissionCamera = async (
  constraints?: MediaStreamConstraints
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      !!constraints ? constraints : DEFAULT_CONSTRAINTS
    );
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

const handlePermissionException = (err: any): boolean => {
  let permission: boolean = false;
  switch (err.name) {
    case "NotAllowedError":
    case "NotFoundError":
      permission = false;
      break;
    default:
      permission = false;
      break;
  }
  return permission;
};

/**
 * The function `getDeviceCamera` retrieves a list of video input devices available on the browser.
 * @returns An array of video input devices is being returned.
 */
export const getDeviceCamera = async () => {
  const devices = (await BrowserCodeReader.listVideoInputDevices()) || [];
  if (!checkArray(devices)) {
    return [];
  }
  return devices;
};
