'use client'
import { useRouter } from 'next-nprogress-bar'
import { useEffect, useState } from 'react'
import { MainButton, StepButtons } from '@/components'
import { Step1 } from '@/components'
import { Formik, Form } from 'formik'
import { FormValuesStep1 } from '@/interfaces'
import { FormSchemaStep1 } from '@/schema'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const Step1Form = () => {

  const router = useRouter()
  
  const defaultInitialValues: FormValuesStep1 = {
    q1: [], q2: '', q3State: '', q3City: ''
  }

  const [initialValues, setInitialValues] = useState<FormValuesStep1>(defaultInitialValues)

  useEffect(() => {
    const savedValues = Cookies.get('Step1')
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues) as FormValuesStep1
      setInitialValues(parsedValues)
    }
  }, [])

  const handleSubmit = async (values: FormValuesStep1) => {
    Cookies.set('Step1', JSON.stringify(values), { expires: 7 })
    router.push('/step/2')
    toast.success("Data Saved!")
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormSchemaStep1}
      enableReinitialize
    >
      {({ errors, touched, values, handleChange, setFieldValue }) => (
        <Form>
          <Step1
            errors={errors}
            touched={touched}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          <StepButtons>
            <div></div>
            <MainButton type="submit" label="Continue"/>
          </StepButtons>
        </Form>
      )}
    </Formik>
  )
}
