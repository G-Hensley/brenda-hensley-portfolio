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
import { successToast, errorToast } from '@/lib/toast';

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
  const [currentProject, setCurrentProject] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [skillsInput, setSkillsInput] = useState<string>('');

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
      successToast('project', 'added');
    },
    onError: () => {
      errorToast('project', 'added');
    },
  });

  const editProjectMutation = useMutation({
    mutationFn: editProject,
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
  
  const handleAddProject = async () => {
    try {
      if (!addableProject.title.trim() || !file) {
        setError('Title and image are required');
        return;
      }
  
      // Upload file to S3
      const form = new FormData();
      form.append('file', file);
      const uploadRes = await fetch(`${baseUrl}/s3/projectImages`, {
        method: 'POST',
        body: form,
      });
      const { key, url } = await uploadRes.json();
  
      await addProjectMutation.mutateAsync({
        ...addableProject,
        fileKey: key,
        fileUrl: url,
        skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      });
  
      // Reset state
      setAddableProject({
        title: '',
        description: '',
        fileKey: '',
        fileUrl: '',
        skills: [],
        link: '',
      });
      setSkillsInput('');
      setFile(null);
      setIsOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project');
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
          fileUrl: editableProject.fileUrl,
          fileKey: editableProject.fileKey,
          skills: editableProject.skills,
          description: editableProject.description,
          link: editableProject.link,
        };
        await editProjectMutation.mutateAsync(project);
        setEditableProject({
          _id: '',
          title: '',
          fileUrl: '',
          fileKey: '',
          skills: [],
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
    try {
      await deleteProjectMutation.mutateAsync(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete project'
      );
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
                        <img
                          src={item.fileUrl}
                          alt={item.title}
                          className='w-24 h-auto rounded shadow'
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
                            onClick={() =>
                              setCurrentProject("'" + item.title + "'")
                            }
                            className='bg-neutral-800 text-white hover:bg-neutral-900'>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                            <DialogDescription>
                              Edit the project: {currentProject}
                            </DialogDescription>
                          </DialogHeader>
                          <div className='gap-4 py-4'>
                            <div className='flex flex-col gap-4'>
                              <Input
                                value={editableProject.title}
                                onChange={(e) =>
                                  setEditableProject({
                                    ...editableProject,
                                    title: e.target.value,
                                  })
                                }
                                placeholder='Title'
                              />
                              <Input
                                value={editableProject.description}
                                onChange={(e) =>
                                  setEditableProject({
                                    ...editableProject,
                                    description: e.target.value,
                                  })
                                }
                                placeholder='Description'
                              />
                              <Input
                                value={editableProject.link}
                                onChange={(e) =>
                                  setEditableProject({
                                    ...editableProject,
                                    link: e.target.value,
                                  })
                                }
                                placeholder='Link'
                              />
                              <Input
                                value={editableProject.skills.join(', ')}
                                onChange={(e) =>
                                  setEditableProject({
                                    ...editableProject,
                                    skills: e.target.value
                                      .split(',')
                                      .map((s) => s.trim()),
                                  })
                                }
                                placeholder='Comma-separated skills'
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type='submit'
                              onClick={() => handleEditProject(item)}
                              className='bg-blue-900 text-white hover:bg-blue-950'>
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        className='bg-red-900 text-white hover:bg-red-950'
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
                <Button className='bg-blue-900 text-white hover:bg-blue-950 mt-4'>
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <DialogDescription>
                    Upload an image and provide project details.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <Input
                    placeholder='Title'
                    value={addableProject.title}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder='Description'
                    value={addableProject.description}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder='Link'
                    value={addableProject.link}
                    onChange={(e) =>
                      setAddableProject({
                        ...addableProject,
                        link: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder='Comma-separated skills'
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  {error && <div className='text-red-500 text-sm'>{error}</div>}
                </div>
                <DialogFooter>
                  <Button
                    type='submit'
                    onClick={handleAddProject}
                    className='bg-blue-900 text-white hover:bg-blue-950'>
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
