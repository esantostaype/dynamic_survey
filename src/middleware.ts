import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  type RequestCookie = unknown
  const stepData: Record<string, RequestCookie | undefined> = {
    '1': request.cookies.get('Step1'),
    '2': request.cookies.get('Step2'),
    '3': request.cookies.get('Step3'),
    '4': request.cookies.get('Step4'),
    '5': request.cookies.get('Step5'),
    '6': request.cookies.get('Step6'),
  }

  // Determinar el paso más alto que tiene data
  let highestStepWithData = 1 // Por defecto, el paso 1 siempre tiene data
  for (let i = 2; i <= 6; i++) {
    if (stepData[i.toString()]) {
      highestStepWithData = i
    } else {
      break
    }
  }

  // Redirigir desde `/success` al paso más alto completado + 1 si faltan datos en algún paso
  if (pathname === '/success' && highestStepWithData < 6) {
    return NextResponse.redirect(new URL(`/step/${highestStepWithData + 1}`, request.url))
  }

  // Verificar que la ruta es un paso de la encuesta, pero no el primer paso
  if (pathname.startsWith('/step/') && pathname !== '/step/1') {
    const step = pathname.split('/step/')[1]
    const currentStep = parseInt(step)

    // Redirigir al siguiente paso no completado si el usuario intenta acceder a un paso sin completar
    if (currentStep > highestStepWithData + 1) {
      return NextResponse.redirect(new URL(`/step/${highestStepWithData + 1}`, request.url))
    }
  }
  
  return NextResponse.next()
}
