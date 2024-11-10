'use client'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { stepsData } from '@/data'
import Link from 'next/link'

export const Steps = () => {
  const pathname = usePathname()
  return (
    <ol className="relative border-s-2 border-gray-200 dark:border-gray-800">
      {stepsData.map((step, index) => {
        const isActive = pathname === step.path
        const isSuccess = !!Cookies.get(`Step${ index + 1 }`)
        return (
          <li className="mb-4 md:mb-8" key={index}>
            {
              isSuccess
              ?
              <Link href={ step.path } className="flex items-start gap-3 relative hover:text-accent1">
                <span
                  className={`-ml-[calc(1.25rem+2px)] flex-[0_0_2.5rem] flex items-center justify-center size-10 rounded-full ${ isActive ? "bg-background border border-accent1 text-accent1" : "bg-accent1 text-background" }`}
                >
                  {
                    isActive ? step.icon : <CheckRoundedIcon />
                  }
                  
                </span>
                <div className="hidden md:block">
                  <h3 className={`leading-tight mb-1 font-semibold ${isActive ? 'text-accent1' : ''}`}>
                    {step.title}
                  </h3>
                  <span className="text-gray-400 text-sm leading-tight block">{step.description}</span>
                </div>
              </Link>
              :
              <div className="flex items-start gap-3">
                <span
                  className={`-ml-[calc(1.25rem+2px)] flex-[0_0_2.5rem] flex items-center justify-center size-10 rounded-full ${
                    isActive ? 'bg-background text-accent1 border border-accent1' : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                >
                  {step.icon}
                </span>
                <div className="hidden md:block">
                  <h3 className={`leading-tight mb-1 font-semibold ${isActive ? 'text-accent1' : ''}`}>
                    {step.title}
                  </h3>
                  <span className="text-gray-400 text-sm leading-tight block">{step.description}</span>
                </div>
              </div>
            }
          </li>
        )
      })}
    </ol>
  )
}
