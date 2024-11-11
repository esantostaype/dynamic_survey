import { MainButtonLink } from '@/components'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

export default function Home() {
  return (
    <section className="flex-1 flex items-center">
    <div className="relative z-30">
      <h1 className="text-4xl mb-8 font-semibold">Survey to Understand the <span className="font-bold bg-gradient-to-r to-accent1 from-accent2 bg-clip-text text-fill-transparent">Digital Needs</span> of Businesses</h1>
      <p>Dear Participant,</p>
      <p>Dynamic Studio is a company dedicated to web development, web applications, branding, and graphic design, focused on providing custom digital solutions for small and medium-sized enterprises (SMEs) and corporations in Tennessee. We are conducting a market study to better understand the needs and preferences of businesses like yours, with the goal of offering services that truly add value.</p>
      <p>As a thank you for completing this survey, you will receive a <span className="font-bold bg-gradient-to-r to-accent1 from-accent2 bg-clip-text text-fill-transparent">25% discount</span> on your first project with us.</p>
      <p>Your participation is crucial to us. The information provided will be anonymous and used solely for research purposes. We sincerely appreciate your time and honesty in responding.</p>
      <h3 className="font-semibold text-xl mb-4 mt-8">Instructions:</h3>
      <ul className="flex flex-col gap-4 mb-8">
        <li className="flex gap-2 items-start"><CheckCircleRoundedIcon color="primary"/><p className="mb-0">Please answer the following questions as accurately as possible.</p></li>
        <li className="flex gap-2 items-start"><CheckCircleRoundedIcon color="primary"/><p className="mb-0">The survey will take approximately <strong>10-15 minutes.</strong></p></li>
        <li className="flex gap-2 items-start"><CheckCircleRoundedIcon color="primary"/><p className="mb-0">If any question does not apply to your situation, you may select the corresponding option or leave it blank.</p></li>
      </ul>
      <MainButtonLink label='Start Survey' path='/step/1'/>
    </div>
    </section>
  )
}