import React, { Dispatch, ReactNode, SetStateAction } from "react";
import tw from "tailwind-styled-components";

type FormData = {
  name: string;
  value: string;
  type?: string;
  onBlur?: () => void;
  placeHolder?: string;
};

type MyFormProps = {
  formData: FormData[];
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: React.SyntheticEvent) => void;
  submitText?: string;
  children?: ReactNode;
};

export function MyForm({
  formData,
  changeHandler,
  submitHandler,
  children,
  submitText = "submit",
}: MyFormProps) {
  // ! 렌더링 생각하면 form을 하나씩 해야할텐데..
  return (
    <Form onSubmit={submitHandler}>
      {formData.map((form) => {
        const { name, value, type, onBlur, placeHolder } = form;

        return (
          <div className="m-5 w-96" key={`form-${name}`}>
            <Input
              required
              type={type || "text"}
              name={name}
              onChange={changeHandler}
              onBlur={onBlur}
              placeholder={placeHolder || name}
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
      {children && children}
    </Form>
  );
}

export const ButtonWrap = tw.div`
mx-auto mb-3 p-2 text-center bg-gray-500 hover:bg-gray-300 w-96 text-2xl rounded
`;
const Form = tw.form`

`;
const Input = tw.input`
px-3 py-2 w-full
`;
