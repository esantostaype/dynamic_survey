'use client'
import { ReactNode } from 'react';
import { FormValuesStep4 } from '@/interfaces';
import { ErrorForm, LabelForm, SectionForm, TitleForm } from '@/components';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SelectChangeEvent, TextField } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  errors: FormikErrors<FormValuesStep4>;
  touched: FormikTouched<FormValuesStep4>;
  values: FormValuesStep4;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  setFieldValue: (field: string, value: unknown) => void;
}

export const Step4 = ({ errors, touched, values, handleChange, setFieldValue }: Props) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof FormValuesStep4] as unknown as string[];

    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value));
    } else {
      setFieldValue(name, [...currentValues, value]);
    }
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q16Other", event.target.value);
  }

  const handleQ17ExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q17Explain", event.target.value);
  }

  const handleQ19ExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q19Explain", event.target.value);
  }

  return (
    <>
      <TitleForm title='Perceptions of the Market and Competition' />
      <SectionForm>
        <LabelForm label='How informed are you about the local market options available for web development and branding services?'/>
        <RadioGroup name="q15" value={values.q15} onChange={handleChange}>
          {['Very informed', 'Informed', 'Moderately informed', 'Slightly informed', 'Not informed'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        {touched.q15 && errors.q15 && <ErrorForm label={errors.q15} />}
      </SectionForm>
      
      <SectionForm>
        <LabelForm label='What are the main challenges you have faced when seeking digital service providers? (You may select more than one)'/>
        <FormGroup>
          {["High costs", "Lack of quality in work", "Long delivery times", "Poor communication", "Lack of customized solutions", "Other"].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q16" value={label} checked={values.q16.includes(label)} onChange={handleCheckboxChange} />}
              label={label}
              key={label}
            />
          ))}
        </FormGroup>
        {values.q16.some((item) => item.startsWith("Other")) && (
          <TextField id="q16Other" label="Please specify" value={values.q16Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        {touched.q16 && errors.q16 && <ErrorForm label={errors.q16} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='How willing would you be to consider a new company offering high-quality services at prices lower than the market average?'/>
        <RadioGroup name="q17" value={values.q17} onChange={handleChange}>
          {['Very willing', 'Willing', 'Moderately willing', 'Slightly willing', 'Not willing'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        <TextField
            id="q17Explain"
            multiline
            rows={2}
            maxRows={4}
            fullWidth
            label="Please explain the reasons for your willingness or reluctance:"
            margin='normal'
            value={values.q17Explain}
            onChange={handleQ17ExplainChange}
          />
        {touched.q17 && errors.q17 && <ErrorForm label={errors.q17} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='How important is it to you that your service provider uses custom solutions instead of templates?'/>
        <RadioGroup name="q18" value={values.q18} onChange={handleChange}>
          {['Very important', 'Important', 'Moderately important', 'Slightly important', 'Not important'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        {touched.q18 && errors.q18 && <ErrorForm label={errors.q18} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='Do you believe that template-based solutions have significant disadvantages for your business?'/>
        <RadioGroup row name="q19" value={values.q19} onChange={handleChange}>
          {['Yes', 'No'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        <TextField
            id="q19Explain"
            multiline
            rows={2}
            maxRows={4}
            fullWidth
            label="Please explain your perspective:"
            margin='normal'
            value={values.q19Explain}
            onChange={handleQ19ExplainChange}
          />
        {touched.q19 && errors.q19 && <ErrorForm label={errors.q19} />}
      </SectionForm>
    </>
  )
}
