import { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonLabel, IonInput, IonTextarea, IonIcon, 
  IonModal, IonDatetime, IonCheckbox, IonButton
} from '@ionic/react';
import { checkmark, calendarOutline, trashOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { TaskService } from '../services/TaskService';
import { Task } from '../models/Task';
import './EditTask.css';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [task, setTask] = useState<Task | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const allTasks = await TaskService.getTasks();
      const foundTask = allTasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description || '');
        setPriority(foundTask.priority);
        setDate(foundTask.date);
        setCompleted(foundTask.completed);
      } else {
        // Redirige al listado si la tarea no se encuentra
        history.replace('/tabs/home');
      }
    };
    fetchTask();
  }, [id, history]);

  const handleSave = async () => {
    if (!title.trim() || !task) return;

    await TaskService.updateTask({
      ...task,
      title,
      description,
      priority,
      date,
      completed
    });

    history.replace('/tabs/home');
  };

  const handleDelete = async () => {
    if (!task) return;
    await TaskService.deleteTask(task.id);
    history.replace('/tabs/home');
  };

  // Convierte YYYY-MM-DD a DD/MM/YYYY
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return 'Seleccionar fecha';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  if (!task) return null;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="form-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()} className="header-icon-btn">
              <IonIcon icon={arrowBackOutline} className="header-back-icon" />
            </IonButton>
          </IonButtons>
          <IonTitle className="page-title ion-text-center">Editar tarea</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} className="header-icon-btn">
              <IonIcon icon={checkmark} className="header-save-icon" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding custom-content">
        <div className="form-container">
          
          {/* Campo de Título */}
          <div className="form-group">
            <label className="form-label">Título</label>
            <div className="input-box">
              <IonInput
                placeholder="¿Qué tarea quieres editar?"
                value={title}
                onIonInput={e => setTitle(e.detail.value || '')}
                className="custom-input-field"
              />
            </div>
          </div>

          {/* Campo de Descripción */}
          <div className="form-group">
            <label className="form-label">Descripción (opcional)</label>
            <div className="input-box">
              <IonTextarea
                placeholder="Agrega más detalles..."
                rows={4}
                value={description}
                onIonInput={e => setDescription(e.detail.value || '')}
                className="custom-textarea-field"
              />
            </div>
          </div>

          {/* Selector de Prioridad */}
          <div className="form-group">
            <label className="form-label">Prioridad</label>
            <div className="priority-selector">
              <button
                type="button"
                className={`priority-btn btn-alta ${priority === 'Alta' ? 'active' : ''}`}
                onClick={() => setPriority('Alta')}
              >
                Alta
              </button>
              <button
                type="button"
                className={`priority-btn btn-media ${priority === 'Media' ? 'active' : ''}`}
                onClick={() => setPriority('Media')}
              >
                Media
              </button>
              <button
                type="button"
                className={`priority-btn btn-baja ${priority === 'Baja' ? 'active' : ''}`}
                onClick={() => setPriority('Baja')}
              >
                Baja
              </button>
            </div>
          </div>

          {/* Selector de Fecha */}
          <div className="form-group">
            <label className="form-label">Fecha límite</label>
            <div className="date-picker-box" onClick={() => setShowDatePicker(true)}>
              <span className="date-display-text">{formatDateForDisplay(date)}</span>
              <IonIcon icon={calendarOutline} className="calendar-icon-right" />
            </div>

            <IonModal isOpen={showDatePicker} onDidDismiss={() => setShowDatePicker(false)} className="date-picker-modal">
              <div className="datetime-modal-container">
                <IonDatetime
                  presentation="date"
                  value={date ? `${date}T12:00:00` : undefined}
                  onIonChange={e => {
                    if (e.detail.value) {
                      setDate((e.detail.value as string).split('T')[0]);
                    }
                  }}
                />
                <div className="datetime-modal-buttons">
                  <button type="button" className="datetime-modal-btn" onClick={() => setShowDatePicker(false)}>
                    Aceptar
                  </button>
                </div>
              </div>
            </IonModal>
          </div>

          {/* Estado de la Tarea */}
          <div className="form-group">
            <label className="form-label">Estado</label>
            <div className="status-checkbox-item" onClick={() => setCompleted(!completed)}>
              <IonCheckbox
                checked={completed}
                onIonChange={e => setCompleted(e.detail.checked)}
                onClick={e => e.stopPropagation()}
                className="status-checkbox"
              />
              <span className="status-label-text">Completada</span>
            </div>
          </div>

          {/* Botón de Eliminar */}
          <div className="delete-action-container">
            <button type="button" className="delete-task-outline-btn" onClick={handleDelete}>
              <IonIcon icon={trashOutline} className="delete-btn-icon" />
              <span>Eliminar tarea</span>
            </button>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditTask;
