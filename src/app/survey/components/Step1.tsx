'use client';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Autocomplete, FormControl, Radio, RadioGroup, SelectChangeEvent, TextField } from '@mui/material'
import { ErrorForm, LabelForm, SectionForm, TitleForm } from '@/components'
import { FormValuesStep1 } from '@/interfaces'
import { ReactNode } from 'react'
import { states } from '@/data'
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  errors: FormikErrors<FormValuesStep1>
  touched: FormikTouched<FormValuesStep1>
  values: FormValuesStep1
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  setFieldValue: (field: string, value: unknown) => void
}

export const Step1 = ({ errors, touched, values, handleChange, setFieldValue }: Props) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof FormValuesStep1] as unknown as string[]
    
    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value))
    } else {
      setFieldValue(name, [...currentValues, value])
    }
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q3City", event.target.value);
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q1Other", event.target.value);
  }
  return (
    <>
      <TitleForm title="General Company Information" />
      <SectionForm>
        <LabelForm label="Sector or industry in which your company operates:" />
        <FormGroup>
          {['Retail', 'Professional Services', 'Health and Wellness', 'Technology', 'Manufacturing', 'Education', 'Hospitality and Tourism', 'Other'].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q1" value={ label } checked={ values.q1.includes(label) } onChange={ handleCheckboxChange } />}
              label={ label }
              key={ label }
            />
          ))}
        </FormGroup>
        {values.q1.some((item) => item.startsWith("Other")) && (
          <TextField id="q1Other" label="Please specify" value={values.q1Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        { touched.q1 && errors.q1 && <ErrorForm label={ errors.q1 } />}
      </SectionForm>
      
      <SectionForm>
        <LabelForm label="Company size (number of employees):" />
        <RadioGroup name="q2" value={values.q2} onChange={handleChange}>
          {['1-10', '11-50', '51-200', '201-500', 'More than 500'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        {touched.q2 && errors.q2 && <ErrorForm label={errors.q2} />}
      </SectionForm>
      
      <SectionForm>
        <LabelForm label="Primary company location:" />
        <div className="flex md:flex-row flex-col gap-6 xl:gap-8">
          <FormControl fullWidth>
            <Autocomplete
              value={values.q3State}
              onChange={(event, newValue) => setFieldValue("q3State", newValue)}
              disablePortal
              options={states}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
            {touched.q3State && errors.q3State && <ErrorForm label={errors.q3State} />}
          </FormControl>
          <FormControl fullWidth>
            <TextField id="q3City" label="City" value={values.q3City} onChange={handleCityChange} />
            {touched.q3City && errors.q3City && <ErrorForm label={errors.q3City} />}
          </FormControl>
        </div>
      </SectionForm>
    </>
  );
};
