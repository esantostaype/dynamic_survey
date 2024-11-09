'use client'
import Link from 'next/link'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

interface Props {
  label: string
  path: string
}

export const BackButton = ({ label, path }: Props) => {
  return (
      <Link
        href={ path }
        className='max-w-[74px] text-sm md:text-base flex items-center gap-2 text-accent1 uppercase group font-bold py-2 md:py-3 transition-all'
      >
        <div className='relative group-hover:mr-2 group-hover:-ml-2 transition-all'>
          <ArrowBackRoundedIcon/>
        </div>
        { label }
      </Link>
  );
}