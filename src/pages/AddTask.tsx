import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonLabel, IonInput, IonTextarea, IonIcon, 
  IonModal, IonDatetime, IonToggle, IonButton
} from '@ionic/react';
import { checkmark, calendarOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { TaskService } from '../services/TaskService';
import './AddTask.css';

const AddTask: React.FC = () => {
  const history = useHistory();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminder, setReminder] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;

    await TaskService.saveTask({
      id: Date.now().toString(),
      title,
      description,
      priority,
      date,
      completed: false
    });
    
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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="form-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()} className="header-icon-btn">
              <IonIcon icon={arrowBackOutline} className="header-back-icon" />
            </IonButton>
          </IonButtons>
          <IonTitle className="page-title ion-text-center">Nueva tarea</IonTitle>
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
                placeholder="¿Qué tarea quieres agregar?"
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

          {/* Recordatorio */}
          <div className="form-group reminder-group-custom">
            <div className="reminder-item-custom">
              <span className="reminder-label-text">Recordatorio</span>
              <IonToggle
                checked={reminder}
                onIonChange={e => setReminder(e.detail.checked)}
                slot="end"
                className="custom-toggle"
              />
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddTask;