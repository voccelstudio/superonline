#!/bin/bash
echo "🚀 Instalando MercadoDelicias..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    echo "   Descargalo de https://nodejs.org (versión 18+)"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "✅ Instalación completa!"
echo ""
echo "📋 Comandos disponibles:"
echo "   npm run dev    - Iniciar servidor de desarrollo"
echo "   npm run build  - Build de producción"
echo "   npm run start  - Servir build de producción"
echo ""
echo "🌐 Abrí http://localhost:3000 en tu navegador"
echo ""
echo "📤 Para subir a GitHub:"
echo "   1. Creá un repo en github.com/voccestudio/supermercado-online"
echo "   2. Ejecutá:"
echo "      git init"
echo "      git add ."
echo '      git commit -m "Initial commit: MercadoDelicias online store"'
echo "      git branch -M main"
echo "      git remote add origin https://github.com/voccestudio/supermercado-online.git"
echo "      git push -u origin main"
