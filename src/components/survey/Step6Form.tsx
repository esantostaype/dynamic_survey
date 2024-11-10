'use client'
import { useRouter } from 'next-nprogress-bar'
import { BackButton, MainButton, Spinner, StepButtons } from '@/components'
import { Step6 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep6 } from '@/interfaces'
import { FormSchemaStep6 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const Step6Form = () => {

  const router = useRouter()

  const defaultInitialValues: FormValuesStep6 = {
    q23: [], q23Other: '', q24: ''
  }

  const [initialValues, setInitialValues] = useState<FormValuesStep6>(defaultInitialValues)

  useEffect(() => {
    const savedValues = Cookies.get('Step6')
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues) as FormValuesStep6
      setInitialValues(parsedValues)
    }
  }, [])

  const handleSubmit = async (values: FormValuesStep6) => {
    const surveyUUID = Cookies.get('surveyUUID')
    const surveyData = {
      id: surveyUUID,
      updates: values,
    }
    await fetch('/api', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( surveyData ),
    })
    Cookies.set('Step6', JSON.stringify(values), { expires: 7 })
    router.push('/survey/finish')
    toast.success("Data Saved!")
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchemaStep6} enableReinitialize>
      {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
        <Form>
          <Spinner isActive={ isSubmitting } />
          <Step6 errors={ errors } touched={ touched } values={ values } handleChange={ handleChange } setFieldValue={ setFieldValue } />
          <StepButtons>
            <BackButton label="Back" path='/step5' />
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}