# Registro de cambios

Reorganización completa del proyecto, 31 de julio de 2026.
Punto de partida: rama `main`, commit `734cf59`. Estado previo documentado en
[auditoria.md](auditoria.md).

Ningún comando de git fue ejecutado. Todos los cambios son locales.

---

## Fase 1 — Auditoría e inventario

- Recorrido de las 8 páginas HTML, 14 archivos CSS/JS, 9 imágenes y 2 PDF.
- Identificación del propósito real de cada página leyendo `<title>` y `<h1>`,
  no el nombre de la carpeta.
- Comprobación de cada `href`, `src`, `<link>` y `<script>` contra el disco.
- Búsqueda de credenciales sobre `*.html`, `*.js`, `*.css`, `*.scss`, `*.json`,
  `*.md`: **0 coincidencias**.
- Lectura de los 2 PDF de la raíz, que resultaron ser la única fuente de
  contenido auténtico y verificable del proyecto.
- Escrito `docs/auditoria.md` con el inventario en 17 secciones.

---

## Fase 2 — Estructura destino

### Eliminado: el sitio de otro cliente

Seis de las ocho páginas eran el sitio completo de **EduTech Solutions LLC**,
otra empresa: otra razón social, otra dirección (Wyoming, EE. UU.), otro correo
de soporte y otro catálogo de servicios (software académico).

| Ruta eliminada | Menciones a EduTech |
|---|---|
| `servicios/` | 46 |
| `terminos/` | 52 |
| `politica/` | 48 |
| `en/services/` | 46 |
| `en/terms/` | 57 |
| `en/policy/` | 49 |

No se reescribieron para MOVIRA porque habría exigido inventar términos legales,
dirección fiscal y catálogo de servicios que el proyecto no contiene. En su
lugar se construyeron las dos páginas legales reales descritas en la fase 5.

### Nueva estructura

```
index.html · politica-de-privacidad.html · 404.html
en/index.html · en/privacy-policy.html
assets/css/{base,layout,components}.css · assets/css/pages/legal.css
assets/js/main.js · assets/js/modules/{theme,mobile-menu,faq,year}.js
assets/icons/favicon.svg
docs/{auditoria,cambios}.md · docs/fuentes/*.pdf
robots.txt · sitemap.xml · .gitignore · README.md · LICENSE
```

- Los dos PDF pasaron de la raíz publicable a `docs/fuentes/`, con nombres sin
  espacios ni paréntesis: `faq-movira.pdf` y
  `politica-de-privacidad-movira.pdf`.
- Todo en minúsculas y con guiones. Sin números de versión en ningún nombre.

---

## Fase 3 — Higiene

### Archivos eliminados

| Archivo | Motivo |
|---|---|
| `css/styles.css`, `.scss`, `.css.map` | Reemplazados por `assets/css/`. El `.map` era un artefacto de build commiteado |
| `servicios/css/*`, `politica/css/*`, `terminos/css/*` | Hojas de las páginas de EduTech, más sus `.scss` y `.map` |
| `js/script.js` | Reemplazado. Contenía los fallos de la §11 de la auditoría |
| `js/general.js` | Reemplazado. Duplicaba 10 funciones de `script.js` |
| `assets/img/` (8 archivos) | **Las 8 eran capturas de pantalla del sitio de EduTech Solutions**, incluidas las 2 declaradas como imagen de vista previa de MOVIRA |
| `assets/icons/Movira.png` | Avatar autogenerado del repositorio, con el texto "Movira-landing". No es un logo de marca |

Antes de borrar cada imagen se comprobó con `grep` quién la referenciaba: 6 de
las 9 no las referenciaba ningún archivo, y las 3 restantes solo desde páginas
que también se eliminaban.

### Otros

- Creado `.gitignore` para el stack detectado: `node_modules/`, `.env`,
  `dist/`, `.vercel/`, `*.css.map`, `.sass-cache/`, `*.log`, `.DS_Store`,
  `Thumbs.db`, `.vscode/`, `.idea/`.
- Formato normalizado en todos los archivos generados: indentación de 2
  espacios, comillas dobles en HTML, punto y coma en JS, salto de línea final.
- **Credenciales: ninguna encontrada, nada que retirar.**

---

## Fase 4 — Imágenes

El proyecto quedó **sin ninguna imagen**, porque las 9 que había pertenecían a
otra empresa. No se inventó ni descargó ninguna.

- El diseño se resuelve entero con color, tipografía y **SVG en línea escritos a
  mano**: 13 iconos distintos, dibujados como `<path>` de trazo.
- El panel de seguimiento del hero y el mockup del producto son composiciones de
  CSS puro, sin ningún archivo de imagen.
- Creado `assets/icons/favicon.svg`, generado para este proyecto: cuadrado
  redondeado con degradado azul y la "M" del logotipo, coherente con el
  `.logo__mark` que ya usaba la página.
- No queda ni una etiqueta `<img>` en el proyecto, así que las reglas de
  `width`/`height`/`loading`/`alt` no tienen a qué aplicarse.

---

## Fase 5 — HTML, SEO y accesibilidad

### Semántica

- Añadidos `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>`
  en las 5 páginas. Antes **ninguna de las 8 páginas tenía `<main>`**.
- Un solo `<h1>` por página. Antes `terminos/` y `en/terms/` tenían tres cada
  una.
- Jerarquía de encabezados sin saltos: `h1` → `h2` de sección → `h3` de tarjeta.

### Enlaces rotos corregidos

Los 4 elementos del menú principal llevaban a 404 (`soluciones/`, `nosotros/`,
`contacto/`, y `Inicio` era `href="#"`). Ahora los 5 apuntan a secciones que
existen en la misma página, verificadas una a una contra los `id` del documento.

También eliminados: el botón "Acceso"/"Access" hacia `acceso/` y `access/` (no
existe ningún sistema de autenticación), y los 10 enlaces del footer que
apuntaban a 2 rutas inexistentes.

### `<head>`

Reescrito por completo en las 5 páginas:

- `<title>` único por página. `<meta name="description">` única, entre 142 y 158
  caracteres.
- `canonical`, `hreflang` (`es`, `en`, `x-default`) apuntando al dominio real de
  despliegue, `moviralanding.wib.digital`. Antes apuntaban a `movira.com`
  mientras el favicon se pedía a `movira-landing.vercel.app`.
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`,
  `og:locale`. **Sin `og:image`**, porque no existe ningún archivo de imagen
  real para ello.
- Favicon con ruta relativa al SVG generado. Antes era una URL absoluta a un
  dominio de despliegue.
- `theme-color` unificado a `#1e40af`, el azul que el sitio realmente usa. Antes
  declaraba `#FF6B35`, naranja, que no aparecía en ninguna parte del CSS.

### Datos estructurados

De 7 bloques JSON-LD por página se pasó a 2, todos verificables:

- `Organization` con nombre, URL, descripción, correo y país de operación.
- `FAQPage` con las 9 preguntas reales del PDF del cliente.

Eliminados: `aggregateRating` de 4,8 sobre 47 reseñas y el bloque `review` con
un testimonio firmado, ambos fabricados para una empresa cuyo propio marcado
declaraba `foundingDate: 2024`; `SoftwareApplication` con `screenshot` a un
archivo inexistente; `logo` a un archivo inexistente; `sameAs` a perfiles de
LinkedIn y Twitter sin confirmar; y el segundo `Organization` duplicado con
datos distintos de los del primero.

### Accesibilidad

- Enlace "Saltar al contenido" en las 4 páginas con navegación.
- `:focus-visible` con contorno de 3 px en todo elemento interactivo. Antes no
  había **ninguna** regla de foco en 4.547 líneas de CSS.
- Las preguntas del FAQ pasaron de `<div>` con listener de clic a `<button>`
  con `aria-expanded` y `aria-controls`: ahora son enfocables y se activan con
  Enter y Espacio.
- `aria-expanded` en el botón del menú móvil, `aria-label` en los tres botones
  de solo icono, `aria-current="page"` en el elemento activo del menú.
- Contraste verificado por cálculo sobre la página renderizada: **mínimo 5,75:1
  en tema oscuro y 7,58:1 en tema claro**, sobre 11 combinaciones de texto y
  fondo. El antiguo `--text-muted: #94a3b8` daba 2,8:1.
- Sin formularios: no queda ningún `<input>` sin `<label>` asociado.

### Archivos nuevos

- `robots.txt` con `Disallow: /docs/` y referencia al sitemap.
- `sitemap.xml` con las 4 URL indexables y sus `xhtml:link` alternos por idioma.
- `404.html` con enlace de vuelta al inicio y a la versión en inglés.

### Texto de relleno eliminado

- Los **4 testimonios** con nombre, cargo y empresa inventados (Ana Rodríguez /
  RetailMax Colombia, Carlos Mendoza / TechStart Logistics, María Fernández /
  IndustriasCorp, Roberto Silva / ComercialPlus), junto con sus 4 avatares que
  apuntaban a un `logo1.png` inexistente.
- El **teléfono `+57 300 123 4567`** y la dirección "Zona Empresarial Norte".
- Los botones **"Ver Demo Completo"** y **"Descargar Brochure"**, ambos
  `href="#"`, sin demo ni brochure en el proyecto.
- El **formulario de newsletter**, que fingía funcionar: no enviaba nada a
  ningún servicio, solo cambiaba el texto del botón a "¡Suscrito!" durante 3
  segundos. Sustituido por un enlace `mailto:` real con asunto y cuerpo
  precargados.
- Las **métricas fabricadas**: "40% reducción de costos", "300% más cobertura",
  "24 horas promedio", "98,2% entregas exitosas", "247 distribuidores activos",
  "1.847 entregas este mes". Ninguna aparecía en el material del cliente.
- La sección y las clases **`tecdu-showcase` / `.tecdu-*`**: "Tecdu" es el
  nombre del producto de EduTech, no de MOVIRA.
- El `console.log('🚀 EduTech Navigation System loaded successfully')` que se
  imprimía en las páginas de MOVIRA.

### Contenido nuevo, tomado del material real del cliente

Los dos PDF que estaban en la raíz sin enlazar desde ninguna página pasaron a
ser la fuente del contenido:

- **Sección "Cómo funciona"** (4 pasos) y **"Soluciones"** (4 tarjetas):
  reescritas desde `faq-movira.pdf`. Esto corrigió también una imprecisión de
  fondo: el sitio describía una red de "distribuidores externos" genéricos,
  cuando el producto real es una red de **conductores independientes
  verificados** para **última milla**.
- **Sección de preguntas frecuentes**: las 9 preguntas y respuestas literales
  del PDF, en lugar de las 5 genéricas anteriores.
- **`politica-de-privacidad.html` y `en/privacy-policy.html`**: transcripción de
  `politica-de-privacidad-movira.pdf`, con su fecha original del 25 de junio de
  2025. La versión inglesa es una traducción del mismo documento.
- **Sección de contacto**: correo real con `mailto:` y mención de los programas
  piloto, ambos del PDF.

---

## Fase 6 — CSS y sistema de diseño

El CSS anterior (132 KB compilados desde 125 KB de Sass) no se pudo reorganizar
sin reescribirlo: era *desktop-first*, con más de 150 media queries `max-width`
repartidas por todo el archivo. Al eliminarse 6 de 8 páginas, buena parte
quedaba además sin uso. Se reescribió conservando la paleta y el lenguaje visual
que el sitio ya tenía.

| | Antes | Ahora |
|---|---|---|
| Archivos | 1 de 132 KB + 3 por página | 3 compartidos + 1 por tipo de página |
| Peso total | 181 KB (4 hojas) | 28 KB (4 hojas) |
| Media queries | 150+, todas `max-width` | 12, todas `min-width` |
| `!important` | 5 | 0 |
| Estilos en línea | 2 | 0 |

- **Variables en `:root`**: colores, espaciados, radios, sombras, tipografías y
  transiciones. Paleta derivada del azul que el sitio ya usaba (`#1e40af` /
  `#3b82f6`) sobre una escala de grises slate. Eliminadas las 6 variables que
  estaban declaradas dos veces (`--pure-white`, `--gradient-subtle` y las 4
  `--shadow-*`).
- **Escala de espaciado** de 8 pasos: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96.
- **Escala tipográfica** de 8 pasos, que crece en 768 px y 1024 px.
  **Una sola familia**: Inter.
- **Orden dentro de cada archivo**: variables → reset → base → layout →
  componentes → utilidades → media queries.
- Eliminado el `* { transition: ... }` sobre el selector universal, que animaba
  cuatro propiedades en cada elemento de la página.
- Eliminado el bloque `[data-theme="dark"]` de 807 líneas que repetía selectores
  completos ya resueltos por las variables.
- Eliminados los selectores de más de 3 niveles heredados del anidamiento Sass
  (`body .navbar .nav-container .nav-menu li a` y similares).
- Eliminado el CSS de componentes que no existían en ningún HTML:
  `.social-link`, `.scroll-indicator`, `.notification-*`, `.services-intro`,
  `.tech-badge`, `.highlight-list`.

---

## Fase 7 — Responsive

- **Mobile-first**: todas las media queries usan `min-width`.
- **Breakpoints**: 480 / 768 / 1024 / 1440.
- **Sin scroll horizontal**, verificado con
  `document.documentElement.scrollWidth > window.innerWidth` sobre las **5
  páginas × 5 anchos** (360, 480, 768, 1024, 1440): 25 combinaciones, 0
  desbordamientos.
- **Áreas táctiles**: todo elemento interactivo llega a 44×44 px. Corregidos los
  enlaces del pie (33 px) y el enlace de correo de la tarjeta de contacto
  (21 px). Los indicadores del carrusel de 12×12 px desaparecieron con el
  carrusel.
- **Menú móvil** verificado en las dos direcciones: abre, bloquea el scroll de
  fondo, y cierra con el botón, con la tecla Escape, al pulsar el overlay y al
  pulsar un enlace. Devuelve el foco al botón que lo abrió.

---

## Fase 8 — UX / UI

- **Un CTA principal por pantalla**, todos con destino real: el del hero lleva a
  la sección de contacto, y el de contacto abre un `mailto:` con asunto y
  cuerpo precargados.
- **Estados completos** en cada elemento interactivo: `default`, `hover`,
  `focus-visible`, `active` y `disabled`, con transiciones de 150-250 ms.
- **Ancho de línea** limitado a `68ch` mediante `--measure` sobre todos los
  párrafos.
- **Formularios**: eliminado el único que había, porque no estaba conectado a
  ningún servicio y simulaba éxito. Sustituido por un enlace `mailto:` real.
- **Estética sobria**: un solo degradado sutil en el hero, sombras contenidas y
  ninguna animación decorativa. Eliminados el parallax en scroll, el efecto
  ripple de los botones, el `boxShadow` de "energía" al pasar el ratón, la
  animación escalonada de aparición del footer y las 15 `@keyframes` sin uso.

---

## Fase 9 — JavaScript

De 2 archivos y 1.327 líneas con funciones duplicadas se pasó a 5 archivos y 232
líneas.

Fallos corregidos, en el orden de la §11 de la auditoría:

- `initializeAnimations()` estaba **definida dos veces** en `script.js`; la
  segunda anulaba a la primera, de modo que `initializeHeroAnimations()`,
  `initializeAboutAnimations()` e `initializeFooter()` no llegaban a
  ejecutarse nunca.
- `document.getElementById('year').textContent` sin guarda, que lanzaba
  `TypeError` en cualquier página sin `#year`.
- Llamadas a `isValidEmail()` y `showNotification()` desde `script.js`, donde no
  estaban definidas: `ReferenceError` latente en el formulario de newsletter.
- `InfiniteCarousel` y `FAQAccordion` accedían a `addEventListener` sobre
  elementos sin comprobar que existieran.
- Un listener global de `keydown` capturaba `ArrowLeft` y `ArrowRight` para el
  carrusel, **secuestrando las flechas del teclado en toda la página**.
- `initializeSmoothScroll()` hacía `preventDefault()` en todos los `a[href^="#"]`,
  rompiendo el scroll nativo cuando el destino no existía — que era el caso de
  todos los `#contacto`.
- 10 funciones definidas en los dos archivos a la vez con implementaciones
  divergentes.
- `const altIconClass` declarada y nunca leída, en ambos archivos.

Reescritura:

- **Un solo punto de entrada**, `main.js`, y 4 módulos en `assets/js/modules/`.
- **Sin variables globales sueltas**: todo cuelga de `window.Movira`. Antes eran
  15 identificadores en el ámbito global.
- **Sin `var`**. Cada módulo va en un IIFE con `"use strict"`.
- **Delegación de eventos** en el acordeón del FAQ y en el cierre del menú al
  pulsar un enlace: un listener en lugar de uno por elemento.
- **Comprobación de existencia** al inicio de cada `init`, de modo que la misma
  lista de módulos sirve para las 5 páginas.
- **Cero errores y cero avisos en consola** en las 5 páginas, verificado en
  Chrome.

---

## Fase 10 — Rendimiento

| | Antes | Ahora |
|---|---|---|
| Peso local de la primera carga | ~225 KB | **64 KB** |
| Peticiones a CDN externos | 2 dominios, 3 archivos | 1 dominio, 1 archivo |
| Font Awesome | 6.0.0 y 6.4.0 en el mismo sitio, ~75 KB + fuentes | **eliminado** |
| normalize.css | 3 KB desde cdnjs | **eliminado**, reset propio en `base.css` |
| Scripts | Sin `defer` | Todos con `defer` |

- **Font Awesome eliminado**: los 48 iconos que usaba el sitio se sustituyeron
  por SVG en línea. El sitio cargaba además **dos versiones distintas** de la
  librería según la página.
- **Cadena de peticiones rota**: la tipografía se pedía con `@import url(...)`
  *dentro* de `styles.css`, así que el navegador tenía que descargar y parsear
  el CSS antes de descubrirla. Ahora se pide con un `<link>` en el `<head>`, en
  paralelo, con `preconnect` a los dos orígenes de Google Fonts y
  `display=swap`.
- **Eliminado el doble enlace a la hoja de estilos**: cada página declaraba
  `<link rel="preload" href="css/styles.css">` seguido de `<link
  rel="stylesheet">` al mismo archivo, lo que provocaba una advertencia de
  recurso precargado sin usar.
- El tema se aplica con un script en línea de 10 líneas antes de la primera
  pintura, para que la página no parpadee de claro a oscuro al cargar.

---

## Fase 11 — QA

Verificado en Chrome sobre un servidor local, no por inspección del código.

| Comprobación | Resultado |
|---|---|
| Cada enlace del menú y del pie lleva a una página que existe | 0 rotos |
| Cada ruta de imagen corresponde a un archivo real | No hay ninguna `<img>` |
| Cada `<link>` y `<script>` apunta a un archivo que existe | 17 rutas, todas HTTP 200 |
| Cero errores en consola en todas las páginas | 5 páginas, 0 mensajes |
| Sin scroll horizontal en 360, 768, 1024 y 1440 px | 25 combinaciones, 0 desbordamientos |
| Menú móvil funciona en las dos direcciones | Botón, Escape, overlay y clic en enlace |
| Formularios validan y responden | No queda ninguno; sustituido por `mailto:` |
| No queda "Lorem ipsum", "TODO" ni texto del template | 0 coincidencias |
| No queda ninguna imagen rota | 0 |
| Todas las páginas tienen title y description únicos | 5 de 5 |
| `404.html` existe y enlaza al inicio | Sí, y devuelve código 404 real |
| No hay credenciales en el código | 0 coincidencias |

### Fallos encontrados durante el QA y corregidos

- **El botón hamburguesa seguía visible en escritorio**, junto al menú completo.
  El botón lleva las clases `icon-btn menu-toggle`; la regla que lo oculta a
  partir de 1024 px vivía en `layout.css` con la misma especificidad que
  `.icon-btn { display: grid }` de `components.css`, que se carga después y por
  tanto ganaba. Corregido subiendo el selector a `.icon-btn.menu-toggle`.
  Verificado en el límite exacto: 1023 px muestra el menú lateral, 1024 px el
  principal.
- **El enlace "Saltar al contenido" no reaparecía** al recibir el foco por
  script, porque usaba `:focus-visible`. Cambiado a `:focus`.
- **Áreas táctiles por debajo de 44 px** en los enlaces del pie (33 px) y en el
  enlace de correo de la tarjeta de contacto (21 px). Corregidas con
  `min-height`.
- **Párrafos consecutivos sin separación** en la sección oscura, por el
  `margin: 0` del reset. Añadida la regla `p + p`.

Comprobaciones adicionales:

- Anclas internas validadas contra los `id` del documento destino: 0 rotas.
- Contraste calculado sobre la página renderizada en los dos temas: mínimo
  5,75:1.
- Funcionamiento confirmado también con el protocolo `file://`, abriendo
  `index.html` directamente.
- `404.html` probado en una ruta anidada (`/carpeta/inexistente/pagina`) para
  confirmar que sus rutas desde la raíz resuelven.

---

## Fase 12 — Documentación

- `README.md` reescrito en inglés técnico para la estructura nueva. El anterior
  describía 8 páginas, `css/styles.css`, Sass y Font Awesome, nada de lo cual
  existe ya.
- `docs/auditoria.md` y `docs/cambios.md` creados.

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente (`file://`) y con
  `npx serve@14 . -l 8000`.
- Sin rutas absolutas de la máquina local en ningún archivo.
- Todas las rutas internas relativas y en minúsculas, salvo las de `404.html`,
  que son desde la raíz a propósito: el servidor entrega esa página en cualquier
  dirección no resuelta, incluidas las anidadas, donde una ruta relativa se
  rompería.
- No se creó ningún archivo de configuración de hosting: Vercel sirve este
  proyecto como estático sin `vercel.json`.
- **No se hizo deploy.** No se ejecutó `vercel`, `netlify`, `surge` ni similar.
