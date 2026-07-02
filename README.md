# 🥘 MercadoDelicias

Supermercado online especializado en ingredientes para cocina oriental, árabe, india y delicatesen.

## Tecnología

- **Next.js 14** (App Router, Static Export)
- **React 18**
- **Tailwind CSS 3**
- **Despliegue estático** (GitHub Pages)

## Funcionalidades

- Catálogo de productos con categorías y búsqueda
- Carrito de compras con persistencia local
- Envío de pedido por WhatsApp
- Pago por transferencia bancaria
- Diseño responsive para mobile y desktop

## Requisitos

- Node.js 18+

## Instalación

```bash
# Clonar el repo
git clone https://github.com/voccestudio/supermercado-online.git
cd supermercado-online

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build de producción
npm run build
```

## Desarrollo

```bash
npm run dev
# Abrir http://localhost:3000
```

## Estructura del proyecto

```
src/
├── app/              # Páginas (App Router)
│   ├── page.js       # Home
│   ├── productos/    # Listado de productos
│   ├── producto/[id] # Detalle de producto
│   ├── carrito/      # Carrito de compras
│   └── contacto/     # Página de contacto
├── components/       # Componentes reutilizables
├── context/          # Contexto del carrito
└── data/             # Catálogo de productos
```

## Personalizar

### Productos
Editar `src/data/products.js` para agregar/modificar productos.

### Número de WhatsApp
Buscar `0992311700` en el código y reemplazar por tu número.

### Precios
Los precios están en Guaraníes (PYG). Editarlos en `src/data/products.js`.
