export const StepButtons = ({ children } : Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="mt-12 flex flex-wrap gap-2 justify-between">
      { children }
    </div>
  )
}