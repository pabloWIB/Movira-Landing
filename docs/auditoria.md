# Auditoría — Movira-landing

Fecha de auditoría: 31 de julio de 2026
Estado del repositorio auditado: `main`, commit `734cf59`

Documento de trabajo interno. Refleja el estado del proyecto **antes** de la
reorganización. El registro de lo que se cambió está en [cambios.md](cambios.md).

---

## 1. Archivos HTML y su propósito real

Propósito determinado leyendo el `<title>` y el `<h1>` de cada archivo, no el
nombre de la carpeta.

| Archivo | `<title>` | `<h1>` real | ¿De quién es? |
|---|---|---|---|
| `index.html` | MOVIRA \| Plataforma B2B de Distribución Inteligente | Amplía Tu Red de Distribución Inteligente | **MOVIRA** |
| `en/index.html` | MOVIRA \| Intelligent B2B Distribution Platform | Expand Your Intelligent Distribution Network | **MOVIRA** |
| `servicios/index.html` | Servicios de Desarrollo de Software \| EduTech Solutions LLC | Soluciones Tecnológicas Integrales | **EduTech Solutions LLC** |
| `terminos/index.html` | Políticas de Privacidad y Términos y Condiciones \| EduTech Solutions LLC | Políticas de Privacidad y Términos y Condiciones | **EduTech Solutions LLC** |
| `politica/index.html` | Política de Cookies \| EduTech Solutions LLC | Política de Cookies | **EduTech Solutions LLC** |
| `en/services/index.html` | Software Development Services \| EduTech Solutions LLC | Comprehensive Technology Solutions | **EduTech Solutions LLC** |
| `en/terms/index.html` | Privacy Policy and Terms and Conditions \| EduTech Solutions LLC | Privacy Policy and Terms and Conditions | **EduTech Solutions LLC** |
| `en/policy/index.html` | Cookie Policy \| EduTech Solutions LLC | Cookie Policy | **EduTech Solutions LLC** |

**6 de 8 páginas pertenecen a otra empresa.** Menciones de "EduTech" por archivo:
`terminos/` 52 · `en/terms/` 57 · `politica/` 48 · `en/policy/` 49 ·
`servicios/` 46 · `en/services/` 46. Total: 298.

Errores de jerarquía de encabezados detectados:
`terminos/index.html` y `en/terms/index.html` tienen **tres `<h1>`** por página
(el título legal más dos cabeceras de sección). `servicios/index.html` usa `<h1>`
dentro de `.section-title` sin `<header>` ni `<main>`.

Ninguna de las 8 páginas usa `<main>`. Ninguna usa `<header>`. Todo el contenido
cuelga directo de `<body>` en `<section>` sueltas.

---

## 2. Archivos CSS y JS: cuáles se cargan y cuáles quedaron huérfanos

| Archivo | Peso | ¿Quién lo carga? | Estado |
|---|---|---|---|
| `css/styles.css` | 132 KB | Las 8 páginas | Activo — **enlazado dos veces** por página (`preload` + `stylesheet`) |
| `css/styles.scss` | 125 KB | Nadie (fuente Sass) | Fuente sin build documentado |
| `css/styles.css.map` | 39 KB | Nadie | Artefacto de build commiteado |
| `servicios/css/styles.css` | 15 KB | `servicios/index.html` | Activo, pero la página se elimina |
| `servicios/css/styles.scss` | 14 KB | Nadie | Fuente |
| `servicios/css/styles.css.map` | 5 KB | Nadie | Artefacto |
| `politica/css/styles.css` | 23 KB | `politica/index.html` | Activo, pero la página se elimina |
| `politica/css/styles.scss` | 21 KB | Nadie | Fuente |
| `politica/css/styles.css.map` | 7 KB | Nadie | Artefacto |
| `terminos/css/styles.css` | 12 KB | `terminos/index.html` | Activo, pero la página se elimina |
| `terminos/css/styles.scss` | 12 KB | Nadie | Fuente |
| `terminos/css/styles.css.map` | 4 KB | Nadie | Artefacto |
| `js/script.js` | 28 KB | `index.html`, `en/index.html` | Activo — con fallos, ver §5 |
| `js/general.js` | 16 KB | Las 6 páginas de EduTech | Activo, pero esas páginas se eliminan |

Las páginas de EduTech (`servicios/`, `terminos/`, `politica/` y sus versiones
inglesas) cargan **dos hojas de estilo**: `../css/styles.css` (la global, 132 KB)
más su propia `css/styles.css`. Es decir, 147 KB de CSS para una página de texto
legal.

---

## 3. Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿A quién pertenece? | ¿Se usa? |
|---|---|---|---|---|---|
| `assets/icons/Movira.png` | 612 KB | 1024×1024 | PNG RGBA | Avatar autogenerado del repo — dice literalmente "Movira-landing" | Favicon de `index.html` |
| `assets/img/og-image.jpg` | 186 KB | 1920×997 | JPEG | **EduTech Solutions** (captura de su home en inglés) | Referenciada como `.png`, no existe |
| `assets/img/og-image-es.jpg` | 184 KB | 1920×997 | JPEG | **EduTech Solutions** (captura de su home en español) | Ninguna página la referencia |
| `assets/img/og-servicios.png` | 192 KB | 1920×997 | PNG | **EduTech Solutions** (captura de su página de servicios) | Referenciada como `.jpg`, no existe |
| `assets/img/og-services-en.png` | 192 KB | 1920×997 | PNG | **EduTech Solutions** | Ninguna página la referencia |
| `assets/img/og-politica.png` | 163 KB | 1920×997 | PNG | **EduTech Solutions** | Referenciada como `.jpg`, no existe |
| `assets/img/og-policy-en.png` | 159 KB | 1920×997 | PNG | **EduTech Solutions** | Ninguna página la referencia |
| `assets/img/og-terms.jpg` | 133 KB | 1920×997 | JPEG | **EduTech Solutions** (captura de sus T&C) | `index.html` la usa como `itemprop="image"` |
| `assets/img/og-terms-en.jpg` | 130 KB | 1920×997 | JPEG | **EduTech Solutions** | `en/index.html` la usa como `itemprop="image"` |

**El proyecto no tiene ni una sola imagen propia de MOVIRA.** Las ocho imágenes
de `assets/img/` son capturas de pantalla del sitio de EduTech Solutions LLC.
Dos de ellas están declaradas como imagen de vista previa de las páginas de
MOVIRA: al compartir el enlace de MOVIRA en WhatsApp, LinkedIn o Slack, la
tarjeta que aparece muestra la marca de otra empresa.

El único archivo con nombre MOVIRA (`Movira.png`) no es un logo de marca: es el
avatar circular que genera el hosting a partir del nombre del repositorio, con el
texto "Movira-landing" curvado en la parte inferior.

Ninguna etiqueta `<img>` del proyecto declara `width` ni `height`. Ninguna usa
`loading="lazy"`.

---

## 4. Dependencias externas

| Recurso | Versión | Origen | Observación |
|---|---|---|---|
| Font Awesome | 6.0.0 | cdnjs | En `index.html`, `en/index.html`, `terminos/`, `politica/` |
| Font Awesome | 6.4.0 | cdnjs | En `servicios/`, `en/services/` — **dos versiones distintas en el mismo sitio** |
| normalize.css | 8.0.1 | cdnjs | Cargado en las 8 páginas, sin `preload` |
| Inter | — | Google Fonts | Importada con `@import url(...)` **dentro** de `styles.css`, lo que serializa la petición: el navegador debe descargar y parsear el CSS antes de descubrir la fuente |

Las 8 páginas hacen `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`,
pero solo 2 hacen `preconnect` a `cdnjs.cloudflare.com`, que es de donde sale
Font Awesome — el recurso externo más pesado.

Font Awesome completo pesa unos 75 KB de CSS más los archivos de fuente
(≈ 400 KB si se cargan las tres familias). El sitio usa **48 iconos distintos**.

---

## 5. Enlaces rotos

Enlaces `href` a rutas que no existen en disco.

| Origen | Enlace | Aparece en | Destino |
|---|---|---|---|
| `index.html` | `soluciones/` | Nav desktop, nav móvil, 5× footer | **No existe** |
| `index.html` | `nosotros/` | Nav desktop, nav móvil, 5× footer | **No existe** |
| `index.html` | `contacto/` | Nav desktop, nav móvil | **No existe** |
| `index.html` | `acceso/` | Botón "Acceso" ×2 | **No existe** |
| `index.html` | `#contacto` | 5 CTA de servicio + 2 CTA de hero | **No existe la sección** |
| `index.html` | `#soluciones` | CTA principal del hero | **No existe** (la sección es `id="servicios"`) |
| `index.html` | `#` | "Ver Demo Completo", "Descargar Brochure" | Enlaces muertos |
| `en/index.html` | `solutions/` | Nav desktop, nav móvil, 5× footer | **No existe** |
| `en/index.html` | `about/` | Nav desktop, nav móvil, 5× footer | **No existe** |
| `en/index.html` | `contact/` | Nav desktop, nav móvil | **No existe** |
| `en/index.html` | `access/` | Botón "Access" ×2 | **No existe** |
| `en/index.html` | `terms/`, `policy/` | Footer legal | **No existen** (están en `en/terms/`, `en/policy/`, y son de EduTech) |
| `en/index.html` | `#solutions`, `#contact` | Hero y 5 CTA | **No existen** |
| `servicios/`, `terminos/`, `politica/` | `../nosotros/`, `../soporte/`, `../ingresar/` | Nav y footer | **No existen** |
| `en/services/`, `en/terms/`, `en/policy/` | `../about/`, `../support/`, `../login/` | Nav y footer | **No existen** |

Resumen: de los 4 elementos del menú principal de `index.html`, **3 llevan a
404**. El cuarto (`Inicio`) es `href="#"`. Los enlaces del footer de "Soluciones"
y "Empresa" son 10 entradas distintas que apuntan a solo 2 rutas, ambas
inexistentes.

---

## 6. Imágenes rotas

| Origen | `src` / `content` | Problema |
|---|---|---|
| `index.html` ×4 | `assets/icons/logo1.png` | **El archivo no existe.** 4 avatares de testimonio rotos |
| `en/index.html` ×4 | `assets/icons/logo1.png` | **El archivo no existe.** Y además la ruta es relativa a `/en/`, así que buscaría `en/assets/icons/logo1.png` |
| `index.html` | `og:image` → `assets/img/og-image.png` | El archivo real es `.jpg`, no `.png` |
| `en/index.html` | `og:image` → `assets/img/og-image.png` | Igual |
| `index.html` | JSON-LD `logo` → `assets/img/logo.png` | **No existe** |
| `index.html` | JSON-LD `screenshot` → `assets/img/platform-screenshot.jpg` | **No existe** |
| `en/index.html` | JSON-LD `logo`, `screenshot` | **No existen** |
| `en/index.html` ×4 | `assets/img/favicon/*` | **La carpeta `favicon/` no existe** |
| `servicios/`, `terminos/`, `politica/` y sus versiones EN ×6 | `../assets/img/favicon/*` | **No existe** |
| `terminos/`, `en/terms/` | `../assets/img/favicon/safari-pinned-tab.svg` | **No existe** |

Además, `index.html` declara `og:image:width` 1200 y `og:image:height` 630
mientras el archivo real mide 1920×997. Y declara `og:image:type` `image/jpg`,
que no es un tipo MIME válido (lo correcto es `image/jpeg`).

**Ninguna de las 8 páginas tiene un favicon que funcione**, salvo `index.html`,
que lo pide a una URL absoluta de un dominio de despliegue
(`https://movira-landing.vercel.app/assets/icons/Movira.png`) en lugar de una
ruta relativa.

---

## 7. CSS y JS referenciados que no existen

| Página | Referencia | Problema |
|---|---|---|
| `en/index.html` | `<link href="css/styles.css">` | Resuelve a `en/css/styles.css` — **no existe**. La página se sirve **sin ningún estilo** |
| `en/index.html` | `<script src="js/script.js">` | Resuelve a `en/js/script.js` — **no existe**. La página se sirve **sin ningún JavaScript** |

Este es el fallo más severo a nivel funcional: **la versión en inglés del sitio
está completamente rota**. Sin CSS y sin JS, se muestra como HTML plano sin
estilos, sin menú móvil, sin cambio de tema y sin acordeón de FAQ.

---

## 8. Reglas CSS duplicadas o nunca usadas

Dentro del mismo bloque `:root` de `css/styles.css`, estas variables se declaran
**dos veces** con el mismo valor: `--pure-white`, `--gradient-subtle`,
`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`. Seis declaraciones
muertas.

Otros hallazgos:

- **150+ media queries** repartidas por todo el archivo, todas `max-width`
  (desktop-first). Los mismos breakpoints (`768px`, `480px`) se reabren decenas
  de veces en lugar de agruparse.
- `* { transition: background-color, border-color, color, box-shadow }` aplica
  una transición al **selector universal**. Cada elemento de la página anima
  cuatro propiedades en cada repintado.
- El bloque `[data-theme="dark"]` de la línea 4446 ocupa **807 líneas** y repite
  selectores completos que ya se resuelven con las variables de
  `:root[data-theme=dark]`.
- CSS para componentes que no existen en ningún HTML: `.social-link`,
  `.scroll-indicator`, `.notification-*`, `.services-intro`, `.tech-badge`,
  `.highlight-list` (estos tres últimos solo existían en las páginas de EduTech).
- Selectores anidados de más de 3 niveles, herencia del Sass:
  `body .navbar .nav-container .nav-menu li a` y similares.
- 5 usos de `!important`.
- Paleta declarada en CSS: **azul** (`#1e40af` / `#3b82f6`). Paleta declarada en
  el `<meta name="theme-color">` del HTML: **naranja** (`#FF6B35`). No coinciden.
  El sitio se ve azul; el color de la barra del navegador en móvil sale naranja.

---

## 9. HTML duplicado entre páginas

| Bloque | Líneas por página | Páginas | Total duplicado |
|---|---|---|---|
| `<head>` (meta, OG, Twitter, JSON-LD) | ~300 | 8 | ~2.400 líneas |
| Nav + overlay + menú móvil | ~95 | 8 | ~760 líneas |
| Footer | ~115 | 8 | ~920 líneas |

`index.html` incluye **7 bloques `<script type="application/ld+json">`**
separados (Organization, SoftwareApplication, BreadcrumbList, FAQPage, Service,
Organization con AggregateRating, más los `itemprop`), que suman 240 de las 307
líneas del `<head>`. Dos de ellos declaran `@type: Organization` para la misma
entidad, con datos distintos.

No hay ningún mecanismo de plantillas: cada cambio en el nav o el footer hay que
replicarlo a mano en 8 archivos. Es la causa directa de que los enlaces del nav
diverjan entre páginas.

---

## 10. Contenido de relleno heredado del template original

### 10.1 Testimonios inventados

`index.html` y `en/index.html` incluyen 4 testimonios con nombre, cargo y empresa:

| Nombre | Cargo | Empresa |
|---|---|---|
| Ana Rodríguez / Anna Rodriguez | Directora de Operaciones | RetailMax Colombia |
| Carlos Mendoza | CEO & Fundador | TechStart Logistics |
| María Fernández / Maria Fernandez | Gerente de Supply Chain | IndustriasCorp |
| Roberto Silva | Director Comercial | ComercialPlus |

Ninguna de estas personas ni empresas aparece en ningún otro material del
proyecto. Los cuatro avatares apuntan a `assets/icons/logo1.png`, que no existe.

### 10.2 Datos estructurados de reseñas falsos

```json
"aggregateRating": { "ratingValue": "4.8", "reviewCount": "47" }
```

47 reseñas con nota media 4,8 declaradas en `schema.org` para una empresa cuyo
propio marcado dice `"foundingDate": "2024"`. Esto no es solo relleno: es
marcado de reseñas fabricado, que Google sanciona explícitamente y que puede
retirar el sitio de los resultados enriquecidos.

### 10.3 Datos de contacto de plantilla

| Dato | Valor | Evaluación |
|---|---|---|
| Teléfono | `+57 300 123 4567` | Secuencia `123 4567` — número de relleno |
| Dirección | "Bogotá, Colombia / Zona Empresarial Norte" | No es una dirección, es una descripción vaga |
| Email | `contacto@movira.com` / `contact@movira.com` | Coherente con el dominio; **verificar con el cliente** |
| Twitter | `@MOVIRA` | Declarado en `sameAs` y `twitter:site`; sin confirmar que exista |
| LinkedIn | `linkedin.com/company/movira` | Declarado en `sameAs`; sin confirmar que exista |

### 10.4 Otros restos

- `js/script.js` línea 611: `console.log('🚀 EduTech Navigation System loaded successfully')`
  se imprime en la consola de **las páginas de MOVIRA**.
- Clase CSS y sección HTML `tecdu-showcase` / `.tecdu-*` en las páginas de
  MOVIRA. "Tecdu" es el nombre del producto de EduTech (su sistema de gestión
  académica). 726 líneas de CSS bajo ese prefijo.
- Botones "Ver Demo Completo" y "Descargar Brochure" con `href="#"`. No hay
  demo ni brochure en el proyecto.
- Botón "Acceso" / "Access" hacia `acceso/` y `access/`. No existe ningún
  sistema de autenticación.
- Formulario de newsletter que **finge funcionar**: no hace `fetch` a ningún
  sitio, solo cambia el texto del botón a "¡Suscrito!" durante 3 segundos.
- Mockup de dashboard con métricas presentadas como reales: "247 Distribuidores
  Activos", "1.847 Entregas Este Mes", "98,2%".

---

## 11. Fallos de JavaScript

| Ubicación | Problema | Efecto |
|---|---|---|
| `js/script.js:9` y `js/script.js:512` | `initializeAnimations()` está **definida dos veces**. La segunda sobrescribe a la primera | `initializeHeroAnimations()`, `initializeAboutAnimations()` e `initializeFooter()` **nunca se ejecutan**. Los contadores del hero no animan |
| `js/script.js:1-4` | `document.getElementById('year').textContent` sin comprobar que el elemento exista | `TypeError` en cualquier página sin `#year` |
| `js/script.js:62,70,78` | Llama a `isValidEmail()` y `showNotification()`, que **solo están definidas en `general.js`** | Al enviar el formulario de newsletter: `ReferenceError: isValidEmail is not defined`. Y como está dentro de `initializeFooter()`, que nunca corre, el fallo queda latente |
| `js/script.js:639-640` | `InfiniteCarousel` accede a `this.nextBtn.addEventListener` sin comprobar que exista | `TypeError` en cualquier página sin carrusel |
| `js/script.js:709` | `slide.querySelector('.testimonial-card').classList` sin guarda | `TypeError` si falta la tarjeta |
| `js/script.js:778` | `item.querySelector('.faq-question').addEventListener` sin guarda | `TypeError` si falta la pregunta |
| `js/script.js:668` | Listener global de `keydown` en `document` que captura `ArrowLeft`/`ArrowRight` para el carrusel | **Secuestra las flechas del teclado en toda la página**: no se puede mover el cursor dentro del campo de email del newsletter |
| `js/script.js:196,301` | Dos listeners de `scroll` que escriben `element.style.transform` en cada frame | Parallax que fuerza *layout* continuo durante el scroll |
| `js/script.js` vs `js/general.js` | `initializeTheme`, `toggleTheme`, `updateThemeIcons`, `initializeMobileMenu`, `toggleMobileMenu`, `openMobileMenu`, `closeMobileMenu`, `initializeFooter`, `debounce`, `throttle` están **definidas en ambos** | Definiciones divergentes del mismo comportamiento en dos archivos |
| `js/general.js:69`, `js/script.js:413` | `const altIconClass` declarada y nunca leída | Código muerto |
| `js/general.js:303` | `initializeSmoothScroll()` hace `e.preventDefault()` en **todos** los `a[href^="#"]` | Rompe el scroll nativo de anclas cuando el destino no existe, que es el caso de todos los `#contacto` |
| Ambos archivos | Todo en el ámbito global: `currentTheme`, `navbar`, `mobileMenu`, `themeToggle`, `scheduleWork`, `observer`, `observerOptions`… | Colisión garantizada en las páginas que cargan los dos |

Ninguno de los dos archivos usa `defer`. Ambos se cargan al final de `<body>`.

---

## 12. Accesibilidad

| Regla | Estado |
|---|---|
| `lang` en `<html>` | Correcto en las 8 páginas |
| Un solo `<h1>` por página | **Falla** en `terminos/` y `en/terms/` (3 cada una) |
| `<main>` presente | **Falla** en las 8 páginas |
| Inputs con `<label>` | **Falla**: el campo de email del newsletter solo tiene `placeholder` |
| Foco visible | **Falla**: no hay ninguna regla `:focus-visible` en 4.547 líneas de CSS |
| `aria-label` en botones de solo icono | Parcial: los toggles de tema y el hamburguesa sí; `#prevBtn`, `#nextBtn` y los 4 `.indicator` del carrusel **no** |
| `aria-expanded` en el hamburguesa | **Falta** |
| Acordeón FAQ operable con teclado | **Falla**: `.faq-question` es un `<div>` con listener de `click`. No es enfocable ni activable con teclado |
| Contraste del texto secundario | `--text-muted: #94a3b8` sobre `#ffffff` da **2,8:1**. El mínimo es 4,5:1 |
| Áreas táctiles ≥ 44×44 px | **Falla**: los indicadores del carrusel miden 12×12 px |

---

## 13. Archivos basura

| Archivo | Motivo |
|---|---|
| `css/styles.css.map` | Artefacto de build (39 KB) |
| `servicios/css/styles.css.map` | Artefacto de build |
| `politica/css/styles.css.map` | Artefacto de build |
| `terminos/css/styles.css.map` | Artefacto de build |
| `Preguntas frecuentes(FAQ) MOVIRA.pdf` | Nombre con espacios y paréntesis en la raíz del sitio publicado. **El contenido sí es válido** — es material real de MOVIRA |
| `politica de privacidad simple (1).pdf` | Nombre con espacios y un `(1)` de descarga duplicada. **El contenido sí es válido** — es la política de privacidad real de MOVIRA |

No hay `node_modules`, `.DS_Store`, `Thumbs.db`, `.bak` ni archivos `final_v2`.
Tampoco hay `.gitignore`.

---

## 14. Material real de MOVIRA disponible

Los dos PDF de la raíz son la única fuente de contenido auténtico y verificable
del proyecto. Contradicen en parte lo que dice el HTML.

**`Preguntas frecuentes(FAQ) MOVIRA.pdf`** — 9 preguntas y respuestas reales:

- El producto es una red de **conductores independientes verificados** para
  **última milla**, no una red de "distribuidores externos" genérica.
- El público objetivo son **empresas logísticas y de última milla**.
- Movira **complementa**, no reemplaza, la operación logística del cliente.
- Cobro por **comisión acordada**; el conductor cobra automáticamente tras
  entrega verificada.
- Panel de **seguimiento en vivo**; **APIs de integración**.
- Opera **en Colombia**, con intención de escalar.
- Vía de entrada: **correo o WhatsApp**, luego reunión, y hay **programas piloto**.

**`politica de privacidad simple (1).pdf`** — Política de privacidad de MOVIRA
con fecha 25/06/2025. Cubre información recogida, uso, cookies, enlaces a
terceros y control de la información personal. Es real y publicable.

Ninguno de estos dos documentos está enlazado desde ninguna página del sitio.

---

## 15. Credenciales

Búsqueda sobre `*.html`, `*.js`, `*.css`, `*.scss`, `*.json`, `*.md` de:
`api_key`, `apikey`, `secret`, `token`, `password`, `bearer`, `authorization:`,
`AKIA`, `sk_live`, `sk_test`, `pk_live`, `ghp_`, `firebase`, `mongodb://`,
`postgres://`, `mysql://`.

**Resultado: 0 coincidencias.** No hay credenciales, claves ni tokens en el
código.

---

## 16. Rendimiento — primera carga de `index.html`

| Recurso | Peso | Bloquea render |
|---|---|---|
| `index.html` | 64 KB | — |
| `css/styles.css` | 132 KB | Sí |
| normalize.css (cdnjs) | 3 KB | Sí |
| Font Awesome 6.0.0 (cdnjs) | ~75 KB CSS + fuentes | Sí |
| Inter (Google Fonts, vía `@import`) | ~100 KB | Sí, en cascada tras el CSS |
| `js/script.js` | 28 KB | Sí (sin `defer`) |
| **Total aproximado** | **~400 KB** | |

Bajo el objetivo de 1 MB, pero con **4 peticiones bloqueantes a 2 dominios
externos** y una cadena de dependencias en serie (`styles.css` → `@import` de
Google Fonts). El `<link rel="preload" href="css/styles.css">` seguido del
`<link rel="stylesheet">` al mismo archivo provoca que el navegador registre una
advertencia de recurso precargado sin usar.

---

## 17. Resumen — 5 líneas

1. **Qué es**: una landing bilingüe (ES/EN) para MOVIRA, plataforma colombiana
   que conecta empresas de logística con una red de conductores independientes
   verificados para resolver la última milla sin comprar flota.
2. **Estado**: 2 de 8 páginas son de MOVIRA; las otras 6 son el sitio completo de
   otro cliente, **EduTech Solutions LLC**, incluidas sus páginas legales con su
   razón social, su dirección en Wyoming y su correo de soporte.
3. **Lo más grave**: la **versión en inglés no carga ni CSS ni JS** (rutas
   relativas mal resueltas: pide `en/css/styles.css`, que no existe), y las
   **8 imágenes del proyecto son capturas del sitio de EduTech**, dos de ellas
   declaradas como imagen de vista previa de MOVIRA — al compartir el enlace en
   redes aparece la marca de otra empresa.
4. **Segundo más grave**: contenido fabricado con apariencia de real —
   4 testimonios con nombre y empresa inventados, y marcado `schema.org` con
   `aggregateRating` de 4,8 sobre 47 reseñas para una empresa fundada en 2024.
5. **Lo bueno**: existe material auténtico sin usar. Los dos PDF de la raíz
   contienen 9 preguntas frecuentes reales y la política de privacidad real de
   MOVIRA, ninguno enlazado desde el sitio. Y no hay ni una credencial en el
   código.
