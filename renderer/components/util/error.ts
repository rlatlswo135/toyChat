import { Dispatch, SetStateAction } from "react";
import {
  AUTH_ALREADY_EMAIL,
  AUTH_INVALID_EMAIL,
  AUTH_INVALID_PWD,
  AUTH_NOTFOUND,
  AUTH_REQUEST_FAIL,
  AUTH_WRONG_PWD,
  ErrorMsg,
  MSG_AUTH_ALREADY_EMAIL,
  MSG_AUTH_INVALID_EMAIL,
  MSG_AUTH_INVALID_PWD,
  MSG_AUTH_NOTFOUND,
  MSG_AUTH_REQUEST_FAIL,
  MSG_AUTH_WRONG_PWD,
  MSG_DEFAULT,
} from "../../constants/error";

export const makeErrorMsg = (
  result: string,
  setter: Dispatch<SetStateAction<ErrorMsg>>
) => {
  switch (result) {
    case AUTH_NOTFOUND:
      setter(MSG_AUTH_NOTFOUND);
      break;
    case AUTH_WRONG_PWD:
      setter(MSG_AUTH_WRONG_PWD);
      break;
    case AUTH_REQUEST_FAIL:
      setter(MSG_AUTH_REQUEST_FAIL);
      break;
    case AUTH_ALREADY_EMAIL:
      setter(MSG_AUTH_ALREADY_EMAIL);
      break;
    case AUTH_INVALID_EMAIL:
      setter(MSG_AUTH_INVALID_EMAIL);
      break;
    case AUTH_INVALID_PWD:
      setter(MSG_AUTH_INVALID_PWD);
      break;
    default:
      setter(MSG_DEFAULT);
  }
};

export const checkError = <T>(
  result: T,
  errSetter: Dispatch<SetStateAction<ErrorMsg>>,
  loadingSetter: Dispatch<SetStateAction<boolean>>
) => {
  if (typeof result === "string") {
    makeErrorMsg(result, errSetter);
    loadingSetter(false);
    return true;
  }
  return false;
};
