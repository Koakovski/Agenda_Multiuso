import * as yup from "yup";

export const nameValidation = {
  name: yup.string().required("nome é um campo obrigatório."),
};

export const emailValidation = {
  email: yup
    .string()
    .email("deve ser informado um email válido.")
    .required("email é um campo obrigatório."),
};

export const passwordValidation = {
  password: yup
    .string()
    .required("senha é um campo obrigatório.")
    // eslint-disable-next-line no-template-curly-in-string
    .min(8, "a senha deve conter no mínimo ${min} caracteres."),
};

export const confirmPasswordValidation = {
  confirmPassword: yup
    .string()
    .required("confirmar senha é um campo obrigatório.")
    .oneOf([yup.ref("password"), null], "as senhas devem ser correspondentes"),
};

const phoneRegExp = /^[1-9]{2}9[1-9]{8}$/g;

export const phoneNumberValidation = {
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Este Telefone não é válido")
    .required("Telefone é um campo obrigatório."),
};
