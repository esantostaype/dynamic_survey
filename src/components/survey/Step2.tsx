'use client'
import { FormValuesStep2 } from '@/interfaces'
import { ErrorForm, LabelForm, SectionForm, TitleForm } from '@/components'
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SelectChangeEvent, TextField } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { ReactNode } from 'react'

interface Props {
  errors: FormikErrors<FormValuesStep2>
  touched: FormikTouched<FormValuesStep2>
  values: FormValuesStep2
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  setFieldValue: (field: string, value: unknown) => void
}

export const Step2 = ({ errors, touched, values, handleChange, setFieldValue }: Props) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof FormValuesStep2] as unknown as string[]
    
    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value))
    } else {
      setFieldValue(name, [...currentValues, value])
    }
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q6Other", event.target.value);
  }

  return (
    <>
      <TitleForm title="Current Digital Presence" />
      <SectionForm>
        <LabelForm label="Does your company have a website?"/>
        <RadioGroup row name="q4" value={ values.q4 } onChange={ handleChange }>
          {["Yes", "No"].map(( label ) => (
            <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
          ))}
        </RadioGroup>
        { touched.q4 && errors.q4 && <ErrorForm label={ errors.q4 } />}
      </SectionForm>
      <SectionForm>
        <LabelForm label="5. How satisfied are you with your current website?"/>
        <RadioGroup name="q5" value={ values.q5 } onChange={ handleChange }>
          {["Very satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very unsatisfied"].map(( label ) => (
            <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
          ))}
        </RadioGroup>
        { touched.q5 && errors.q5 && <ErrorForm label={ errors.q5 } />}
      </SectionForm>
      <SectionForm>
        <LabelForm label="What aspects of your website are you dissatisfied with? (You may select more than one)"/>
        <FormGroup>
          {["Outdated design", "Limited functionalities", "Not responsive (not mobile-friendly)", "Difficult to update content", "Slow loading speed", "Other"].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q6" value={ label } checked={ values.q6.includes(label) } onChange={ handleCheckboxChange } />}
              label={label}
              key={label}
            />
          ))}
        </FormGroup>
        {values.q6.some((item) => item.startsWith("Other")) && (
          <TextField id="q6Other" label="Please specify" value={values.q6Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        { touched.q6 && errors.q6 && <ErrorForm label={ errors.q6 } />}
      </SectionForm>
      <SectionForm>
        <LabelForm label="Does your company use web or mobile applications to interact with customers or manage internal operations?"/>
        <RadioGroup row name="q7" value={ values.q7 } onChange={ handleChange }>
          {["Yes", "No", "It is in our future plans"].map(( label ) => (
            <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
          ))}
        </RadioGroup>
        { touched.q7 && errors.q7 && <ErrorForm label={ errors.q7 } />}
      </SectionForm>
      <SectionForm>
        <LabelForm label="Do you have established branding and graphic design strategies (logo, visual identity, promotional materials, etc.)?"/>
        <RadioGroup row name="q8" value={ values.q8 } onChange={ handleChange }>
          {["Yes", "Partially", "No"].map(( label ) => (
            <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
          ))}
        </RadioGroup>
        { touched.q8 && errors.q8 && <ErrorForm label={ errors.q8 } />}
      </SectionForm>
    </>
  )
}