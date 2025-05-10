// Button component imports from shadcn/ui
import { Button } from '@/components/ui/button';
// Card component imports from shadcn/ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// Certification type import from types.ts to create the certification object
import { Certification } from '@/types/types';
// Table component imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// Label component imports from shadcn/ui
import { Label } from '@/components/ui/label';
// Input component imports from shadcn/ui
import { Input } from '@/components/ui/input';
// Dialog component imports from shadcn/ui
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
// Import useState from react
import { useState } from 'react';
// Import useMutation, useQueryClient and useQuery from react-query
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
// Import the addCertification, editCertification, deleteCertification and getCertifications functions from the api.ts file
import { addCertification, editCertification, deleteCertification, getCertifications } from '@/lib/api';
// Import toast options from lib
import { successToast, errorToast } from '@/lib/toast';

// EditDialogProps is the props for the EditDialog component
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: Certification;
  onEdit: (certification: Certification) => Promise<Certification>;
  currentCertification: string;
}

// EditDialog component
function EditDialog({
  isOpen,
  onOpenChange,
  item,
  onEdit,
  currentCertification,
}: EditDialogProps) {
  // Use state to create the editableCertification object and set the error state
  const [editableCertification, setEditableCertification] =
    useState<Certification>({
      _id: '',
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [error, setError] = useState<string | null>(null);

  // Handle the edit of the certification
  const handleEdit = async () => {
    // Try to edit the certification
    try {
      // If the title and dateAcquired are not empty, edit the certification
      if (editableCertification.title.trim() && editableCertification.dateAcquired.trim() !== '') {
        // Set the _id of the editableCertification to the _id of the item
        editableCertification._id = item._id;
        await onEdit(editableCertification);
        setEditableCertification({
          _id: '',
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        // Close the dialog
        onOpenChange(false);
      }
    } catch (err) {
      // Set the error to the error message
      setError(
        err instanceof Error ? err.message : 'Failed to edit certification'
      );
    }
  };

  // Return the EditDialog component
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

// AddDialogProps is the props for the AddDialog component
interface AddDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (certification: Certification) => Promise<Certification>;
}

// AddDialog component
function AddDialog({ isOpen, onOpenChange, onAdd }: AddDialogProps) {
  // Use state to create the addableCertification object and set the error state
  const [addableCertification, setAddableCertification] =
    useState<Certification>({
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [error, setError] = useState<string | null>(null);

  // Handle the add of the certification
  const handleAdd = async () => {
    // Try to add the certification
    try {
      // If the title and dateAcquired are not empty, add the certification
      if (addableCertification.title.trim() && addableCertification.dateAcquired.trim() !== '') {
        await onAdd(addableCertification);
        setAddableCertification({
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        // Close the dialog
        onOpenChange(false);
        // Set the error to null
        setError(null);
      }
    } catch (err) {
      // Set the error to the error message
      setError(
        err instanceof Error ? err.message : 'Failed to add certification'
      );
    }
  };

  // Return the AddDialog component
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

// CertificationRowProps is the props for the CertificationRow component
interface CertificationRowProps {
  item: Certification;
  onEdit: (certification: Certification) => Promise<Certification>;
  onDelete: (id: string) => Promise<void>;
}

// CertificationRow component
function CertificationRow({ item, onEdit, onDelete }: CertificationRowProps) {
  // Use state to create the isEditOpen state
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Return the CertificationRow component
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

// CertificationCardProps is the props for the CertificationCard component
interface CertificationCardProps {
  title: string;
}

// Main CertificationCard component
export function CertificationCard({
  title,
}: CertificationCardProps) {
  // Use state to create the isOpen state
  const [isOpen, setIsOpen] = useState(false);

  // Use the useQueryClient hook to create the queryClient
  const queryClient = useQueryClient();

  // Use the useQuery hook to get the certifications
  const { data: certifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  // Use the useMutation hook to add the certification
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

  // Use the useMutation hook to edit the certification
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

  // Use the useMutation hook to delete the certification
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

  // Return the CertificationCard component
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
