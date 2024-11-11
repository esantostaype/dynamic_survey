import { Coupon } from '@/components'

export default function Home() {
  return (
    <section className="flex-1 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 relative z-30 text-lg">
        <h1 className="text-4xl md:text-6xl md:leading-tight mb-4 md:mb-8 font-bold bg-gradient-to-r to-accent1 from-accent2 bg-clip-text text-fill-transparent">Congratulations!</h1>
        <p>Congratulations on completing the survey! As a token of our appreciation, you’ve just earned a <strong className="text-xl bg-gradient-to-r to-accent1 from-accent2 bg-clip-text text-fill-transparent">25% discount</strong> on your next project with us. We’re thrilled to have your input, and we can’t wait to work with you!</p>
        {/* <p>If you have any questions or would like more information about Dynamic Studio, feel free to visit our website.</p> */}
        {/* <div className="mt-10">
          <BackHomeMain label='Back to Start' path='/'/>
        </div> */}
      </div>
      <div className="flex-[0_0_300px] flex justify-end">
        <Coupon/>
      </div>
    </section>
  )
}