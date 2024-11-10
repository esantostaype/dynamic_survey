'use client'
import { useRouter } from 'next-nprogress-bar'
import { BackButton, MainButton, StepButtons } from '@/components'
import { Step4 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep4 } from '@/interfaces'
import { FormSchemaStep4 } from '@/schema'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const Step4Form = () => {

  const router = useRouter()

  const defaultInitialValues: FormValuesStep4 = {
    q15: '', q16: [], q16Other: '', q17: '', q17Explain: '', q18: '', q19: '', q19Explain: ''
  }

  const [initialValues, setInitialValues] = useState<FormValuesStep4>(defaultInitialValues)

  useEffect(() => {
    const savedValues = Cookies.get('Step4')
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues) as FormValuesStep4
      setInitialValues(parsedValues)
    }
  }, [])

  const handleSubmit = async (values: FormValuesStep4) => {
    Cookies.set('Step4', JSON.stringify(values), { expires: 7 })
    router.push('/step/5')
    toast.success("Data Saved!")
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchemaStep4} enableReinitialize>
      {({ errors, touched, values, handleChange, setFieldValue }) => (
        <Form>
          <Step4 errors={ errors } touched={ touched } values={ values } handleChange={ handleChange } setFieldValue={ setFieldValue } />
          <StepButtons>
            <BackButton label="Back" path='/step/3' />
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}