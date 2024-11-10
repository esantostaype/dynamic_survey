'use client'
import { useRouter } from 'next-nprogress-bar'
import { BackButton, MainButton, Spinner, StepButtons } from '@/components'
import { Step6 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep6 } from '@/interfaces'
import { FormSchemaStep6 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


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
    const id = uuidv4()
    Cookies.set('surveyUUID', id, { expires: 7 })
    const step1Data = Cookies.get('Step1') ? JSON.parse(Cookies.get('Step1')!) : {}
    const step2Data = Cookies.get('Step2') ? JSON.parse(Cookies.get('Step2')!) : {}
    const step3Data = Cookies.get('Step3') ? JSON.parse(Cookies.get('Step3')!) : {}
    const step4Data = Cookies.get('Step4') ? JSON.parse(Cookies.get('Step4')!) : {}
    const step5Data = Cookies.get('Step5') ? JSON.parse(Cookies.get('Step5')!) : {}

    const allData = {
      id,
      ...step1Data,
      ...step2Data,
      ...step3Data,
      ...step4Data,
      ...step5Data,
      ...values
    }

    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( allData )
    })
    Cookies.remove('Step1')
    Cookies.remove('Step2')
    Cookies.remove('Step3')
    Cookies.remove('Step4')
    Cookies.remove('Step5')
    router.push('/success')
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