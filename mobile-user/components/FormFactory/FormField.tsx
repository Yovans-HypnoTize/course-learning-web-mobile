import { FormikProps } from 'formik';
import { FormFieldConfig } from '../../utils/types';
import OutlinedFormInput from './FormInputs/OutlinedFormInput';
import OutlinedSelectInput from './FormInputs/OutlinedSelectInput';

const FormField: React.FC<{
  formik: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formik, fieldProps }) => {
  if (fieldProps.fieldType === 'textbox-outlined') {
    return (
      <OutlinedFormInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={'textbox-outlined'}
      />
    );
  }else if (fieldProps.fieldType === 'select-outlined') {
    return (
      <OutlinedSelectInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={'select-outlined'}
      />
    );
  } else {
    return <>Nothing to render</>;
  }
};

export default FormField;
