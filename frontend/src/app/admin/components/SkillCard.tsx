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
// Skill type import from types.ts to create the skill object
import { Skill } from '@/types/types';
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
import { useState } from 'react';

// SkillCardProps is the props for the SkillCard component
interface SkillCardProps {
  title: string;
  data: Skill[];
  addItem: (skill: Skill) => Promise<Skill>;
  editItem: (skill: Skill) => Promise<Skill>;
  deleteItem: (id: string) => Promise<void>;
}

// SkillCard component
export function SkillCard({
  title,
  data,
  addItem,
  editItem,
  deleteItem,
}: SkillCardProps) {

  // State variables for the component
  // AddableSkillTitle is the title of the skill to be added
  const [AddableSkillTitle, setAddableSkillTitle] = useState<string>('');

  // EditableSkillTitle is the title of the skill to be edited
  const [EditableSkillTitle, setEditableSkillTitle] = useState<string>('');

  // isOpen is the state variable for the add skill dialog
  const [isOpen, setIsOpen] = useState(false);

  // isEditOpen is the state variable for the edit skill dialog
  const [isEditOpen, setIsEditOpen] = useState(false);

  // error is the state variable for the error message
  const [error, setError] = useState<string | null>(null);

  // currentSkill is the state variable for the current skill
  const [currentSkill, setCurrentSkill] = useState<string>('');

  // Handle adding a skill
  const handleAddSkill = async () => {
    // Try adding the skill
    try {
      // If the title is not empty, add the skill
      if (AddableSkillTitle.trim()) {
        await addItem({ title: AddableSkillTitle });
        // Clear the addable skill title
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
    // Get the id of the skill
    const id = skill._id;
    // Try editing the skill
    try {
      // If the title is not empty, edit the skill
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
    // Try deleting the skill
    try {
      await deleteItem(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill');
    }
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
                      onClick={() => setCurrentSkill(item.title)}
                      className='bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer'>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px] bg-neutral-900 text-white'>
                    <DialogHeader>
                      <DialogTitle>Edit Skill</DialogTitle>
                      <DialogDescription>
                        {`Edit the skill: "${currentSkill}" in the database.`}
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
                          placeholder={currentSkill}
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
