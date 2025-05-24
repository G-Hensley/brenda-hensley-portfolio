import { Project } from "@/types/types";
import Image from "next/image";
import { Share_Tech_Mono, Electrolize } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export default function ProjectCard({ project }: { project: Project }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black/30 pb-4 rounded-xl border border-neutral-800 shadow-lg flex flex-col items-center text-green-600
      hover:scale-105 transition-all duration-300 justify-between gap-4 h-fit hover:bg-green-950/30 w-fit hover:shadow-sm hover:shadow-green-500/50
      relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Image src={project.fileUrl} alt={project.title} width={350} height={200} className="rounded-t-xl" />
        <h1 className={`text-2xl font-bold ${electrolize.className}`}>{project.title}</h1>
        <p className={`text-md ${shareTechMono.className}`}>{project.description}</p>
        <div className="flex flex-row gap-4">
          {project.skills.map((skill) => (
            <p key={skill} className={`text-md ${shareTechMono.className} border border-neutral-800 bg-neutral-900/60 rounded-xl px-4 
            py-1 uppercase text-red-500 text-glow`}
          >
            {skill}
          </p>
          ))}
        </div>
        {isHovered && (
          <div className="absolute w-full h-full flex items-center justify-center bg-black/90 rounded-xl">
            <Link href={project.link} className="text-md text-green-600 z-30 bg-green-950/90 rounded-xl px-4 py-2
            hover:text-green-500 hover:scale-105 transition-all duration-300 hover:shadow-sm hover:text-glow">View Project</Link>
          </div>
        )}
    </div>
  )
}
