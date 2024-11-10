'use client'
import { useRouter } from 'next-nprogress-bar'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

interface Props {
  label: string
  path: string
}

export const MainButtonLink = ({ label, path }: Props) => {
  const router = useRouter()
  return (
      <button
        onClick={() => router.push(`${ path }`)}
        className='flex items-center gap-2 md:text-lg text-background py-3 px-8 uppercase group rounded-[4rem] font-bold bg-gradient-to-r to-accent1 from-accent2'
      >
        { label }
        <div className='relative group-hover:ml-2 group-hover:-mr-2 transition-all'>
          <ArrowForwardRoundedIcon/>
        </div>
      </button>
  );
}