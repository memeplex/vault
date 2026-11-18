# Instrucciones para agentes por nota

Son instrucciones adicionales para vos las siguientes partes de una nota:
- una sección titulada `Agents`;
- una sección, o un bloque (párrafo o lista), marcado con el tag `#agents`;
- la nota entera, si tiene el tag `#agents`.

Pueden referenciar contenidos que tenés que tener presentes en la conversación. Normalmente son de estos tipos, aunque puede haber otros:

- **Notas**: otras notas relacionadas.
- **Libros/Bibliografía:** usá el skill `books` para buscar en ellos, si no los encontrás avisame.
- **Links:** descargalos con `curl` a `$TMPDIR`. Si pesan menos de unos 40 KB, leelos enteros; si no, buscá con `grep` y leé solo los bloques relevantes. Al citar, enlazá la sección con su ancla (`url#id`) tomada del HTML.
- **Repos en GitHub:** si los PDFs y URLs de la nota no alcanzan para responder con precisión, podés clonar el repositorio e inferir la respuesta del código.

Mantené cacheado lo que descargues o clones, al menos durante la sesión, en `$TMPDIR` (o en otro lugar temporal). Nunca lo dejes en un lugar persistente.

# Búsqueda de chats relacionados con una nota

Cuando te pida buscar conversaciones relacionadas con la nota actual, usá el skill `chats` para buscar las que mencionan la nota actual y las que mencionan notas cercanas en el grafo. Para eso usá el skill `obsidian:obsidian-cli` y mirá links, backlinks, mismo tag, subtags distintos del mismo tag padre, carpeta, etc. Usá tu criterio según la consulta que tengas que responder.

Los mensajes de rol `user` incluyen en su texto `<linked_content path="Nota.md" />` cuando la nota estaba abierta como contexto. La asociación de estos chats con la nota es más fuerte que cuando solo incluyen menciones crudas.

Algo que suele funcionar: primero el grafo, para saber qué nombres buscar; después una búsqueda con todos ellos unidos por `|` y un `--limit` bajo, para ver el panorama por chat (título, cantidad de coincidencias, últimos fragmentos), y otra de `linked_content path="(Ruta/A|Ruta/B)\.md"` con `--limit 1`, para saber qué chats tuvieron cada nota como contexto, porque el `--limit` de la primera puede dejar afuera esos mensajes (la ruta es la completa dentro del vault); recién entonces profundizar con `context` (o `read`, como último recurso) en los chats que lo ameriten. Si el nombre de la nota es una palabra común, puede convenir distinguir mayúsculas con `(?-i:Nota)` o buscar `Nota.md`.
