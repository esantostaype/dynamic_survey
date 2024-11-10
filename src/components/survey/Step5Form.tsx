'use client'
import { useRouter } from 'next-nprogress-bar'
import { BackButton, MainButton, Spinner, StepButtons } from '@/components'
import { Step5 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep5 } from '@/interfaces'
import { FormSchemaStep5 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const Step5Form = () => {

  const router = useRouter()

  const defaultInitialValues: FormValuesStep5 = {
    q20: '', q21: [], q21Other: '', q22: []
  }

  const [initialValues, setInitialValues] = useState<FormValuesStep5>(defaultInitialValues)

  useEffect(() => {
    const savedValues = Cookies.get('Step5')
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues) as FormValuesStep5
      setInitialValues(parsedValues)
    }
  }, [])

  const handleSubmit = async (values: FormValuesStep5) => {
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
    Cookies.set('Step5', JSON.stringify(values), { expires: 7 })
    router.push('/step6')
    toast.success("Data Saved!")
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchemaStep5} enableReinitialize>
      {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
        <Form>
          <Spinner isActive={ isSubmitting } />
          <Step5 errors={ errors } touched={ touched } values={ values } handleChange={ handleChange } setFieldValue={ setFieldValue } />
          <StepButtons>
            <BackButton label="Back" path='/step4' />
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}