import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from 'vue-router';

export function useAuthForm(type) {
  const {handleSubmit, isSubmitting} = useForm();
  const store = useStore();
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch(`auth/${type}`, values);
      router.push('/');
    } catch (e) {}
  })

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur
  } = useField(
    'email',
    yup
    .string()
    .trim()
    .required('Введите email')
    .email('Необходимо ввести корректный email')
  );

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    'password',
    yup
    .string()
    .trim()
    .required('Введите пароль')
    .min(6, 'Пароль не может быть меньше 6 символов')
  );

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting
  }
}
