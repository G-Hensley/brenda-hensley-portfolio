import { Project } from "@/types/types";
import Image from "next/image";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-black/50 pb-4 rounded-xl border border-neutral-800 shadow-lg flex flex-col items-center text-white w-72
      hover:scale-105 transition-all duration-300 justify-between gap-4 h-fit hover:bg-red-900/30">
        <Image src={project.fileUrl} alt={project.title} width={350} height={200} className="rounded-t-xl" />
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="flex flex-row gap-2">
          {project.skills.map((skill) => (
            <p key={skill}>{skill}</p>
          ))}
        </div>
        <p>{project.link}</p>
    </div>
  )
}
