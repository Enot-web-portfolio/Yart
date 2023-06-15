import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  workMainSkills: Yup.array()
    .min(1, 'Выберите категории')
    .max(2, 'Не больше 2 категорий'),
});
