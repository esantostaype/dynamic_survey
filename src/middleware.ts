import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la URL es una de las páginas de pasos (step2 - step6)
  if (pathname.startsWith('/survey/step') && pathname !== '/survey/step1') {
    // Obtener el paso solicitado desde el pathname
    const step = pathname.split('/survey/step')[1]; // Extrae el número de paso

    // Obtener datos de las cookies de los pasos
    const step2 = request.cookies.get('Step2');
    const step3 = request.cookies.get('Step3');
    const step4 = request.cookies.get('Step4');
    const step5 = request.cookies.get('Step5');
    const step6 = request.cookies.get('Step6');

    // Crear un objeto para referencia
    const stepsData = { '2': step2, '3': step3, '4': step4, '5': step5, '6': step6 };

    // Si el paso actual no tiene datos, encontrar el último paso con datos para redirigir
    if (!(step in stepsData) || !stepsData[step as '2' | '3' | '4' | '5' | '6']) {
      let redirectUrl = '/survey/step1'; // Redirección por defecto si no hay datos

      // Verificar cada paso desde el último hacia el primero para encontrar datos en las cookies
      if (step6) {
        redirectUrl = '/survey/step6';
      } else if (step5) {
        redirectUrl = '/survey/step5';
      } else if (step4) {
        redirectUrl = '/survey/step4';
      } else if (step3) {
        redirectUrl = '/survey/step3';
      } else if (step2) {
        redirectUrl = '/survey/step2';
      }

      // Redirigir a la última página con datos si no estamos ya en esa página
      if (pathname !== redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    }
  }

  // Continuar con la solicitud si la URL es permitida
  return NextResponse.next();
}
