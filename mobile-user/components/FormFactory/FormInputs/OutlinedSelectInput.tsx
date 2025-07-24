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
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from '../../../styles/style';

interface OutlinedFormInputProps {
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const OutlinedSelectInput: React.FC<OutlinedFormInputProps> = ({
  formikProps,
  fieldProps,
}) => {
  const [secureText, setSecureText] = useState(fieldProps.type === 'password');
  const isPasswordField = fieldProps.type === 'password';

  const togglePasswordVisibility = () => {
    setSecureText(prev => !prev);
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

  return (
    <View style={styles.container} key={fieldProps.name}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[
          globalStyles.h50,
          globalStyles.border1,
          globalStyles.borderGray,
          globalStyles.r13,
          globalStyles.ph8,
          styles.dropdown,
        //   isFocus && { borderColor: 'blue' },
          fieldProps.required &&
          formikProps.errors[fieldProps.name] &&
          formikProps.touched[fieldProps.name] && globalStyles.borderRed
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={fieldProps.options || []}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={fieldProps.placeholder }
        searchPlaceholder="Search..."
        value={formikProps.values[fieldProps.name]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            formikProps.setFieldValue(fieldProps.name, item.value)
          setValue(item.value);
          setIsFocus(false);
        }}
      />

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

export default OutlinedSelectInput;

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
    marginLeft: 5,
  },

  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderRadius: 13,
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:"#A9A9A9"
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
