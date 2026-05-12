FRX - Global Tactical Interface es un visualizador de mapas mundiales interactivo basado en la estética de terminales de inteligencia clásica y radares tácticos. Desarrollado con D3.js, el sistema permite la exploración geopolítica mediante un entorno inmersivo de "hacker" neón sobre fondo negro.

- Características Principales
Mapa Mundi Interactivo: Motor basado en SVG con proyección Mercator y detección de colisiones de datos.

Zoom Táctico: Sistema de navegación fluido que se centra y escala automáticamente al seleccionar un objetivo (país).

Base de Datos Intel (Global): Información detallada de +150 sectores, incluyendo:

Capitales.

Población estimada (M).

Informes de inteligencia (Datos curiosos tecnológicos e históricos).

HUD Animado: Líneas de conexión dinámicas que vinculan el terreno con la interfaz de datos en tiempo real.

Estética CRT Retro: Filtros de líneas de escaneo (scanlines), parpadeo (flicker) de monitor antiguo y cursor de terminal parpadeante.

Totalmente Responsive: Optimizado para pantallas de escritorio de alta resolución y dispositivos móviles táctiles.

- Stack Tecnológico
HTML5 / CSS3: Estructura y efectos visuales (animaciones, gradientes y filtros CRT).

JavaScript (ES6+): Lógica de control y gestión de datos.

D3.js: Motor de visualización de datos geográficos y manipulación de SVG.

GeoJSON: Fuente de datos cartográficos de alta fidelidad.

- Instalación y Despliegue
Para ejecutar este sistema en tu terminal local:

Clona el repositorio:

Bash
git clone https://github.com/TU_USUARIO/FRX-Global-Tactical-Interface.git
Estructura de archivos:
Asegúrate de mantener la siguiente jerarquía:

Plaintext
├── index.html
├── style.css
├── script.js
└── FRX big green.png  <-- Tu logo personalizado
Ejecución:
Debido a las políticas de seguridad de los navegadores (CORS) para cargar archivos GeoJSON externos, se recomienda abrir el proyecto mediante un servidor local:

Usa la extensión "Live Server" en VS Code.

O mediante Python: python -m http.server 8000.

- Interfaz de Usuario (UI)
Top Bar: Muestra el logo del sistema FRX y el estado del vínculo satelital.

Grid Layer: Cuadrícula de referencia táctica para posicionamiento.

Intelligence Popup: Cuadro de datos que aparece tras la animación de la línea de conexión.

- Base de Datos de Inteligencia
El sistema cuenta con un objeto intelDB en script.js que contiene informes tácticos de la mayoría de los países. En caso de acceder a un sector sin datos registrados, el protocolo de emergencia genera un ID de nodo aleatorio y bloquea la información por "permisos restringidos", manteniendo la inmersión.

📜 Licencia
Este proyecto está bajo la Licencia MIT. Siéntete libre de hackearlo, modificarlo y desplegarlo.

FRX SYSTEM ADVISORY: Conexión segura. El acceso no autorizado a sectores restringidos está bajo monitorización constante.
