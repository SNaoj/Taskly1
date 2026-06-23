# Taskly

Taskly es una aplicación móvil y web para la gestión de tareas, desarrollada con **Ionic React**, **Capacitor** y **Vite**.

## Características principales

- Interfaz moderna y responsiva construida con Ionic y React.
- Gestión de estado rápida y eficiente.
- Soporte para plataformas web y móviles (Android) gracias a Capacitor.
- Almacenamiento local persistente utilizando `@capacitor/preferences`.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- [npm](https://www.npmjs.com/) (generalmente se instala junto a Node.js).
- [Android Studio](https://developer.android.com/studio) (si deseas compilar y generar el APK para Android).
- SDK de Android (configurado a través de Android Studio).

## Instalación y ejecución local

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

3. **Ejecutar la aplicación en el navegador (modo desarrollo):**
   ```bash
   npm run dev
   ```
   Esto iniciará el servidor de desarrollo de Vite. Abre tu navegador en la URL que se indica (generalmente `http://localhost:5173`) para ver la aplicación.

## Generación de un APK (Android)

Para generar el archivo instalable de Android (`.apk`), sigue estos pasos:

1. **Construir el proyecto web:**
   Primero debes generar los archivos estáticos optimizados para producción.
   ```bash
   npm run build
   ```

2. **Sincronizar con Capacitor:**
   Sincroniza los archivos web construidos con el proyecto nativo de Android.
   ```bash
   npx cap sync android
   ```

3. **Abrir en Android Studio:**
   Abre el proyecto de Android generado en Android Studio.
   ```bash
   npx cap open android
   ```
   *(Alternativamente, puedes abrir Android Studio manualmente y seleccionar la carpeta `android` dentro de tu proyecto).*

4. **Construir el APK en Android Studio:**
   - Una vez que Android Studio termine de indexar y sincronizar Gradle, ve al menú superior.
   - Selecciona **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Espera a que termine la compilación.
   - Cuando finalice, aparecerá una notificación en la parte inferior derecha con un enlace que dice **locate** (localizar). Haz clic ahí para abrir la carpeta donde se generó el archivo `app-debug.apk`.

¡Listo! Puedes transferir este archivo `.apk` a tu dispositivo Android o emulador para instalar la aplicación.
