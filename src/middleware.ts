import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/step') && pathname !== '/step1') {
    const step = pathname.split('/step')[1]
    const step2 = request.cookies.get('Step2')
    const step3 = request.cookies.get('Step3')
    const step4 = request.cookies.get('Step4')
    const step5 = request.cookies.get('Step5')
    const step6 = request.cookies.get('Step6')
    const stepsData = { '2': step2, '3': step3, '4': step4, '5': step5, '6': step6 }
    const currentStep = parseInt(step)
    const currentData = stepsData[step as '2' | '3' | '4' | '5' | '6']
    const previousStepData = currentStep > 2 ? stepsData[(currentStep - 1).toString() as '2' | '3' | '4' | '5'] : true
    if (!currentData && !previousStepData) {
      let redirectUrl = '/step1'

      if (step6) {
        redirectUrl = '/step6'
      } else if (step5) {
        redirectUrl = '/step5'
      } else if (step4) {
        redirectUrl = '/step4'
      } else if (step3) {
        redirectUrl = '/step3'
      } else if (step2) {
        redirectUrl = '/step2'
      }

      if (pathname !== redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      }
    }
  }
  return NextResponse.next()
}
