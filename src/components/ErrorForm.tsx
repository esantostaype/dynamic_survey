interface Props {
  label: string | string[]
}

export const ErrorForm = ({ label }: Props) => {
  return (
    <div className="text-red-500 text-sm mt-2">{ label }</div>
  )
}