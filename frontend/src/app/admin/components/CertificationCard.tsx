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

// CertificationCardProps is the props for the CertificationCard component
interface CertificationCardProps {
  title: string;
  data: Certification[];
  addItem: (certification: Certification) => Promise<Certification>;
  editItem: (certification: Certification) => Promise<Certification>;
  deleteItem: (id: string) => Promise<void>;
}

export function CertificationCard({
  title,
  data,
  addItem,
  editItem,
  deleteItem,
}: CertificationCardProps) {
  // State variables for the component
  const [addableCertification, setAddableCertification] =
    useState<Certification>({
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [editableCertification, setEditableCertification] =
    useState<Certification>({
      _id: '',
      title: '',
      certImage: '',
      description: [],
      dateAcquired: '',
    });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle adding a certification
  const handleAddCertification = async () => {
    try {
      if (addableCertification.title.trim()) {
        await addItem(addableCertification);
        setAddableCertification({
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        setIsOpen(false);
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add certification'
      );
    }
  };

  // Handle editing a certification
  const handleEditCertification = async (certification: Certification) => {
    const id = certification._id;
    try {
      if (editableCertification.title.trim()) {
        const certification = {
          _id: id,
          title: editableCertification.title,
          certImage: editableCertification.certImage,
          description: editableCertification.description,
          dateAcquired: editableCertification.dateAcquired,
        };
        await editItem(certification);
        setEditableCertification({
          _id: '',
          title: '',
          certImage: '',
          description: [],
          dateAcquired: '',
        });
        setIsEditOpen(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to edit certification'
      );
    }
  };

  // Handle deleting a certification
  const handleDeleteCertification = async (id: string) => {
    await deleteItem(id);
  };

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table for the skills */}
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
            {data.map((item: Certification) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.certImage}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.dateAcquired}</TableCell>
                <TableCell className='flex gap-2'>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                      <DialogHeader>
                        <DialogTitle>Edit Certification</DialogTitle>
                        <DialogDescription>
                          Edit the certification in the database.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          {Object.keys(item).map((key) => (
                            <div key={key}>
                              <Label htmlFor={key} className='text-right'>
                                {key}
                              </Label>
                              <Input
                                id={key}
                                value={item[key as keyof Certification]}
                                className='col-span-3'
                                onChange={(e) =>
                                  setEditableCertification({
                                    ...editableCertification,
                                    [key]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type='submit'
                          onClick={() => handleEditCertification(item)}
                          className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className='bg-red-900 text-white hover:bg-red-950 cursor-pointer'
                    onClick={() => handleDeleteCertification(item._id || '')}>
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
                    <Input
                      id={key}
                      value={addableCertification[key as keyof Certification]}
                      className='col-span-3'
                      onChange={(e) =>
                        setAddableCertification({
                          ...addableCertification,
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
                onClick={handleAddCertification}
                className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
