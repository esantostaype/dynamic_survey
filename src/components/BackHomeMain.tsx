'use client'
import { useRouter } from 'next-nprogress-bar'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

interface Props {
  label: string
  path: string
}

export const BackHomeMain = ({ label, path }: Props) => {
  const router = useRouter()
  return (
      <button
        onClick={() => router.push(`${ path }`)}
        className='flex items-center gap-2 md:text-lg text-accent1 py-3 px-8 uppercase group rounded-[4rem] font-bold border-2 border-accent1'
      >
        <div className='relative group-hover:mr-2 group-hover:-ml-2 transition-all'>
          <ArrowBackRoundedIcon/>
        </div>
        { label }
      </button>
  );
}