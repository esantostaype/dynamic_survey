'use client'
import { ReactNode } from 'react'
import { FormValuesStep6 } from '@/interfaces'
import { ErrorForm, LabelForm, SectionForm, TitleForm } from '@/components'
import { Checkbox, FormControlLabel, FormGroup, SelectChangeEvent, TextField } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  errors: FormikErrors<FormValuesStep6>
  touched: FormikTouched<FormValuesStep6>
  values: FormValuesStep6
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  setFieldValue: (field: string, value: unknown) => void
}

export const Step6 = ({ errors, touched, values, setFieldValue }: Props) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const currentValues = values[name as keyof FormValuesStep6] as unknown as string[]

    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value))
    } else {
      setFieldValue(name, [...currentValues, value])
    }
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q23Other", event.target.value)
  }
  const handleQ24Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q24", event.target.value)
  }

  return (
    <>
      <TitleForm title='Communication and Additional Information Channels' />      
      <SectionForm>
        <LabelForm label='Through which channels do you usually learn about digital service providers? (You may select more than one)'/>
        <FormGroup>
          {["Online searches (Google, Bing)", "Social media (LinkedIn, Facebook)", "Referrals from colleagues or partners", "Events and conferences", "Advertising in traditional media", "Other"].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q23" value={label} checked={values.q23.includes(label)} onChange={handleCheckboxChange} />}
              label={label}
              key={label}
            />
          ))}
        </FormGroup>
        {values.q23.some((item) => item.startsWith("Other")) && (
          <TextField id="q23Other" label="Please specify" value={values.q23Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        {touched.q23 && errors.q23 && <ErrorForm label={errors.q23} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='Do you have any comments or suggestions on how web development and branding companies could improve their services to better meet your needs?'/>
        <TextField
            id="q24"
            multiline
            rows={2}
            maxRows={4}
            fullWidth
            margin='normal'
            value={values.q24}
            onChange={handleQ24Change}
          />
        {touched.q24 && errors.q24 && <ErrorForm label={errors.q24} />}
      </SectionForm>
    </>
  )
}
