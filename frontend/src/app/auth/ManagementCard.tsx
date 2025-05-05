import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ManagementCard({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Skill Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Java</TableCell>
              <TableCell>Java is a programming language that is used to create software and applications.</TableCell>
              <TableCell className="flex gap-2">
                <Button className="bg-neutral-500 text-white hover:bg-neutral-600 cursor-pointer">Edit</Button>
                <Button className="bg-red-800 text-white hover:bg-red-900 cursor-pointer">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Python</TableCell>
              <TableCell>Python is a programming language that is used to create software and applications.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
