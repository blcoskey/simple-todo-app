import { useState } from 'react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Todo } from '@/types/types';
import { TodoComponent } from '../ToDo/ToDo';
import classes from './Welcome.module.css';

export function Welcome() {
  const [todos, setTodos] = useLocalStorage<Todo[]>({
    key: 'todos',
    defaultValue: [],
  });

  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    completed: false,
    createdAt: new Date(),
    id: crypto.randomUUID(),
  });

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);

    setNewTodo({
      title: 'A new thing to do!',
      completed: false,
      createdAt: new Date(),
      id: crypto.randomUUID(),
    });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Todo
      </Title>
      <Stack align="center" justify="center" mt={20}>
        <Button color="red" variant="light" onClick={deleteAll}>
          Delete All
        </Button>
        <Group>
          <TodoComponent isNew todo={newTodo} updateTodo={setNewTodo} />
          <Button onClick={() => addTodo(newTodo)}>Save</Button>
        </Group>
        <Group justify="flex-start" align="flex-start" mt={50}>
          <Stack>
            <Text>Todo</Text>
            {todos
              .filter((x) => !x.completed)
              .map((todo) => (
                <TodoComponent
                  key={todo.id}
                  todo={todo}
                  updateTodo={updateTodo}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))}
          </Stack>
          <Stack>
            <Text>Done!</Text>
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <TodoComponent
                  key={todo.id}
                  todo={todo}
                  updateTodo={updateTodo}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))}
          </Stack>
        </Group>
      </Stack>
    </>
  );
}
