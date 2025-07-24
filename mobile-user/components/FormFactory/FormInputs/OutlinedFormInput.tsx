import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { FormikProps } from 'formik';
import { FormFieldConfig } from '../../../utils/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OutlinedFormInputProps {
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}

const OutlinedFormInput: React.FC<OutlinedFormInputProps> = ({
  formikProps,
  fieldProps,
}) => {
  const [secureText, setSecureText] = useState(fieldProps.type === 'password');
  const isPasswordField = fieldProps.type === 'password';

  const togglePasswordVisibility = () => {
    setSecureText(prev => !prev);
  };

  return (
    <View style={styles.container} key={fieldProps.name}>
      <View
        style={
          fieldProps.required &&
          formikProps.errors[fieldProps.name] &&
          formikProps.touched[fieldProps.name]
            ? [styles.inputWrapper, { borderColor: 'red' }]
            : styles.inputWrapper
        }
      >
        <TextInput
          onChangeText={
            fieldProps.onChange
              ? fieldProps.onChange
              : formikProps.handleChange(fieldProps.name)
          }
          onBlur={formikProps.handleBlur(fieldProps.name)}
          value={formikProps.values[fieldProps.name]}
          style={styles.input}
          secureTextEntry={isPasswordField ? secureText : false}
          placeholder={fieldProps.placeholder || ''}
          placeholderTextColor="#A9A9A9"
          keyboardType={
            fieldProps.type === 'number'
              ? 'numeric'
              : fieldProps.type === 'email'
              ? 'email-address'
              : 'default'
          }
          autoCapitalize={fieldProps.type === 'email' ? 'none' : 'sentences'}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={secureText ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        )}
      </View>

      {fieldProps.required &&
        formikProps.errors[fieldProps.name] &&
        formikProps.touched[fieldProps.name] && (
          <Text style={styles.errorText}>
            {formikProps.errors[fieldProps.name]}
          </Text>
        )}
    </View>
  );
};

export default OutlinedFormInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 13,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: 'black',
  },
  iconWrapper: {
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 2,
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '100%',
    marginLeft:5
  },
});
