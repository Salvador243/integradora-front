# 🏗️ Integradora Front - Monolito Angular

Aplicación monolítica Angular 20 que consolida todos los micro-frontends del sistema de inventario en una única aplicación standalone.

## 📋 Descripción

Este proyecto migra la arquitectura de **Module Federation** (micro-frontends separados) a un **monolito Angular** modular, manteniendo la Clean Architecture y mejorando la simplicidad del deployment.

### ✅ Ventajas del Monolito

- **Deployment simplificado**: Un solo build, un solo hosting
- **Sin Module Federation**: Elimina complejidad de configuración
- **Lazy Loading**: Carga módulos bajo demanda (igual que MFEs)
- **Arquitectura limpia**: Mantiene separación por features
- **Servicios compartidos**: Garage y Conditions centralizados

---

## 🏛️ Arquitectura

```
src/app/
├── core/                           # Funcionalidad compartida
│   ├── guards/                     # AuthGuard, UnauthGuard
│   ├── layouts/                    # AdminLayout (navbar + sidebar)
│   └── shared/                     # Servicios compartidos (Garage, Conditions)
│       ├── domain/entities/
│       ├── domain/repositories/
│       └── infrastructure/repositories/
│
├── features/                       # Features (antes micro-frontends)
│   ├── auth/                       # Login y registro
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── auth.routes.ts
│   │
│   ├── tools/                      # Gestión de herramientas
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── tools.routes.ts
│   │
│   ├── general/                    # Talleres (garages)
│   ├── assignments/                # Asignaciones
│   └── historically/               # Históricos
│
├── environments/                   # Configuración por entorno
├── app.routes.ts                   # Rutas principales
└── app.config.ts                   # Providers globales
```

### 🎯 Clean Architecture por Feature

Cada feature mantiene la arquitectura hexagonal:

- **`domain/`**: Entidades y contratos (repositories abstractos)
- **`application/`**: Casos de uso (lógica de negocio)
- **`infrastructure/`**: Implementaciones (repositorios HTTP, localStorage)
- **`presentation/`**: Componentes Angular (layouts, forms, etc.)

---

## 🚀 Instalación y Ejecución

### **1. Instalar Dependencias**

```bash
cd /home/dev/github/integradora-front
npm install
```

### **2. Desarrollo Local**

```bash
npm start
# o
ng serve
```

La aplicación estará en: **http://localhost:4200**

### **3. Build de Producción**

```bash
npm run build
# o
ng build --configuration production
```

El build se genera en: `dist/integradora-front/browser/`

---

## 🔐 Autenticación y Rutas

### **Rutas Públicas (Sin autenticación)**

- `/auth/login` - Login
- `/auth/register` - Registro

### **Rutas Protegidas (Requieren token)**

- `/admin/general` - Dashboard principal (Talleres)
- `/admin/general/garage` - Gestión de garages
- `/admin/tools/tools` - Listado de herramientas
- `/admin/tools/categories` - Categorías
- `/admin/tools/instances/:toolTypeId` - Instancias de herramientas
- `/admin/assignments/assignments` - Asignaciones
- `/admin/historically` - Históricos

### **Guards**

- **`AuthGuard`**: Protege rutas `/admin/*`, redirige a `/auth/login` si no hay token
- **`UnauthGuard`**: Protege rutas `/auth/*`, redirige a `/admin/general` si ya está autenticado

Token almacenado en: `localStorage.getItem('auth.token')`

---

## 🌐 APIs Backend

Configuradas en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrlAuth: 'http://integradora-auth-env.eba-w9vmduwm.us-east-1.elasticbeanstalk.com',
  apiUrlGeneral: 'http://integradora-general-env.eba-j27pvcdu.us-east-1.elasticbeanstalk.com',
  apiUrlTools: 'http://integradora-tools-env.eba-qqcfswqm.us-east-1.elasticbeanstalk.com',
};
```

### **Endpoints por Feature**

| Feature | Base URL | Descripción |
|---------|----------|-------------|
| **Auth** | `apiUrlAuth` | Login, registro |
| **General** | `apiUrlGeneral` | Garages, conditions |
| **Tools** | `apiUrlTools` | Herramientas, categorías, instancias |

---

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "@angular/core": "^20.3.0",
    "@angular/common": "^20.3.0",
    "@angular/router": "^20.3.0",
    "primeng": "^20.1.2",
    "primeicons": "^7.0.0",
    "@primeuix/themes": "^1.2.3",
    "tailwindcss": "^4.1.13",
    "rxjs": "~7.8.0"
  }
}
```

---

## 🎨 Estilos

- **TailwindCSS v4**: Framework CSS utility-first
- **PrimeNG**: Componentes UI (buttons, forms, tables, etc.)
- **PrimeIcons**: Iconos

Configuración global en `src/styles.css`:

```css
@import 'tailwindcss';
@import 'primeicons/primeicons.css';
```

---

## 🔧 Configuración TypeScript

### **Path Aliases** (tsconfig.app.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@tools/*": ["src/app/features/tools/*"],
      "@authenticator/*": ["src/app/features/auth/*"],
      "@general/*": ["src/app/features/general/*"],
      "@assignments/*": ["src/app/features/assignments/*"],
      "@historically/*": ["src/app/features/historically/*"]
    }
  }
}
```

Esto permite imports como:
```typescript
import { Tool } from '@tools/domain/entities/tool.entity';
```

---

## 🔄 Servicios Compartidos

### **Garage Repository**

Usado por: `tools`, `general`

```typescript
// Uso en cualquier feature
import { GarageRepository } from '@core/shared/domain/repositories/garage.repository';
import { ApiGarageRepository } from '@core/shared/infrastructure/repositories/api-garage.repository';

// Provider
{ provide: GarageRepository, useClass: ApiGarageRepository }
```

### **Condition Repository**

Usado por: `tools`

```typescript
import { ConditionRepository } from '@core/shared/domain/repositories/condition.repository';
```

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start                    # Servidor desarrollo (puerto 4200)
ng serve                     # Igual que npm start

# Build
npm run build                # Build producción
ng build --configuration production

# Linting (si está configurado)
npm run lint

# Testing (si está configurado)
npm test
```

---

## 🚢 Deployment

### **Opción 1: Vercel**

1. Conecta el repositorio de GitHub
2. Configura:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/integradora-front/browser`
   - **Framework**: Angular

### **Opción 2: Netlify**

1. Conecta el repositorio
2. Configura:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist/integradora-front/browser`

### **Opción 3: AWS S3 + CloudFront**

```bash
# Build
npm run build

# Deploy a S3
aws s3 sync dist/integradora-front/browser/ s3://tu-bucket/ --delete

# Invalidar caché CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 🔍 Troubleshooting

### **Error: Cannot find module '@tools/...'**

- Verifica que `tsconfig.app.json` tenga los paths configurados
- Reinicia el servidor de desarrollo: `ng serve`
- Reinicia el IDE/VSCode

### **Error: HttpClient not provided**

- Verifica que `app.config.ts` tenga:
  ```typescript
  provideHttpClient(withInterceptorsFromDi())
  ```

### **Error: PrimeNG styles not loading**

- Verifica que `styles.css` importe:
  ```css
  @import 'primeicons/primeicons.css';
  ```

### **Error: 401 Unauthorized en peticiones**

- El token JWT expiró o es inválido
- Vuelve a hacer login en `/auth/login`

---

## 📚 Recursos

- [Angular Docs](https://angular.dev)
- [PrimeNG Components](https://primeng.org)
- [TailwindCSS](https://tailwindcss.com)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## 👥 Equipo

Proyecto desarrollado para la gestión de inventario de herramientas.

---

## 📄 Licencia

Privado - Uso interno
