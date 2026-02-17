import { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { taskApi } from './api/taskApi';
import type { Task } from './api/taskApi';
import { TaskForm } from './components/TaskForm';
import './App.css';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors du chargement des tâches';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setOpenForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  const handleFormSubmit = async (taskData: Omit<Task, 'id'>) => {
    setIsLoading(true);
    try {
      if (editingTask) {
        // Update existing task
        await taskApi.updateTask(editingTask.id!, taskData);
        setTasks(
          tasks.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task))
        );
        showSnackbar('Tâche modifiée avec succès', 'success');
      } else {
        // Create new task
        const newTask = await taskApi.createTask(taskData);
        setTasks([...tasks, newTask]);
        showSnackbar('Tâche créée avec succès', 'success');
      }
      setOpenForm(false);
      setEditingTask(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de l\'opération';
      showSnackbar(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setIsLoading(true);
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      showSnackbar('Tâche supprimée avec succès', 'success');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de la suppression';
      showSnackbar(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Ma To-Do List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
          disabled={isLoading}
        >
          Ajouter une tâche
        </Button>
      </Box>

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        isLoading={isLoading}
        error={error}
      />

      <TaskForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingTask(null);
        }}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
        isLoading={isLoading}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
