import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"; // Import icons for completed and not completed states
import { Task } from '../pages/Home'; // Adjust the import path as needed

interface TaskTableProps {
  tasks: Task[];
  token: string | null;
  onToggleCompletion: (taskId: string, completed: boolean) => void; // New prop for toggling completion
  onDelete: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, token, onToggleCompletion, onDelete }) => {
  
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.taskId}>
            <Td>{task.title}</Td>
            <Td>{task.description}</Td>
            <Td>
              <IconButton
                aria-label={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                icon={task.completed ? <CloseIcon /> : <CheckIcon />}
                colorScheme={task.completed ? "red" : "green"}
                onClick={() => onToggleCompletion(task.taskId, !task.completed)}
              />
            </Td>
            <Td>
              <Button colorScheme="red" ml={2} onClick={() => onDelete(task.taskId)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TaskTable;
