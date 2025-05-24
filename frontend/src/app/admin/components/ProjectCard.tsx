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
import {
  getProjects,
  addProjectWithImage,
  editProjectWithImage,
  deleteProject,
  uploadImageToS3,
} from '@/lib/api';
import { PulseLoader } from 'react-spinners';
import { successToast, errorToast } from '@/lib/toast';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { InputFile } from '@/components/ui/input-file';

// ProjectCardProps is the props for the ProjectCard component
interface ProjectCardProps {
  title: string;
}

export function ProjectCard({ title }: ProjectCardProps) {
  // State variables for the component
  const [addableProject, setAddableProject] = useState<Project>({
    title: '',
    description: '',
    fileUrl: '',
    fileKey: '',
    skills: [],
    link: '',
  });
  const [editableProject, setEditableProject] = useState<Project>({
    _id: '',
    title: '',
    fileUrl: '',
    fileKey: '',
    skills: [],
    description: '',
    link: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [skillsInput, setSkillsInput] = useState<string>('');

  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const addProjectMutation = useMutation({
    mutationFn: addProjectWithImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      successToast('project', 'added');
    },
    onError: () => {
      errorToast('project', 'added');
    },
  });

  const editProjectMutation = useMutation({
    mutationFn: editProjectWithImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      successToast('project', 'edited');
    },
    onError: () => {
      errorToast('project', 'edited');
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      successToast('project', 'deleted');
    },
    onError: () => {
      errorToast('project', 'deleted');
    },
  });

  // Handle adding a project
  const handleAddProject = async () => {
    if (!addableProject.title.trim() || !file) {
      setError('Title and image are required');
      return;
    }

    try {
      await uploadImageToS3('projects', file);

      await addProjectMutation.mutateAsync({
        title: addableProject.title,
        description: addableProject.description,
        link: addableProject.link,
        skills: skillsInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        file: file,
      });

      // Reset state
      setAddableProject({
        title: '',
        description: '',
        link: '',
        skills: [],
        fileKey: '',
        fileUrl: '',
      });
      setSkillsInput('');
      setFile(null);
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project');
    }
  };

  // Handle editing a project
  const handleEditProject = async (project: Project) => {
    setEditableProject(project);
    if (!project.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const updated = { ...editableProject };

      // Optional file upload for edit
      if (file) {
        await uploadImageToS3('projects', file);
      }

      await editProjectMutation.mutateAsync(
        updated as Partial<Omit<Project, 'fileUrl' | 'fileKey'>> & {
          _id: string;
          file?: File | undefined;
          fileKey?: string | undefined;
          fileUrl?: string | undefined;
        }
      );

      // Reset
      setEditableProject({
        _id: '',
        title: '',
        description: '',
        link: '',
        skills: [],
        fileKey: '',
        fileUrl: '',
      });
      setFile(null);
      setIsEditOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit project');
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProjectMutation.mutateAsync(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  return (
    <Card className='h-fit'>
      {isLoading ? (
        <PulseLoader color='#000000' />
      ) : (
        <div>
          <CardHeader>
            <CardTitle className='text-xl'>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((item: Project) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {item.fileUrl && (
                        <Image
                          src={item.fileUrl}
                          alt={item.title}
                          width={96}
                          height={96}
                          className='rounded shadow'
                        />
                      )}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.link}</TableCell>
                    <TableCell>{item.skills.join(', ')}</TableCell>
                    <TableCell className='flex gap-2'>
                      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button
                            className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                            <DialogDescription>
                              Edit the project: {item.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-2 py-4'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                              id='title'
                              placeholder={item.title}
                              value={editableProject.title}
                              onChange={(e) =>
                                setEditableProject({
                                  ...editableProject,
                                  title: e.target.value,
                                })
                              }
                            />
                            <Label htmlFor='description'>Description</Label>
                            <Input
                              id='description'
                              placeholder={item.description}
                              value={editableProject.description}
                              onChange={(e) =>
                                setEditableProject({
                                  ...editableProject,
                                  description: e.target.value,
                                })
                              }
                            />
                            <Label htmlFor='link'>Link</Label>
                            <Input
                              id='link'
                              placeholder={item.link}
                              value={editableProject.link}
                              onChange={(e) =>
                                setEditableProject({
                                  ...editableProject,
                                  link: e.target.value,
                                })
                              }
                            />
                            <Label htmlFor='skills'>Skills (comma-separated)</Label>
                            <Input
                              id='skills'
                              placeholder={item.skills.join(', ')}
                              value={editableProject.skills.join(', ')}
                              onChange={(e) =>
                                setEditableProject({
                                  ...editableProject,
                                  skills: e.target.value.split(',').map((s) => s.trim()),
                                })
                              }
                            />
                            <Label htmlFor='file'>Image</Label>
                            <InputFile
                              id='file'
                              accept='image/*'
                              onChange={(file) => setFile(file)}
                            />
                            {error && <div className='text-red-500 text-sm'>{error}</div>}
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
                <Button className='bg-blue-900 text-white hover:bg-blue-950 mt-4 cursor-pointer'>
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <DialogDescription>
                    Upload an image and provide project details.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-2 py-4'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    placeholder='Title'
                    value={addableProject.title}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        title: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor='description'>Description</Label>
                  <Input
                    id='description'
                    placeholder='Description'
                    value={addableProject.description}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        description: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor='link'>Link</Label>
                  <Input
                    id='link'
                    placeholder='Link'
                    value={addableProject.link}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        link: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor='skills'>Skills (comma-separated)</Label>
                  <Input
                    id='skills'
                    placeholder='Comma-separated skills'
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                  <Label htmlFor='file'>Image</Label>
                  <InputFile
                    id='file'
                    accept='image/*'
                    onChange={(file) => setFile(file)}
                  />
                  {error && <div className='text-red-500 text-sm'>{error}</div>}
                </div>
                <DialogFooter>
                  <Button
                    type='submit'
                    onClick={handleAddProject}
                    className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                    Save
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
