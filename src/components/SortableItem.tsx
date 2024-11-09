'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  id: string
  index: number
  label: string
}

export const SortableItem = ({ id, index, label }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group"
    >
      <div className={`group-hover:text-accent1 transition-all flex items-center gap-3 cursor-move py-2 px-3 -mx-2 rounded ${ isDragging ? "shadow-[0px_16px_24px_0px_rgba(0,_0,_0,_0.4)] bg-[rgba(255,255,255,0.1)] text-accent1": "" }`}>
        <span className="font-bold">{index + 1}</span>
        {label}
      </div>
    </li>
  )
}
