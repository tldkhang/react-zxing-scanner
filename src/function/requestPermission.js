import { BrowserCodeReader } from "@zxing/browser";

/**
 * The function `requestPermissionCamera` in TypeScript requests permission to access the camera and
 * handles permission exceptions.
 * @param {MediaStream} stream - The `stream` parameter in the `terminateStream` function is of type
 * `MediaStream`. It represents a stream of media content, typically from a camera or microphone. In
 * this context, it is the stream obtained from the user's camera when requesting permission to access
 * it through the `getUserMedia`
 */
export const requestPermissionCamera = async () => {
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

const terminateStream = (stream) => {
  if (stream) {
    stream?.getTracks().forEach((track) => track.stop());
  }
};

const handlePermissionException = (err) => {
  let permission = null;
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

export const getDeviceCamera = async () => {
  const devices = (await BrowserCodeReader.listVideoInputDevices()) || [];
  if (!checkArray(devices)) {
    return [];
  }
  return devices;
};

/**
 * The function checks if an array is empty or not and returns a boolean value.
 * @param {StringMap[] | any} array - The parameter "array" is of type "StringMap[] | any", which means
 * it can either be an array of objects with string keys and any values, or any other type of data.
 * @returns a boolean value. It returns `true` if the input array is not empty (i.e., it is an array
 * and has at least one element), and `false` otherwise.
 */
export function checkArray(array) {
  if (Array.isArray(array) && array?.length > 0) {
    if (array.length === 1 && array[0] === undefined) {
      return false;
    } else {
      return true;
    }
  }
  // Ngược lại, trả về false
  return false;
}
