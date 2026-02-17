import React from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from '../api/taskApi';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  isLoading = false,
  error,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color="textSecondary" align="center">
          Aucune tâche pour le moment. Ajoutez-en une!
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          component={Card}
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <CardContent sx={{ width: '100%', pb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                width: '100%',
              }}
            >
              <Box sx={{ flex: 1, pr: 2 }}>
                <Typography variant="h6" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {task.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={new Date(task.date).toLocaleDateString('fr-FR')}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </Box>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEdit(task)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    if (
                      window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')
                    ) {
                      onDelete(task.id!);
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Box>
          </CardContent>
        </ListItem>
      ))}
    </List>
  );
};
