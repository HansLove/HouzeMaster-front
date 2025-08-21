# HouzeMaster - Propiedades Excepcionales en México

Un sistema inmobiliario de lujo y minimalista construido con Next.js que lee datos dinámicamente desde Google Sheets, diseñado para ofrecer una experiencia sensual y elegante.

## 🌟 **Características Destacadas**

- **Diseño Sensual y Minimalista**: Interfaz elegante con paleta de colores rosa y dorado
- **Datos Dinámicos**: Lee propiedades desde Google Sheets en tiempo real
- **Sistema de Leads Bilingüe**: Captura de leads en español e inglés
- **Filtros Inteligentes**: Búsqueda avanzada con interfaz intuitiva
- **Diseño Responsivo**: Adaptable a todos los dispositivos
- **Páginas de Detalles**: Información completa de cada propiedad
- **Manejo de Estados**: Carga, errores y estados vacíos manejados elegantemente
- **TypeScript**: Código tipado y robusto

## 🎨 **Paleta de Colores Sensual**

- **Primary**: Rosa vibrante (#ec4899) para elementos principales
- **Secondary**: Azul elegante (#64748b) para elementos secundarios
- **Accent**: Dorado (#eab308) para destacados y badges
- **Neutral**: Grises sofisticados para texto y fondos

## 🛠️ **Tecnologías**

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático y robusto
- **Tailwind CSS** - Framework de CSS con clases personalizadas
- **React Icons** - Iconografía elegante
- **PapaParse** - Parsing de CSV para Google Sheets
- **Axios** - Cliente HTTP para APIs

## 📊 **Fuente de Datos**

El proyecto lee datos desde una hoja de cálculo de Google Sheets que contiene información detallada de propiedades inmobiliarias:

- Información básica (título, descripción, precio)
- Características (recámaras, baños, área construida)
- Ubicación (dirección, ciudad, estado, coordenadas)
- Amenidades y etiquetas
- Imágenes y videos
- Información de contacto

## 🚀 **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd houzemaster
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 **Estructura del Proyecto**

```
src/
├── app/                    # Páginas y componentes de Next.js
│   ├── components/         # Componentes reutilizables
│   │   ├── hero.tsx       # Hero principal sensual
│   │   ├── listings.tsx   # Lista de propiedades
│   │   ├── lead-capture.tsx # Captura de leads bilingüe
│   │   └── property-filters.tsx # Filtros inteligentes
│   ├── details/           # Páginas de detalles de propiedades
│   └── page.tsx           # Página principal
├── hooks/                 # Hooks personalizados de React
├── services/              # Servicios para manejo de datos
├── types/                 # Definiciones de tipos TypeScript
└── globals.css            # Estilos globales sensuales
```

## 🔧 **Componentes Principales**

### Hero
Sección principal con carrusel de imágenes, búsqueda integrada y estadísticas destacadas.

### Listings
Muestra la lista de propiedades con filtros y sistema de captura de leads integrado.

### LeadCapture
Sistema bilingüe de captura de leads con formulario inteligente:
- Campos personalizables según la propiedad
- Validación en tiempo real
- Estados de carga y éxito
- Soporte para español e inglés

### PropertyFilters
Sistema de filtros avanzados con interfaz intuitiva:
- Búsqueda por texto inteligente
- Filtros por tipo y operación
- Rangos de precio y recámaras
- Filtro por ubicación y destacadas

### PropertyCard
Tarjeta individual de propiedad con diseño sensual:
- Imágenes con efectos hover
- Badges de destacada y tipo
- Botones de acción (like, compartir, interés)
- Información estructurada elegantemente

## 📡 **Servicios**

### PropertyService
Maneja la comunicación con Google Sheets y el parsing de datos CSV:

- `fetchProperties()`: Obtiene datos del CSV
- `transformToPropertyCard()`: Convierte datos raw a formato de tarjeta
- `getPropertiesForDisplay()`: Obtiene propiedades listas para mostrar

## 🎯 **Hooks Personalizados**

### useProperties
Hook principal que maneja el estado de las propiedades:
- Estado de carga con animaciones
- Manejo de errores elegante
- Filtrado de propiedades en tiempo real
- Estado de filtros persistente

## 🎨 **Personalización**

### Modificar la Fuente de Datos
Para cambiar la fuente de datos, edita la constante `CSV_URL` en `src/services/propertyService.ts`:

```typescript
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=0&single=true&output=csv';
```

### Cambiar Colores
La paleta de colores se define en `tailwind.config.ts`:

```typescript
primary: {
  500: '#ec4899', // Rosa principal
  600: '#db2777', // Rosa oscuro
}
```

### Agregar Nuevos Filtros
1. Extiende la interfaz `PropertyFilters`
2. Actualiza el componente `PropertyFilters`
3. Implementa la lógica de filtrado en `useProperties`

## 🚀 **Despliegue**

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Despliega automáticamente

### Otros Proveedores
El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- AWS Amplify
- Heroku

## 🔍 **Solución de Problemas**

### Error de CORS
Si encuentras errores de CORS al leer Google Sheets, considera:
- Usar un proxy
- Configurar CORS en Google Sheets
- Usar la API oficial de Google Sheets

### Datos No Cargando
Verifica:
- URL del CSV es accesible
- Formato del CSV es correcto
- Estructura de columnas coincide con los tipos

## 🌟 **Características Únicas de HouzeMaster**

- **Diseño Sensual**: Paleta de colores rosa y dorado para una experiencia premium
- **Minimalismo Elegante**: Interfaz limpia y sofisticada
- **Bilingüe Nativo**: Soporte completo para español e inglés
- **Captura de Leads Inteligente**: Formularios contextuales según la propiedad
- **Animaciones Suaves**: Transiciones elegantes y efectos hover
- **Responsive Premium**: Diseño adaptativo de alta calidad

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 **Soporte**

Para soporte o preguntas:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo

---

**Desarrollado con ❤️ y elegancia para el sector inmobiliario de lujo**
