import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/success') {
    const surveyUUID = request.cookies.get('surveyUUID')
    if (!surveyUUID) {
      return NextResponse.redirect(new URL('/step/1', request.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/step/1') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/step/')) {
    const currentStep = parseInt(pathname.split('/step/')[1])
    
    if (isNaN(currentStep) || currentStep < 2 || currentStep > 6) {
      return NextResponse.redirect(new URL('/step/1', request.url))
    }

    const step1Data = request.cookies.get('Step1')
    if (!step1Data) {
      return NextResponse.redirect(new URL('/step/1', request.url))
    }

    const previousStepData = request.cookies.get(`Step${currentStep - 1}`)
    
    if (!previousStepData) {
      let lastCompletedStep = 1
      for (let i = currentStep - 1; i >= 2; i--) {
        const stepData = request.cookies.get(`Step${i}`)
        if (stepData) {
          lastCompletedStep = i
          break
        }
      }
      const redirectStep = lastCompletedStep === 1 ? 2 : lastCompletedStep + 1
      return NextResponse.redirect(new URL(`/step/${redirectStep}`, request.url))
    }
  }

  return NextResponse.next()
}