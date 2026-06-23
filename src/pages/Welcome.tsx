import { IonContent, IonPage, IonButton } from '@ionic/react';
import './Welcome.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="welcome-page-content" scrollY={false}>
        <div className="welcome-container">
          
          {/* Ilustración */}
          <div className="illustration-wrapper">
            <img 
              src="/welcome_illustration.png" 
              alt="Taskly Illustration" 
              className="welcome-img" 
            />
          </div>

          {/* Textos de Bienvenida */}
          <div className="welcome-text-section">
            <h1 className="welcome-title">
              Bienvenido a <br />
              <span className="brand-highlight">Taskly</span>
            </h1>
            <p className="welcome-subtitle">
              Organiza tus tareas, cumple tus metas y sé más productivo cada día.
            </p>
          </div>

          {/* Botón de Comenzar */}
          <div className="welcome-action-section">
            <IonButton 
              routerLink="/tabs/home" 
              expand="block" 
              className="start-button-custom"
            >
              Comenzar
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;