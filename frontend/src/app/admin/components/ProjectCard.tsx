import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Project } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, addProject, editProject, deleteProject } from '@/lib/api';
import { PulseLoader } from 'react-spinners';
import { toast } from 'sonner';

// CertificationCardProps is the props for the CertificationCard component
interface ProjectCardProps {
  title: string;
}

export function ProjectCard({
  title,
}: ProjectCardProps) {
  // State variables for the component
  const [addableProject, setAddableProject] = useState<Project>({
    title: '',
    description: '',
    image: '',
    link: '',
  });
  const [editableProject, setEditableProject] = useState<Project>({
    _id: '',
    title: '',
    image: '',
    description: '',
    link: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<string>('');

  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const addProjectMutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success("Project added successfully", {
        description: "The project has been added to the database.",
        duration: 3000,
        position: "top-center",
        icon: "🚀",
        style: {
          background: "#000000",
          color: "#ffffff",
          border: "1px solid #1c1c1c",
          zIndex: 9999,
        },
      });
    },
  });

  const editProjectMutation = useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success("Project edited successfully", {
        description: "The project has been edited in the database.",
        duration: 3000,
        position: "top-center",
        icon: "🚀",
        style: {
          background: "#000000",
          color: "#ffffff",
          border: "1px solid #1c1c1c",
          zIndex: 9999,
        },
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success("Project deleted successfully", {
        description: "The project has been deleted from the database.",
        duration: 3000,
        position: "top-center",
        icon: "🚀",
        style: {
          background: "#000000",
          color: "#ffffff",
          border: "1px solid #1c1c1c",
          zIndex: 9999,
        },
      });
    },
  });
  
  // Handle adding a project
  const handleAddProject = async () => {
    try {
      if (addableProject.title.trim()) {
        await addProjectMutation.mutateAsync(addableProject);
        setAddableProject({
          title: '',
          image: '',
          description: '',
          link: '',
        });
        setIsOpen(false);
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add project'
      );
    }
  };

  // Handle editing a project
  const handleEditProject = async (project: Project) => {
    const id = project._id;
    try {
      if (editableProject.title.trim()) {
        const project = {
          _id: id,
          title: editableProject.title,
          image: editableProject.image,
          description: editableProject.description,
          link: editableProject.link,
        };
        await editProjectMutation.mutateAsync(project);
        setEditableProject({
          _id: '',
          title: '',
          image: '',
          description: '',
          link: '',
        });
        setIsEditOpen(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to edit project'
      );
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (id: string) => {
    await deleteProjectMutation.mutateAsync(id);
  };

  return (
    <Card className='h-fit'>
      {isLoading ? <PulseLoader color='#000000' /> : (
        <div>
          <CardHeader>
            <CardTitle className='text-xl'>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table for the skills */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((item: Project) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.image}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.link}</TableCell>
                    <TableCell className='flex gap-2'>
                      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={() => {setCurrentProject("'" + item.title + "'");}} className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                            <DialogDescription>
                              Edit the project: {currentProject} in the database.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='gap-4 py-4'>
                            <div className='flex flex-col gap-4'>
                              {Object.keys(item).map((key) => (
                                key !== '_id' && key !== '__v' && (
                                  <div className='flex flex-col gap-2' key={key}>
                                    <Label htmlFor={key} className='text-right'>
                                      {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </Label>
                                  <Input
                                    id={key}
                                    value={editableProject[key as keyof Project]}
                                    placeholder={item[key as keyof Project]}
                                    className='col-span-3'
                                    onChange={(e) =>
                                      setEditableProject({
                                        ...editableProject,
                                        [key]: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                )))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type='submit'
                              onClick={() => handleEditProject(item)}
                              className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        className='bg-red-900 text-white hover:bg-red-950 cursor-pointer'
                        onClick={() => handleDeleteProject(item._id || '')}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter className='flex justify-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                <DialogHeader>
                  <DialogTitle>Add Certification</DialogTitle>
                  <DialogDescription>
                    Add a new project to the database.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex flex-col gap-4'>
                    {Object.keys(addableProject).map((key) => (
                      <div className='flex flex-col gap-2' key={key}>
                        <Label htmlFor={key} className='text-right'>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <Input
                          id={key}
                          value={addableProject[key as keyof Project]}
                          className='col-span-3'
                          onChange={(e) =>
                            setAddableProject({
                              ...addableProject,
                              [key]: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  {error && <div className='text-red-500 text-sm'>{error}</div>}
                </div>
                <DialogFooter>
                  <Button
                    type='submit'
                    onClick={handleAddProject}
                    className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </div>
      )}
    </Card>
  );
}
