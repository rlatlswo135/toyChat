import { Dispatch, SetStateAction } from "react";
import {
  AUTH_INVALID_EMAIL,
  AUTH_INVALID_PWD,
  AUTH_NOTFOUND,
  AUTH_REQUEST_FAIL,
  AUTH_WRONG_PWD,
  MSG_AUTH_INVALID_EMAIL,
  MSG_AUTH_INVALID_PWD,
  MSG_AUTH_NOTFOUND,
  MSG_AUTH_REQUEST_FAIL,
  MSG_AUTH_WRONG_PWD,
  MSG_DEFAULT,
} from "../../constants/error";

export const makeErrorMsg = (
  result: string,
  setter: Dispatch<SetStateAction<string | null>>
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