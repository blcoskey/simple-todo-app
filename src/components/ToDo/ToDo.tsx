import { useState } from 'react';
import { Button, Checkbox, Group, Input, Text } from '@mantine/core';
import { Todo } from '@/types/types';

interface TodoProps {
  todo: Todo;
  updateTodo: (newTodoDetails: Todo) => void;
  onDelete?: () => void;
  isNew?: boolean;
}

export const TodoComponent = ({ todo, updateTodo, onDelete, isNew }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Group
      style={{
        backgroundColor: todo.completed ? '#41A67E' : '#E5C95F',
        padding: '10px',
        borderRadius: '5px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isNew && isHovered && (
        <Button color="red" onClick={onDelete}>
          Delete
        </Button>
      )}
      {isEditing ? (
        <Input
          value={todo.title}
          onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Text c={todo.completed ? 'white' : 'black'} onClick={() => setIsEditing(true)}>
          {todo.title}
        </Text>
      )}
      <Checkbox
        checked={todo.completed}
        onClick={() => updateTodo({ ...todo, completed: !todo.completed })}
      />
    </Group>
  );
};
