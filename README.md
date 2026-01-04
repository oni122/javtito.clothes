# Javito's Clothes

E-commerce en **Astro + React + Tailwind CSS** para venta de ropa, con panel de administración en vivo para manejar stock, precios y catálogo.

## Características
- Hero y catálogo responsivo con estilo editorial inspirado en la referencia.
- Panel de administración para agregar productos (nombre, imagen, precio, descripción, talla, color, stock) y actualizar existencias en bodega.
- Estado de stock en vivo: descuenta al simular venta y permite recargar unidades.
- Componentes en TypeScript y Tailwind para acelerar cambios de UI.

## Requisitos
- Node.js 18+.

## Scripts
```
npm install        # Instala dependencias
npm run dev        # Servidor de desarrollo
npm run build      # Construye la versión de producción
npm run preview    # Sirve la build para validarla
```

## Despliegue recomendado
1. **Vercel (Astro está soportado oficialmente)**
   - Importa el repositorio en Vercel.
   - Configura la raíz del proyecto en `.` y el comando de build en `npm run build`.
   - Directorio de salida: `dist`.
2. **Netlify**
   - Usa el adaptador estandar de Astro (sin necesidad de plugin extra).
   - Build command: `npm run build`, Publish directory: `dist`.
3. **Static hosting / S3 / CloudFront**
   - Ejecuta `npm run build` y sube el contenido de `dist` a tu bucket o CDN.

### Tips de producción
- Define variables de entorno para API keys o gateways de pago si los conectas más adelante.
- Usa imágenes optimizadas (WebP/AVIF) y configura un CDN para estáticos.
- Activa HTTPS y HTTP/2 en el proveedor que elijas.
- Integra analítica ligera (por ejemplo, Plausible) para tráfico sin afectar rendimiento.

## Estructura
- `src/pages/index.astro`: Landing principal con hero y footer.
- `src/components/CommerceDashboard.tsx`: Catálogo interactivo y panel de administración con stock en vivo.
- `src/styles/global.css`: Tipografías y utilidades globales.

## Notas
Si el entorno bloquea el registro de npm, instala con un mirror o cache local. Las dependencias principales son `astro`, `@astrojs/react`, `@astrojs/tailwind`, `react`, `react-dom` y `tailwindcss`.
