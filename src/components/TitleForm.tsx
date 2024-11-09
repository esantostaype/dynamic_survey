interface Props {
  title: string
}

export const TitleForm = ({ title }: Props) => {
  return (
    <h2 className="text-3xl md:text-4xl mb-8 font-semibold leading-none">{ title }</h2>
  )
}