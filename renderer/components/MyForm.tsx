import React, { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";

type FormData = {
  name: string;
  value: string;
  type?: string;
  onBlur?: () => void;
};

type MyFormProps = {
  formData: FormData[];
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: React.SyntheticEvent) => void;
  submitText?: string;
};

export function MyForm({
  formData,
  changeHandler,
  submitHandler,
  submitText = "submit",
}: MyFormProps) {
  return (
    <form onSubmit={submitHandler}>
      {formData.map((form) => {
        const { name, value, type, onBlur } = form;

        return (
          <div className="m-5 w-96" key={`form-${name}`}>
            <input
              required
              className="px-3 py-2 w-full"
              type={type || "text"}
              name={name}
              onChange={changeHandler}
              onBlur={onBlur}
              placeholder={name}
              value={value}
            />
          </div>
        );
      })}
      <ButtonWrap>
        <button className="w-full h-full" type="submit">
          {submitText}
        </button>
      </ButtonWrap>
    </form>
  );
}

export const ButtonWrap = tw.div`
mx-auto mb-3 p-2 text-center bg-gray-500 hover:bg-gray-300 w-96 text-2xl rounded
`;
