import type { Metadata } from 'next'
import '@fontsource/ibm-plex-sans'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/oswald'
import './globals.css'
import { Providers } from './providers'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Survey to Understand the Digital Needs of Businesses",
  icons: {
    icon: '/images/iso.svg'
  }
}

export default function RootLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="relative z-30 flex flex-col min-h-screen gap-12 max-w-6xl mx-auto p-8 md:p-12 xl:p-16">
            { children }
          </main>
          <div className="z-20 fixed top-1/2 -translate-y-1/2 -left-12 h-screen w-1/2">
            <Image src="/images/iso.svg" alt="Dynamic Studio" width="960" height="1080" className="w-full h-screen object-cover object-right opacity-5" />
          </div>
          <div className="z-10 fixed -bottom-[640px] left-1/2 -translate-x-1/2 size-[1280px] bg-[#3700FF] blur-[240px] rounded-full opacity-20"></div>
        </Providers>
      </body>
    </html>
  )
}