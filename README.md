# Machinus · web

Web estática de **Machinus**, una aventura gráfica sin palabras para Android, con su política de privacidad para Google Play. Son solo HTML, CSS, un poco de JavaScript opcional, imágenes y vídeo: no hay nada que compilar.

| Página | Dirección publicada |
|---|---|
| Inicio (inglés) | https://adriandy89.github.io/machinus-web/ |
| Inicio (español) | https://adriandy89.github.io/machinus-web/es/ |
| Política de privacidad (inglés) | https://adriandy89.github.io/machinus-web/privacy/ |
| Política de privacidad (español) | https://adriandy89.github.io/machinus-web/es/privacidad/ |

Un navegador en español que entra por primera vez en el inicio en inglés pasa solo a `/es/`. Si el visitante elige idioma con el botón EN/ES, se recuerda su elección.

## Publicarla en GitHub Pages (cuenta gratuita)

Con la cuenta gratuita, GitHub Pages solo publica desde **repositorios públicos**. Todo lo que hay en esta carpeta será visible.

### 1. Crear el repositorio y subir la web

En la terminal (CMD o PowerShell), desde esta carpeta:

```bat
cd F:\Godot\proyects\machinus-web
git init -b main
git add .
git commit -m "Web de Machinus"
gh repo create machinus-web --public --source . --remote origin --push
```

El último comando crea `adriandy89/machinus-web` en GitHub y sube la web. Si prefieres hacerlo sin `gh`:

1. Entra en https://github.com/new.
2. *Repository name*: `machinus-web`, marca **Public** y no añadas README, `.gitignore` ni licencia.
3. Pulsa **Create repository**.
4. En la terminal:
   ```bat
   git remote add origin https://github.com/adriandy89/machinus-web.git
   git push -u origin main
   ```

### 2. Activar GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En *Build and deployment* → *Source*, elige **Deploy from a branch**.
3. En *Branch*, elige **main** y la carpeta **/ (root)**, y pulsa **Save**.
4. Espera 1 o 2 minutos. Arriba aparece *Your site is live at https://adriandy89.github.io/machinus-web/*. El progreso se ve en la pestaña **Actions** («pages build and deployment»).
5. Comprueba que **Enforce HTTPS** está marcado (lo está por defecto).

Con `gh`, lo mismo en un comando:

```bat
gh api -X POST repos/adriandy89/machinus-web/pages -f "source[branch]=main" -f "source[path]=/"
```

### 3. Comprobar

Abre las cuatro direcciones de la tabla de arriba. Revisa sobre todo la política de privacidad (es la que pide Google) y que el tráiler se reproduce.

### 4. Ponerla en Google Play Console

| Dónde | Qué poner |
|---|---|
| **Política de la app → Contenido de la aplicación → Política de privacidad** | `https://adriandy89.github.io/machinus-web/privacy/` |
| **Presencia en Play Store → Ficha de Play Store principal → Detalles de contacto → Sitio web** | `https://adriandy89.github.io/machinus-web/` |
| **Detalles de contacto → Correo electrónico** | `ronindevstudio@gmail.com` (el mismo de la política) |

La página en inglés enlaza a la española, y la española a la inglesa.

> Los botones **Google Play** de la web apuntan a la ficha del juego (`com.machinus.game`). Hasta que la app sea pública en Play, esa dirección da «no encontrado». Es normal y se arregla sola el día del lanzamiento: no hay que tocar nada.

## Cambiar algo

1. Edita los archivos (abajo está qué hay en cada uno).
2. Pruébalo en local (siguiente apartado).
3. Súbelo:
   ```bat
   git add .
   git commit -m "Describe el cambio"
   git push
   ```
   GitHub Pages vuelve a publicar solo en 1 o 2 minutos. Si no ves el cambio, recarga con Ctrl+F5.

**La política de privacidad tiene que decir siempre la verdad sobre la versión publicada del juego.** Si una versión nueva añade algo (internet, anuncios, analítica, cuentas, permisos…), actualiza antes las dos páginas de privacidad y su fecha de «Última actualización», y después revisa el formulario de **Seguridad de los datos** en Play Console.

## Probar en local

Abrir `index.html` con doble clic casi funciona, pero los enlaces a carpetas (`es/`, `privacy/`) no. Mejor un servidor local (necesita Node.js):

```bat
cd F:\Godot\proyects\machinus-web
npx --yes serve .
```

Y abre la dirección que muestra (normalmente http://localhost:3000). La página 404 usa rutas absolutas (`/machinus-web/…`), así que en local sale sin estilos: es normal.

## Qué hay en cada archivo

| Ruta | Contenido |
|---|---|
| `index.html` | Inicio en inglés |
| `es/index.html` | Inicio en español |
| `privacy/index.html` | Política de privacidad en inglés |
| `es/privacidad/index.html` | Política de privacidad en español |
| `404.html` | Página de «carta perdida» para direcciones que no existen |
| `assets/css/site.css` | Todo el diseño: colores (al principio, en `:root`), tipografía, secciones |
| `assets/js/site.js` | Mejoras opcionales: aparición al desplazarse, botón del tráiler, visor de capturas, recordar el idioma. Sin él la web funciona igual |
| `assets/img/` | Arte, capturas (`shot-0N-800/1600.webp`), iconos y la imagen para redes (`og-image.jpg`, 1200×630) |
| `assets/video/` | Tráiler de 30 s en 720p (`trailer-es.mp4`, `trailer-en.mp4`) |
| `assets/fonts/` | Caladea Bold (licencia Apache 2.0 en `LICENSE-Caladea.txt`) |
| `sitemap.xml` | Mapa del sitio para buscadores (opcional: se puede enviar en Google Search Console) |
| `.nojekyll` | Le dice a GitHub Pages que publique los archivos tal cual, sin procesarlos |

Los textos de cada idioma están directamente en su HTML: para cambiar una frase, cámbiala en `index.html` **y** en `es/index.html`.

## Si el repositorio se llama distinto

La dirección `https://adriandy89.github.io/machinus-web/` aparece escrita en las etiquetas para buscadores y redes (`canonical`, `og:url`, `og:image`, `hreflang`), en `sitemap.xml` y, como `/machinus-web/`, en `404.html`. Si usas otro nombre de repositorio o un dominio propio, busca y reemplaza `adriandy89.github.io/machinus-web` y `/machinus-web/` en toda la carpeta. Los demás enlaces son relativos y funcionan en cualquier dirección.

### Dominio propio (opcional)

1. Compra el dominio.
2. En **Settings → Pages → Custom domain**, escríbelo y guarda. GitHub crea un archivo `CNAME` en el repositorio.
3. En tu proveedor de dominio, crea los registros DNS que indica la documentación de GitHub Pages: «Managing a custom domain for your GitHub Pages site».
4. Haz el reemplazo del apartado anterior con la dirección nueva.
5. Cambia la URL de la política en Play Console.

## Privacidad de la propia web

Sin cookies, sin analítica, sin formularios y sin recursos de terceros: fuentes, imágenes y vídeo se sirven desde aquí. GitHub Pages puede registrar datos técnicos (como la IP) por seguridad. Lo explican las dos páginas de privacidad. Si algún día añades analítica o un vídeo incrustado de otra web, actualiza esas páginas.

## Derechos

© 2026 Adrian Duardo. Todos los derechos reservados: textos, arte, capturas y vídeo de Machinus. Caladea se distribuye con licencia Apache 2.0. Google Play es una marca de Google LLC.
