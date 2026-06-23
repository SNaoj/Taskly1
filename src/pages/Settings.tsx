import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonIcon, IonAvatar, IonList, useIonViewWillEnter, IonToggle
} from '@ionic/react';
import { 
  personOutline, 
  statsChartOutline, 
  notificationsOutline, 
  colorPaletteOutline, 
  informationCircleOutline,
  checkmarkCircle,
  hourglass
} from 'ionicons/icons';
import { TaskService } from '../services/TaskService';
import { Task } from '../models/Task';
import './Settings.css';

const Settings: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [notifications, setNotifications] = useState(true);

  useIonViewWillEnter(() => {
    const calculateStats = async () => {
      const tasks = await TaskService.getTasks();
      const completed = tasks.filter(t => t.completed).length;
      const pending = tasks.length - completed;
      setStats({
        total: tasks.length,
        completed,
        pending
      });
    };
    calculateStats();
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="page-title ion-padding-start">Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="custom-content settings-content">
        {/* Perfil del Usuario */}
        <div className="profile-card">
          <IonAvatar className="profile-avatar">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" alt="Avatar" />
          </IonAvatar>
          <div className="profile-info">
            <h2>Usuario Taskly</h2>
            <p>usuario@taskly.com</p>
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div className="section-title">Progreso de Tareas</div>
        <div className="stats-grid">
          <div className="stat-card">
            <IonIcon icon={statsChartOutline} className="stat-icon total" />
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Creadas</div>
          </div>
          <div className="stat-card">
            <IonIcon icon={checkmarkCircle} className="stat-icon completed" />
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completadas</div>
          </div>
          <div className="stat-card">
            <IonIcon icon={hourglass} className="stat-icon pending" />
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pendientes</div>
          </div>
        </div>

        {/* Listado de Opciones */}
        <div className="section-title">Preferencias</div>
        <IonList lines="none" className="settings-list">
          <IonItem className="settings-item">
            <IonIcon icon={notificationsOutline} slot="start" className="option-icon" />
            <IonLabel>Notificaciones diarias</IonLabel>
            <IonToggle checked={notifications} onIonChange={e => setNotifications(e.detail.checked)} slot="end" />
          </IonItem>
          
          <IonItem className="settings-item">
            <IonIcon icon={colorPaletteOutline} slot="start" className="option-icon" />
            <IonLabel>Tema de la app</IonLabel>
            <span className="option-value" slot="end">Violeta premium</span>
          </IonItem>

          <IonItem className="settings-item">
            <IonIcon icon={personOutline} slot="start" className="option-icon" />
            <IonLabel>Editar perfil</IonLabel>
          </IonItem>
          
          <IonItem className="settings-item">
            <IonIcon icon={informationCircleOutline} slot="start" className="option-icon" />
            <IonLabel>Acerca de Taskly</IonLabel>
            <span className="option-value" slot="end">v1.0.0</span>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
