import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import type { Task } from "../api/taskApi";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  initialTask?: Task | null;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialTask,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    date: Dayjs | null;
  }>({
    title: "",
    description: "",
    date: null,
  });

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description,
        date: dayjs(initialTask.date),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: null,
      });
    }
  }, [initialTask, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleSubmit = () => {
    if (formData.title.trim() === "") {
      alert("Le titre est requis");
      return;
    }
    if (formData.description.trim() === "") {
      alert("La description est requise");
      return;
    }
    if (!formData.date) {
      alert("La date est requise");
      return;
    }
    onSubmit({
      ...formData,
      date: formData.date.format("YYYY-MM-DD"),
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      date: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            disabled={isLoading}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            disabled={isLoading}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              disabled={isLoading}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {initialTask ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
