import React, { Dispatch, SetStateAction } from "react";

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
      <div className="m-5 p-3 text-center bg-gray-500 hover:bg-gray-300 w-96 text-2xl">
        <button className="w-full h-full" type="submit">
          {submitText}
        </button>
      </div>
    </form>
  );
}
