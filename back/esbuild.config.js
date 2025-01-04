require('esbuild').build({
  entryPoints: ['src/interfaces/app.ts'],   // Punto de entrada
  bundle: true,                             // Empaque del código
  outfile: 'dist/bundle.js',                // Salida del bundle
  minify: true,                             // Minificación para producción
  sourcemap: true,                          // Generación de mapa de fuentes
  external: ['node_modules/*','better-sqlite3', 
        'mysql2', 
        'pg-query-stream', 
        'sqlite3', 
        'oracledb', 
        'tedious', 
        'pg-query-stream',
        'mysql',
        'http',     // Si usas módulos internos de Node.js
        'url',
        'path',
        'events',],             // Excluir todas las dependencias de node_modules
  platform: 'node',                         // Plataforma Node.js
  target: 'es2020',                         // Objetivo de ECMAScript 2020
}).catch(() => process.exit(1));