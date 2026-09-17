# Nuestro Aniversario 💛

Álbum digital animado para un aniversario de 10 años, pensado para verse en
el celular: pantalla de inicio con música, un libro interactivo que se pasa
con el dedo, zoom en las fotos y una frase final animada. Íconos con
[`@lucide/svelte`](https://lucide.dev).

## Cómo personalizar

### 1. Tu canción

Reemplaza el archivo en `src/lib/assets/music/` (o cambia el nombre
importado en [`src/lib/data/config.ts`](src/lib/data/config.ts) →
`audioSrc`). Empieza en silencio y sube de volumen suavemente en 5 segundos
al tocar el botón de la pantalla de inicio. Puedes ajustar la duración del
fundido (`fadeInMs`) y el volumen final (`targetVolume`) en ese mismo
archivo.

### 2. El texto de inicio

En [`src/lib/data/config.ts`](src/lib/data/config.ts) cambia `eyebrow`,
`title`, `subtitle` y `cta` por lo que quieras que se vea antes de abrir el
álbum.

### 3. Tus fotos y páginas

Todo el contenido del álbum vive en
[`src/lib/data/pages.ts`](src/lib/data/pages.ts):

1. Copia tus fotos dentro de `src/lib/assets/photos/`.
2. Impórtalas arriba del archivo (como las que ya están) y úsalas en
   `albumPages`.
3. Cada página puede tener las fotos que quieras — el diseño se acomoda
   solo: si son exactamente 3, se muestran apiladas una encima de otra; si
   son 2, 4 o 5, en collage tipo scrapbook.
4. Cada foto admite un `caption` opcional (la notita escrita a mano) y un
   `rotate` opcional en grados (si no lo pones, se usa una inclinación por
   defecto). Al tocar la foto, el zoom gira desde ese ángulo hasta 0°.

### 4. La frase final

También en `pages.ts`, en `finalMessageLines`. Está dividida en líneas para
que aparezcan una por una animadas; únelas con un espacio para ver el texto
completo.

## Desarrollo

```sh
npm install
npm run dev -- --open --host
```

La app está diseñada solo para mobile. Con el servidor corriendo, ábrela en
tu teléfono en `http://<tu-ip-local>:5173` (misma red Wi-Fi) para probar el
gesto de deslizar con el dedo y el zoom táctil.

## Producción

```sh
npm run build
npm run preview
```

> Para publicarlo en internet (y poder abrirlo desde cualquier lado el día
> del aniversario), instala un [adapter](https://svelte.dev/docs/kit/adapters)
> según dónde lo quieras alojar (Vercel, Netlify, etc.).
