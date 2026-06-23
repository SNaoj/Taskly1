import { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCheckbox, IonFab, IonFabButton, IonIcon,
  IonSegment, IonSegmentButton, IonLabel, useIonViewWillEnter,
  IonButtons, IonButton
} from '@ionic/react';
import { add, menuOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';
import './Home.css';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<'pendientes' | 'completadas'>('pendientes');
  const [tasks, setTasks] = useState<Task[]>([]);
  const history = useHistory();

  const loadData = async () => {
    const data = await TaskService.getTasks();
    setTasks(data);
  };

  useIonViewWillEnter(() => {
    loadData();
  });

  const toggleComplete = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await TaskService.updateTask(updatedTask);
    await loadData();
  };

  const handleEdit = (id: string) => {
    history.push(`/edit/${id}`);
  };

  // Formatea YYYY-MM-DD a "DD MMM" en español (ej: "20 May")
  const formatDateHome = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10) - 1;
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${day} ${months[month]}`;
    }
    return dateStr;
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border home-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton className="header-menu-btn">
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="page-title ion-text-center">Taskly</IonTitle>
          <IonButtons slot="end">
            <IonButton className="header-menu-btn">
              <IonIcon icon={ellipsisVerticalOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar className="segment-toolbar">
          <IonSegment 
            value={filter} 
            onIonChange={e => setFilter(e.detail.value as any)}
            className="task-segment"
          >
            <IonSegmentButton value="pendientes" className="segment-btn">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="completadas" className="segment-btn">
              <IonLabel>Completadas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="custom-content home-content">
        <div className="task-list">
          {tasks
            .filter(t => filter === 'pendientes' ? !t.completed : t.completed)
            .map((task) => (
              <div 
                className="task-card" 
                key={task.id}
                onClick={() => handleEdit(task.id)}
              >
                <div 
                  className="task-checkbox-container"
                  onClick={e => e.stopPropagation()}
                >
                  <IonCheckbox 
                    checked={task.completed} 
                    onIonChange={() => toggleComplete(task)} 
                    className="task-checkbox"
                  />
                </div>
                
                <div className="task-details">
                  <span className={`task-title ${task.completed ? 'completed-title' : ''}`}>
                    {task.title}
                  </span>
                  <span className={`task-badge badge-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="task-actions-right">
                  <IonIcon 
                    icon={ellipsisVerticalOutline} 
                    className="task-options-icon-vertical" 
                  />
                  <span className="task-date-text">{formatDateHome(task.date)}</span>
                </div>
              </div>
            ))}
          
          {tasks.filter(t => filter === 'pendientes' ? !t.completed : t.completed).length === 0 && (
            <div className="empty-state">
              <p>No tienes tareas {filter} en este momento.</p>
            </div>
          )}
        </div>

        {/* FAB para agregar tarea, flotando encima de los elementos pero antes del tabbar */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="custom-fab-home">
          <IonFabButton onClick={() => history.push('/add')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;