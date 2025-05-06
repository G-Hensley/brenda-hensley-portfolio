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

interface ProjectCardProps {
  title: string;
  data: Project[];
  addItem: (project: Project) => Promise<Project>;
  editItem: (project: Project) => Promise<Project>;
  deleteItem: (id: string) => Promise<void>;
}

export function ProjectCard({
  title,
  data,
  addItem,
  editItem,
  deleteItem,
}: ProjectCardProps) {
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
              <TableHead>Description</TableHead>
              <TableHead>Project Link</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.projectLink}</TableCell>
                <TableCell>{item.projectImage}</TableCell>
                <TableCell className='flex gap-2'>
                  <Button
                    className='bg-neutral-500 text-white hover:bg-neutral-600 cursor-pointer'
                    onClick={() => editItem(item)}>
                    Edit
                  </Button>
                  <Button
                    className='bg-red-800 text-white hover:bg-red-900 cursor-pointer'
                    onClick={() => deleteItem(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          className='bg-blue-800 text-white hover:bg-blue-900 cursor-pointer'
          onClick={() => addItem({} as Project)}>
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
