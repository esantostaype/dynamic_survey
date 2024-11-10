import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

interface Props {
  type?: "button" | "submit" | "reset" | undefined
  label: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const MainButton = ({ label, onClick, type="button" }: Props) => {
  return (
      <button
        type={ type }
        onClick={ onClick }
        className='max-w-[188px] flex items-center gap-2 md:text-lg text-background py-2 md:py-3 px-4 pr-3 md:px-8 uppercase group rounded-[4rem] font-bold bg-gradient-to-r to-accent1 from-accent2'
      >
        { label }
        <div className='relative group-hover:ml-2 group-hover:-mr-2 transition-all'>
          <ArrowForwardRoundedIcon/>
        </div>
      </button>
  );
}