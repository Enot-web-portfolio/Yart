import { FormikConfig, FormikProvider, useFormik } from 'formik';
import { PropsWithChildren, useEffect } from 'react';
import { AppError } from 'src/core/models/app-error';
import { typedMemo } from 'src/core/utils/typed-memo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props<T extends object> {

  /** Formik config. */
  readonly formikConfig: FormikConfig<T>;

  /** Error. */
  readonly error: AppError<T> | null;
}

/** App form component. */
const AppFormComponent = <T extends object>({
  children, error, formikConfig,
}: PropsWithChildren<Props<T>>) => {
  const formik = useFormik(formikConfig);

  useEffect(() => {
    if (error != null) {
      formik.setErrors({ ...error.validationData });
    }
    formik.setSubmitting(false);

  // formik is not in deps, because `setSubmitting` and `setError` cause formik update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <FormikProvider value={formik}>{children}</FormikProvider>;
};

/** App form component. */
export const AppForm = typedMemo(AppFormComponent);
