interface TerminalCardProps {
  filename: string
  lines: string[]
}

export default function TerminalCard({ filename, lines }: TerminalCardProps) {
  return (
    <div className="bg-black border border-green-500 text-green-400 font-mono rounded-lg shadow-lg w-full max-w-2xl mx-auto my-6">
      <div className="flex items-center justify-between bg-green-800 px-4 py-2 rounded-t-lg text-white">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <span className="text-sm">{filename}</span>
      </div>
      <div className="px-4 py-3">
        {lines.map((line, idx) => (
          <p key={idx} className="leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
