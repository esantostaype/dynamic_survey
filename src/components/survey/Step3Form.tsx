'use client'
import { useRouter } from 'next-nprogress-bar'
import { BackButton, MainButton, StepButtons } from '@/components'
import { Step3 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep3 } from '@/interfaces'
import { FormSchemaStep3 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const Step3Form = () => {

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
    Cookies.set('Step3', JSON.stringify(values), { expires: 7 })
    router.push('/step/4')    
    toast.success("Data Saved!")
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchemaStep3} enableReinitialize>
      {({ errors, touched, values, handleChange, setFieldValue }) => (
        <Form>
          <Step3 errors={ errors } touched={ touched } values={ values } handleChange={ handleChange } setFieldValue={ setFieldValue } />
          <StepButtons>
            <BackButton label="Back" path='/step/2' />
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}
