import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skill } from '@/types/types';
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

interface SkillCardProps {
  title: string;
  data: Skill[];
  addItem: (skill: Skill) => Promise<Skill>;
  editItem: (skill: Skill) => Promise<Skill>;
  deleteItem: (id: string) => Promise<void>;
}

export function SkillCard({
  title,
  data,
  addItem,
  editItem,
  deleteItem,
}: SkillCardProps) {
  const [skillTitle, setSkillTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSkill = async () => {
    try {
      if (skillTitle.trim()) {
        await addItem({ title: skillTitle });
        setSkillTitle('');
        setIsOpen(false);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill');
    }
  };

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: Skill) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell className='flex gap-2'>
                  <Button
                    className='bg-neutral-500 text-white hover:bg-neutral-600 cursor-pointer'
                    onClick={() => editItem(item)}>
                    Edit
                  </Button>
                  <Button
                    className='bg-red-800 text-white hover:bg-red-900 cursor-pointer'
                    onClick={() => deleteItem(item._id || '')}>
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
            <Button
              variant='outline'
              className='bg-blue-800 text-white hover:bg-blue-900 cursor-pointer'>
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
            <DialogHeader>
              <DialogTitle>Add Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to the database.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Title
                </Label>
                <Input
                  id='title'
                  value={skillTitle}
                  className='col-span-3'
                  onChange={(e) => setSkillTitle(e.target.value)}
                />
              </div>
              {error && <div className='text-red-500 text-sm'>{error}</div>}
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handleAddSkill}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
