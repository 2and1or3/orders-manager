import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useRequestForm(cb) {

  const {handleSubmit, isSubmitting} = useForm({
    initialValues: {
      status: 'active',
    }
  });

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
  } = useField('name',
    yup
      .string()
      .trim()
      .required('Поле обязательно для заполнения')
  );

  const {
    value: tel,
    errorMessage: tError,
    handleBlur: tBlur,
  } = useField('tel',
    yup
      .string()
      .trim()
      .required('Поле обязательно для заполнения')
  );

  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur,
  } = useField('amount',
    yup
      .number()
      .required('Поле обязательно для заполнения')
      .min(0, 'Сумма должна быть больше 0')
  );

  const {value: status} = useField('status');

  const onSubmit = handleSubmit(cb);

  return {
    onSubmit,
    isSubmitting,
    name,
    tel,
    amount,
    status,
    nError,
    nBlur,
    tError,
    tBlur,
    aError,
    aBlur,
  }
}
