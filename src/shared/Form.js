import { Field, FieldArray } from 'formik';
import React from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../config/StyleConst';

// Formik

export const InputStyled = styled.input`
  ${({ error }) => (error && css`
      border: 1px solid ${Color.Red};
    `
  )}
`;

export const RadioStyled = styled.input`
  ${({ error }) => (error && css`
      outline: 1px solid ${Color.Red};
    `
  )}
`;

export const SelectStyled = styled.select`
  ${({ error }) => (error && css`
      border: 1px solid ${Color.Red};
    `
  )}
`;

export const Error = styled.p`
  color: ${Color.Red};
`;

export const ErrorMsg = ({ children: msgs }) => (
  <>
    {Array.isArray(msgs)
      ? msgs.map((msg) => <Error key={msg}>{msg}</Error>)
      : <Error>{msgs}</Error>}
  </>
);


export const Input = ({ name, type, placeholder }) => (
  <Field name={name}>
    {({ field, meta }) => {
      const {
        value, onChange, onBlur,
      } = field;
      const error = meta.touched && meta.error;
      return (
        <>
          <InputStyled
            error={error}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
          />
          {error && <ErrorMsg>{meta.error}</ErrorMsg>}
        </>
      );
    }}
  </Field>
);

export const Select = ({
  name, data, blank, valueIsString,
} = { valueIsString: false }) => (
  <Field name={name}>
    {({ field, form: { setFieldValue }, meta }) => {
      const {
        value: fieldValue, onChange, onBlur,
      } = field;
      const error = meta.touched && meta.error;
      return (
        <>
          <SelectStyled
            error={error}
            name={name}
            value={fieldValue}
            onChange={(e) => {
              const v = e.currentTarget.value;
              if (valueIsString || !v) {
                onChange(e);
              } else {
                setFieldValue(field.name, Number(v));
              }
            }}
            onBlur={onBlur}
          >
            {blank && <option>{}</option>}
            {(data || []).map(({ label, value }) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </SelectStyled>
          {error && <ErrorMsg>{meta.error}</ErrorMsg>}
        </>
      );
    }}
  </Field>
);

export const MultiSelect = ({
  name, data, blank, valueIsString, deleteHandler, renderSelectBoxLayout,
} = { valueIsString: false }) => (
  <Field name={name}>
    {({ field, form: { setFieldValue }, meta }) => {
      const {
        value: fieldValues, onBlur,
      } = field;
      const error = meta.touched && meta.error;

      const updateFieldValue = ({ index, newValue }) => {
        const newFieldValues = [...fieldValues];
        newFieldValues[index] = newValue;
        setFieldValue(field.name, newFieldValues);
      };

      const values = fieldValues.length ? fieldValues : [undefined];

      return (
        <>
          {values.map((v, index) => (
            renderSelectBoxLayout({
              index,
              deleteHandler: () => deleteHandler(index),
              SelectBox: (
                <SelectStyled
                  error={error}
                  name={name}
                  value={v}
                  onChange={(e) => {
                    const targetValue = e.currentTarget.value;
                    let newValue;
                    if (valueIsString || !targetValue) {
                      newValue = targetValue;
                    } else {
                      newValue = Number(targetValue);
                    }
                    updateFieldValue({ index, newValue });
                  }}
                  onBlur={onBlur}
                >
                  {blank && <option>{}</option>}
                  {(data || []).map(({ label, value }) => (
                    <option value={value} key={value}>{label}</option>
                  ))}
                </SelectStyled>
              ),
            })
          ))}
          {error && <ErrorMsg>{meta.error}</ErrorMsg>}
        </>
      );
    }}
  </Field>
);

export const Radio = ({ name, data }) => (
  <Field name={name}>
    {({ field: { value: formValue, ...field }, form, meta }) => {
      const {
        onBlur,
      } = field;
      const error = meta.touched && meta.error;
      return (
        <>
          {(data || []).map(({ value, label }) => (
            <label key={value}>
              <RadioStyled
                type="radio"
                value={value}
                name={name}
                checked={formValue === value}
                error={error}
                onChange={() => {
                  form.setFieldValue(name, value);
                }}
                onBlur={onBlur}
              />
              {label}
            </label>
          ))}
          {error && <ErrorMsg>{meta.error}</ErrorMsg>}
        </>
      );
    }}
  </Field>
);

// TODO: エラーの赤線とエラーメッセージ
export const Check = ({ name, data }) => (
  <FieldArray name={name}>
    {({ form: { values }, ...arrayHelpers }) => (
      <div>
        {(data || []).map(({ value, label }) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={(values[name] || []).includes(value)}
              onChange={(e) => {
                if (e.target.checked) arrayHelpers.push(value);
                else {
                  const idx = values[name].indexOf(value);
                  arrayHelpers.remove(idx);
                }
              }}
            />
            {label}
          </label>
        ))}
      </div>
    )}
  </FieldArray>
);
