<div align="center">
  <h1>📱 Taskly</h1>
  <p><i>Tu aplicación definitiva para la gestión de tareas, rápida, moderna y eficiente.</i></p>
</div>

---

Taskly es una aplicación móvil y web diseñada para ayudarte a gestionar tu día a día, desarrollada con el poder de **Ionic React ⚛️**, **Capacitor ⚡** y **Vite 🚀**.

## ✨ Características principales

- 🎨 **Diseño Moderno:** Interfaz intuitiva y responsiva construida con Ionic y React.
- ⚡ **Alto Rendimiento:** Gestión de estado rápida y eficiente para una experiencia fluida.
- 📱 **Multiplataforma:** Soporte nativo para web y dispositivos móviles (Android) gracias a Capacitor.
- 💾 **Persistencia de Datos:** Almacenamiento local seguro y persistente utilizando `@capacitor/preferences`.

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado por el siguiente equipo:

- 🧑‍💻 **Gerlyn Rentería Orozco** - [grenteriao@poligran.edu.co](mailto:grenteriao@poligran.edu.co)
- 🧑‍💻 **Juan Esteban Acero Nuñez** - [jesacero@poligran.edu.co](mailto:jesacero@poligran.edu.co)
- 🧑‍💻 **Bryant David Bohorquez Caro** - [bbohorquez@poligran.edu.co](mailto:bbohorquez@poligran.edu.co)
- 🧑‍💻 **Joan Steven Guio Ramirez** - [jguio@poligran.edu.co](mailto:jguio@poligran.edu.co)

---

## 🛠️ Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu entorno de desarrollo antes de empezar:

- 🟢 [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- 📦 [npm](https://www.npmjs.com/) (generalmente se instala junto a Node.js).
- 🤖 [Android Studio](https://developer.android.com/studio) (si deseas compilar y generar el APK para Android).
- ⚙️ **SDK de Android** (configurado a través de Android Studio).

## 🚀 Instalación y ejecución local

Sigue estos pasos para clonar el repositorio y ejecutar la aplicación en tu entorno de desarrollo local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/SNaoj/Taskly1.git
   cd Taskly1/Taskly1
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   ```
   > 🌐 Esto iniciará el servidor de desarrollo de Vite. Abre tu navegador en la URL que se indica (generalmente `http://localhost:5173`) para ver la aplicación en acción.

## 📦 Generación de un APK (Android)

Para generar el archivo instalable de Android (`.apk`), sigue estos pasos con atención:

1. **Construir el proyecto web:**
   Genera los archivos estáticos optimizados para producción.
   ```bash
   npm run build
   ```

2. **Sincronizar con Capacitor:**
   Sincroniza los archivos web construidos con el proyecto nativo de Android.
   ```bash
   npx cap sync android
   ```

3. **Abrir en Android Studio:**
   Abre el proyecto de Android generado directamente en Android Studio.
   ```bash
   npx cap open android
   ```
   *(💡 Alternativamente, puedes abrir Android Studio manualmente y seleccionar la carpeta `android` dentro de tu proyecto).*

4. **Construir el APK en Android Studio:**
   - Una vez que Android Studio termine de indexar y sincronizar Gradle, ve al menú superior.
   - Selecciona **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Espera a que termine la compilación ⏳.
   - Cuando finalice, aparecerá una notificación en la parte inferior derecha con un enlace que dice **locate** (localizar). Haz clic ahí para abrir la carpeta donde se generó el archivo `app-debug.apk`.

🎉 **¡Listo!** Puedes transferir este archivo `.apk` a tu dispositivo Android o emulador para instalar la aplicación y empezar a usar Taskly.
