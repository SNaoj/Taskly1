import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { checkboxOutline, addCircleOutline, settingsOutline } from 'ionicons/icons';

// Importación de las pantallas (Páginas)
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Welcome from './pages/Welcome';
import EditTask from './pages/EditTask';
import Settings from './pages/Settings';

/* Estilos de Core CSS requeridos por Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Estilos personalizados globales */
import './theme/variables.css';

setupIonicReact();

/**
 * Componente de las rutas con barra de pestañas (Home + Settings)
 * Este componente vive DENTRO del IonReactRouter, por lo que
 * IonTabs puede funcionar correctamente.
 */
const TabsLayout: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/home">
        <Home />
      </Route>
      <Route exact path="/tabs/settings">
        <Settings />
      </Route>
      <Route exact path="/tabs">
        <Redirect to="/tabs/home" />
      </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom" className="custom-tabbar">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={checkboxOutline} />
        <IonLabel>Tareas</IonLabel>
      </IonTabButton>
      <IonTabButton tab="add" href="/add">
        <IonIcon icon={addCircleOutline} />
        <IonLabel>Agregar</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={settingsOutline} />
        <IonLabel>Ajustes</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

/**
 * App principal: el IonRouterOutlet exterior maneja rutas SIN tabbar
 * (Welcome, AddTask, EditTask) y la ruta /tabs/* que muestra el TabsLayout.
 */
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        {/* Pantalla de bienvenida - SIN tabbar */}
        <Route exact path="/">
          <Welcome />
        </Route>

        {/* Formulario agregar - SIN tabbar */}
        <Route exact path="/add">
          <AddTask />
        </Route>

        {/* Formulario editar - SIN tabbar */}
        <Route exact path="/edit/:id">
          <EditTask />
        </Route>

        {/* Sección con tabbar (Home y Settings) */}
        <Route path="/tabs">
          <TabsLayout />
        </Route>

        {/* Redirección de /home a /tabs/home por compatibilidad */}
        <Route exact path="/home">
          <Redirect to="/tabs/home" />
        </Route>

        {/* Ruta fallback */}
        <Route>
          <Redirect to="/" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;