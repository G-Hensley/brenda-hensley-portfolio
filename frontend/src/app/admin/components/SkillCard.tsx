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

// SkillCardProps is the props for the SkillCard component
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
  // State variables for the component
  const [AddableSkillTitle, setAddableSkillTitle] = useState<string>('');
  const [EditableSkillTitle, setEditableSkillTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle adding a skill
  const handleAddSkill = async () => {
    try {
      if (AddableSkillTitle.trim()) {
        await addItem({ title: AddableSkillTitle });
        setAddableSkillTitle('');
        setIsOpen(false);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill');
    }
  };

  // Handle editing a skill
  const handleEditSkill = async (skill: Skill) => {
    const id = skill._id;
    try {
      if (EditableSkillTitle.trim()) {
        const skill = {
          _id: id,
          title: EditableSkillTitle,
        }
        await editItem(skill);
        setEditableSkillTitle('');
        setIsEditOpen(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit skill');
    }
  };

  // Handle deleting a skill
  const handleDeleteSkill = async (id: string) => {
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: Skill) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
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
                      <DialogTitle>Edit Skill</DialogTitle>
                      <DialogDescription>
                        Edit the skill in the database.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='title' className='text-right'>
                          Title
                        </Label>
                        <Input
                          id='title'
                          value={EditableSkillTitle}
                          className='col-span-3'
                          onChange={(e) => setEditableSkillTitle(e.target.value)}
                        />
                      </div>
                      {error && <div className='text-red-500 text-sm'>{error}</div>}
                    </div>
                    <DialogFooter>
                      <Button type='submit' onClick={() => handleEditSkill(item)} className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                  <Button
                    className='bg-red-900 text-white hover:bg-red-950 cursor-pointer'
                    onClick={() => handleDeleteSkill(item._id || '')}>
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
              className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
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
                  value={AddableSkillTitle}
                  className='col-span-3'
                  onChange={(e) => setAddableSkillTitle(e.target.value)}
                />
              </div>
              {error && <div className='text-red-500 text-sm'>{error}</div>}
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handleAddSkill} className='bg-blue-900 text-white hover:bg-blue-950 cursor-pointer'>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </CardFooter>

    </Card>
  );
}
