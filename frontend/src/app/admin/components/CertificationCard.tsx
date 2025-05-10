import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Certification } from '@/types/types';
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
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addCertification, editCertification, deleteCertification, getCertifications } from '@/lib/api';
// Import toast options from lib
import { successToast, errorToast } from '@/lib/toast';

// EditDialog component
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: Certification;
  onEdit: (certification: Certification) => Promise<Certification>;
  currentCertification: string;
}

function EditDialog({
  isOpen,
  onOpenChange,
  item,
  onEdit,
  currentCertification,
}: EditDialogProps) {
  const [editableCertification, setEditableCertification] =
    useState<Certification>({
      _id: '',
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    try {
      if (editableCertification.title.trim() && editableCertification.dateAcquired.trim() !== '') {
        editableCertification._id = item._id;
        await onEdit(editableCertification);
        setEditableCertification({
          _id: '',
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        onOpenChange(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to edit certification'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
        <DialogHeader>
          <DialogTitle>Edit Certification</DialogTitle>
          <DialogDescription>
            Edit the certification: {currentCertification} in the database.
          </DialogDescription>
        </DialogHeader>
        <div className='gap-4 py-4'>
          <div className='flex flex-col gap-4'>
            {Object.keys(item).map(
              (key) =>
                key !== '_id' &&
                key !== '__v' && (
                  <div className='flex flex-col gap-2' key={key}>
                    <Label htmlFor={key} className='text-right'>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    {
                      key === 'dateAcquired' ? (
                        <Input
                          id={key}
                          value={editableCertification[key as keyof Certification]}
                          className='col-span-3'
                          type='date'
                          onChange={(e) =>
                            setEditableCertification({
                              ...editableCertification,
                              [key]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Input
                      id={key}
                      value={editableCertification[key as keyof Certification]}
                      placeholder={ 
                        Array.isArray(item[key as keyof Certification])
                          ? (item[key as keyof Certification] as string[]).join(
                              ', '
                            )
                          : (item[key as keyof Certification] as string)
                      }
                      className='col-span-3'
                      onChange={(e) =>
                        setEditableCertification({
                          ...editableCertification,
                          [key]: e.target.value,
                        })
                      }
                    />
                      )
                    }
                  </div>
                )
            )}
          </div>
          {error && <div className='text-red-500 text-sm'>{error}</div>}
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleEdit}
            className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// AddDialog component
interface AddDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (certification: Certification) => Promise<Certification>;
}

function AddDialog({ isOpen, onOpenChange, onAdd }: AddDialogProps) {
  const [addableCertification, setAddableCertification] =
    useState<Certification>({
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    try {
      if (addableCertification.title.trim() && addableCertification.dateAcquired.trim() !== '') {
        await onAdd(addableCertification);
        setAddableCertification({
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        onOpenChange(false);
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add certification'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
        <DialogHeader>
          <DialogTitle>Add Certification</DialogTitle>
          <DialogDescription>
            Add a new certification to the database.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-4'>
            {Object.keys(addableCertification).map((key) => (
              <div className='flex flex-col gap-2' key={key}>
                <Label htmlFor={key} className='text-right'>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                {key !== "dateAcquired" ? (
                  <Input
                  id={key}
                  value={addableCertification[key as keyof Certification]}
                  className='col-span-3'
                  placeholder={
                    key === 'dateAcquired' ? 'Format: YYYY-MM-DD' : ''
                  }
                  onChange={(e) =>
                    setAddableCertification({
                      ...addableCertification,
                      [key]: e.target.value,
                    })
                  }
                />
                ) : (
                  <Input
                    id={key}
                    value={addableCertification[key as keyof Certification]}
                    className='col-span-3'
                    type='date'
                    onChange={(e) =>
                      setAddableCertification({
                        ...addableCertification,
                        [key]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}
          </div>
          {error && <div className='text-red-500 text-sm'>{error}</div>}
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleAdd}
            className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// CertificationRow component
interface CertificationRowProps {
  item: Certification;
  onEdit: (certification: Certification) => Promise<Certification>;
  onDelete: (id: string) => Promise<void>;
}

function CertificationRow({ item, onEdit, onDelete }: CertificationRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <TableRow key={item._id}>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.certImage}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.dateAcquired.split('T')[0]}</TableCell>
      <TableCell className='flex gap-2'>
        <EditDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          item={item}
          onEdit={onEdit}
          currentCertification={item.title}
        />
        <Button
          className='bg-red-900 text-white hover:bg-red-950 cursor-pointer'
          onClick={() => onDelete(item._id || '')}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Main CertificationCard component
interface CertificationCardProps {
  title: string;
}

export function CertificationCard({
  title,
}: CertificationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: certifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  const addCertificationMutation = useMutation({
    mutationFn: addCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('certification', 'added');
    },
    onError: () => {
      errorToast('certification', 'added');
    },
  });

  const editCertificationMutation = useMutation({
    mutationFn: editCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('certification', 'edited');
    },
    onError: () => {
      errorToast('certification', 'edited');
    },
  });

  const deleteCertificationMutation = useMutation({
    mutationFn: deleteCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('certification', 'deleted');
    },
    onError: () => {
      errorToast('certification', 'deleted');
    },
  });

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Certification Image</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date Acquired</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications?.map((item) => (
              <CertificationRow
                key={item._id}
                item={item}
                onEdit={editCertificationMutation.mutateAsync}
                onDelete={deleteCertificationMutation.mutateAsync}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <AddDialog isOpen={isOpen} onOpenChange={setIsOpen} onAdd={addCertificationMutation.mutateAsync} />
      </CardFooter>
    </Card>
  );
}
