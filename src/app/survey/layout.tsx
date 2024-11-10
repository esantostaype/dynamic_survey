import { HomeButton, Steps } from '@/components'

export default function SurveyLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <div className="flex items-start flex-1 gap-4 md:gap-16">
      <div className="flex-[0_0_40px] md:flex-[2] sticky top-8 md:top-12 xl:top-16">
        <Steps/>
      </div>
      <div className="flex-1 md:flex-[6]">
        { children }
      </div>
    </div>
    <HomeButton/>
    </>
  )
}