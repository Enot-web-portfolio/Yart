import * as Yup from 'yup';

export const validationSchema = Yup.object({
  userFirstName: Yup.string()
    .required('Введи имя'),
  userLastName: Yup.string()
    .required('Введи фамилию'),
  userEmail: Yup.string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Введи корректную почту'),
  userSelectedMainSkills: Yup.array()
    .min(1, 'Выбери хотя бы одну категорию'),
});
