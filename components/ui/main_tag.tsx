interface MainTagProps {
  tag: string
}

export default function MainTag({ tag }: MainTagProps) {
  return (
     <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-black/10 text-black/60 hover:border-violet-400 hover:text-violet-600 transition-colors duration-200 cursor-default"
              >
                {tag}
              </span>
  )
}