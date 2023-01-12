import React, { Dispatch, SetStateAction } from "react";

type FormData = {
  name: string;
  value: string;
  type?: string;
};

type MyFormProps = {
  formData: FormData[];
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
};

export function MyForm({
  formData,
  changeHandler,
  submitHandler,
}: MyFormProps) {
  return (
    <form onSubmit={submitHandler}>
      {formData.map((form) => {
        const { name, value, type = "" } = form;

        return (
          <div className="m-5 w-96">
            <input
              className="px-3 py-2 w-full"
              type={type}
              name={name}
              onChange={changeHandler}
              placeholder={name}
              value={value}
            />
          </div>
        );
      })}
    </form>
  );
}
