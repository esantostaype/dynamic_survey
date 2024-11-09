'use client'
import { useRouter } from 'next/navigation'
import { BackButton, MainButton, Spinner, StepButtons } from '@/components'
import { Step3 } from '../components'
import { Formik, Form } from 'formik'
import { FormValuesStep3 } from '@/interfaces'
import { FormSchemaStep3 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


export default function Step3Page() {

  const router = useRouter()

  const defaultInitialValues: FormValuesStep3 = {
    q9: '', q10: [], q10Other: '', q11: [], q12: '', q12Explain: '', q13: '', q14: '', q14Explain: ''
  }

  const [initialValues, setInitialValues] = useState<FormValuesStep3>(defaultInitialValues)

  useEffect(() => {
    const savedValues = Cookies.get('Step3')
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues) as FormValuesStep3
      setInitialValues(parsedValues)
    }
  }, [])

  const handleSubmit = async (values: FormValuesStep3) => {
    const surveyUUID = Cookies.get('surveyUUID')
    const surveyData = {
      id: surveyUUID,
      updates: values,
    }
    await fetch('/api/survey', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( surveyData ),
    })
    Cookies.set('Step3', JSON.stringify(values), { expires: 7 })
    router.push('/survey/step4')
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchemaStep3} enableReinitialize>
      {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
        <Form>
          <Spinner isActive={ isSubmitting } />
          <Step3 errors={ errors } touched={ touched } values={ values } handleChange={ handleChange } setFieldValue={ setFieldValue } />
          <StepButtons>
            <BackButton label="Back" path='/survey/step2' />
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}
