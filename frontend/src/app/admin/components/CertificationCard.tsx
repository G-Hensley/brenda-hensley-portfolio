import Image from 'next/image';
// Button component imports from shadcn/ui
import { Button } from '@/components/ui/button';
// InputFile component imports from components
import { InputFile } from '@/components/ui/input-file';
// Card component imports from shadcn/ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// Certification type import
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
// Label component imports
import { Label } from '@/components/ui/label';
// Input component imports
import { Input } from '@/components/ui/input';
// Dialog component imports
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
import {
  getCertifications,
  addCertification,
  editCertification,
  deleteCertification,
} from '@/lib/api';
import { successToast, errorToast } from '@/lib/toast';

// --- Add Dialog ---
interface AddDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    cert: Omit<Certification, '_id' | 'fileKey' | 'fileUrl'> & { file: File }
  ) => Promise<Certification>;
}
function AddDialog({ isOpen, onOpenChange, onAdd }: AddDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [dateAcquired, setDateAcquired] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!title || !dateAcquired || !file) {
      setError('Title, date acquired and image are required');
      return;
    }
    try {
      await onAdd({
        title,
        description: description.split(',').map((s) => s.trim()),
        dateAcquired,
        file,
      });
      setTitle('');
      setDescription('');
      setDateAcquired('');
      setFile(null);
      setError(null);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add certification'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer mx-auto'>Add Certification</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg bg-neutral-900 text-white'>
        <DialogHeader>
          <DialogTitle>Add Certification</DialogTitle>
          <DialogDescription>
            Provide details and upload an image.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='cert-title'>Title</Label>
            <Input
              id='cert-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='cert-description'>
              Description (comma-separated)
            </Label>
            <Input
              id='cert-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='cert-date'>Date Acquired</Label>
            <Input
              id='cert-date'
              type='date'
              value={dateAcquired}
              onChange={(e) => setDateAcquired(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='cert-file'>Certification Image</Label>
            <InputFile
              id='cert-file'
              accept='image/*'
              onChange={(file) => setFile(file)}
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <DialogFooter>
          <Button className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer' onClick={handleAdd}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Edit Dialog ---
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certification: Certification;
  onEdit: (
    cert: Partial<Certification> & { _id: string; file?: File }
  ) => Promise<Certification>;
}
function EditDialog({
  isOpen,
  onOpenChange,
  certification,
  onEdit,
}: EditDialogProps) {

  // --- State Variables ---
  const [title, setTitle] = useState(certification.title);
  const [description, setDescription] = useState<string>(
    certification.description.join(', ')
  );
  const [dateAcquired, setDateAcquired] = useState(
    certification.dateAcquired.split('T')[0]
  );
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Edit Certification ---
  const handleEdit = async () => {
    if (!title || !dateAcquired) {
      setError('Title and date are required');
      return;
    }
    try {
      await onEdit({
        _id: certification._id!,
        title,
        description: description.split(',').map((s) => s.trim()),
        dateAcquired,
        ...(file ? { file } : {}),
      });
      setError(null);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to edit certification'
      );
    }
  };

  // --- Render ---
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg bg-neutral-900 text-white'>
        <DialogHeader>
          <DialogTitle>Edit Certification</DialogTitle>
          <DialogDescription>
            Edit details or upload new image.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Description (comma-separated)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Date Acquired</Label>
            <Input
              type='date'
              value={dateAcquired}
              onChange={(e) => setDateAcquired(e.target.value)}
            />
          </div>
          <div>
            <Label>Replace Image (optional)</Label>
            <InputFile accept='image/*' onChange={(f) => setFile(f)} />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <DialogFooter>
          <Button className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer' onClick={handleEdit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Certification Row ---
interface CertificationRowProps {
  certification: Certification;
  onEdit: (
    cert: Partial<Certification> & { _id: string; file?: File }
  ) => Promise<Certification>;
  onDelete: (id: string) => Promise<void>;
}
function CertificationRow({
  certification,
  onEdit,
  onDelete,
}: CertificationRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <TableRow key={certification._id}>
      <TableCell>{certification.title}</TableCell>
      <TableCell>
        {certification.fileUrl && (
          <Image
            src={certification.fileUrl}
            alt={certification.title}
            width={96}
            height={96}
            className='w-24 h-auto'
          />
        )}
      </TableCell>
      <TableCell>{certification.description.join(', ')}</TableCell>
      <TableCell>{certification.dateAcquired.split('T')[0]}</TableCell>
      <TableCell className='flex gap-2'>
        <EditDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          certification={certification}
          onEdit={onEdit}
        />
        <Button
          onClick={() => onDelete(certification._id!)}
          className='bg-red-900 text-white hover:bg-red-950 cursor-pointer'>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

// --- Main CertificationCard ---
interface CertificationCardProps {
  title: string;
}
export function CertificationCard({ title }: CertificationCardProps) {
  const queryClient = useQueryClient();

  const { data: certifications = [] } = useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  const addMutation = useMutation<
    Certification,
    Error,
    Omit<Certification, '_id' | 'fileKey' | 'fileUrl'> & { file: File }
  >({
    mutationFn: addCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('Certification', 'added');
    },
    onError: () => errorToast('Certification', 'added'),
  });

  const editMutation = useMutation<
    Certification,
    Error,
    Partial<Certification> & { _id: string; file?: File }
  >({
    mutationFn: editCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('Certification', 'updated');
    },
    onError: () => errorToast('Certification', 'updated'),
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      successToast('Certification', 'deleted');
    },
    onError: () => errorToast('Certification', 'deleted'),
  });

  const [isAddOpen, setIsAddOpen] = useState(false);

  // --- Render ---
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => (
              <CertificationRow
                key={cert._id}
                certification={cert}
                onEdit={editMutation.mutateAsync}
                onDelete={deleteMutation.mutateAsync}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <AddDialog
          isOpen={isAddOpen}
          onOpenChange={setIsAddOpen}
          onAdd={addMutation.mutateAsync}
        />
      </CardFooter>
    </Card>
  );
}
