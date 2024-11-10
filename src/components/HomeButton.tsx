import Link from 'next/link'

export const HomeButton = () => {
  return (
    <Link className="bg-[rgba(255,255,255,0.2)] hover:bg-accent1 transition-all group rounded-full flex items-center justify-center fixed bottom-4 left-4 xl:left-auto xl:right-4 z-[999] size-12" href="/">
      <svg viewBox="0 0 32 32" width="20" className="fill-foreground group-hover:fill-background transition-all">
        <path d="M30.8,12.1L20.7,2c-2.6-2.6-6.8-2.6-9.4,0L1.2,12.1C.4,12.8,0,13.8,0,14.9v13.1C0,30.2,1.8,32,4,32h24c2.2,0,4-1.8,4-4v-13.1c0-1.1-.4-2.1-1.2-2.8ZM20,29.3h-8v-5.2c0-2.2,1.8-4,4-4s4,1.8,4,4v5.2ZM29.3,28c0,.7-.6,1.3-1.3,1.3h-5.3v-5.2c0-3.7-3-6.7-6.7-6.7s-6.7,3-6.7,6.7v5.2h-5.3c-.7,0-1.3-.6-1.3-1.3v-13.1c0-.4.1-.7.4-.9L13.2,3.8c1.6-1.6,4.1-1.6,5.7,0l10.1,10.1c.2.2.4.6.4.9v13.1Z"/>
      </svg>
    </Link>
  )
}