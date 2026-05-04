# Fase 1: Mobile Session Quick Logging

## Objetivo

Reducir la friccion al registrar una sesion diaria en movil dentro de la pantalla actual de entrenamiento.

La Fase 1 debe permitir que el usuario:

- vea el progreso del dia de un vistazo
- navegue ejercicios con menos scroll
- registre peso rapidamente
- marcar ejercicios como hechos con menos toques
- avanzar al siguiente ejercicio sin perder contexto

## Problema Actual

La vista actual del dia usa tarjetas grandes por ejercicio. En movil esto genera:

- demasiada altura vertical
- demasiados campos visibles al mismo tiempo
- mas scroll del necesario
- flujo lento para registrar peso y marcar completado

La app funciona, pero se siente como un editor general y no como una herramienta de sesion.

## Alcance

Esta fase cambia solo la experiencia de uso del dia de entrenamiento.

Incluye:

- lista compacta de ejercicios para movil
- un solo ejercicio expandido a la vez
- editor rapido inline para peso, nota libre y estado completado
- accion principal `Guardar y siguiente`
- progreso visible del dia

No incluye:

- chips de notas rapidas
- repetir ultimo peso
- nuevos campos persistidos
- cambios en Google Sheets
- historico por sesion

## Enfoque Elegido

Se mantiene la vista actual de semana y dia, pero el contenido del dia pasa de tarjetas grandes a una lista compacta con expansion por ejercicio.

Cada fila muestra:

- nombre del ejercicio
- resumen corto del objetivo: sets, reps y descanso
- estado visual del ejercicio
- peso actual si existe

Al tocar una fila:

- se expande el editor rapido
- cualquier otro ejercicio abierto se colapsa
- el usuario puede editar peso y nota
- el usuario puede marcar `Hecho`
- el usuario puede usar `Guardar y siguiente`

## Flujo de Interaccion

1. El usuario entra en un dia del plan.
2. Ve la lista compacta de ejercicios.
3. Toca un ejercicio para abrirlo.
4. Edita peso y, si quiere, nota libre.
5. Pulsa `Hecho` o `Guardar y siguiente`.
6. La app guarda inmediatamente en estado local.
7. Si uso `Guardar y siguiente`, el siguiente ejercicio del dia se abre automaticamente.

## Componentes

### `TrainingPlanView`

Responsable de:

- mantener seleccion de semana
- mantener seleccion de dia
- calcular progreso del dia
- decidir que ejercicio esta abierto

### `ExerciseCompactRow`

Responsable de:

- renderizar resumen de cada ejercicio
- indicar estado `pendiente` o `hecho`
- actuar como disparador del editor

### `ExerciseQuickEditor`

Responsable de:

- editar `weight`
- editar `notes`
- cambiar `completed`
- exponer acciones `Hecho` y `Guardar y siguiente`

## Datos y Estado

No se cambia el shape persistido del plan.

Se reutilizan estos campos ya existentes:

- `weight`
- `notes`
- `completed`

Se anade solo estado de UI local, no persistido:

- `expandedExerciseId`

`Guardar y siguiente` no crea un nuevo modelo. Solo:

- guarda los cambios del ejercicio actual
- busca el siguiente ejercicio del dia
- cambia el ejercicio expandido a ese siguiente elemento

Si no hay siguiente ejercicio:

- el actual puede cerrarse
- o quedarse abierto marcando que el dia esta completo

Para esta fase, la decision explicita es cerrar el editor al finalizar el ultimo ejercicio.

## Diseño de Interfaz

En movil:

- filas compactas y tactiles
- editor con pocos controles
- peso como input principal
- nota libre debajo
- botones de accion grandes

Orden visual del editor:

1. nombre del ejercicio
2. resumen del objetivo
3. input de peso
4. input de nota
5. boton `Hecho`
6. boton principal `Guardar y siguiente`

En desktop:

- se conserva la misma estructura funcional
- no hace falta una version completamente distinta
- la lista puede seguir ocupando todo el ancho de contenido

## Reglas de Comportamiento

- Solo puede haber un ejercicio expandido al mismo tiempo.
- Tocar una fila cerrada la abre.
- Tocar una fila abierta la puede cerrar.
- `Hecho` actualiza `completed` sin requerir peso o nota.
- `Guardar y siguiente` guarda el estado actual y abre el siguiente ejercicio.
- Los cambios siguen persistiendo mediante `localStorage`.
- La sincronizacion con Sheets no cambia en esta fase.

## Errores y Casos Limite

- Si un ejercicio no tiene `weight`, el input queda vacio y editable.
- Si un ejercicio no tiene `notes`, el input queda vacio y editable.
- Si el usuario refresca la pagina, el estado del plan persiste como ahora.
- Si no hay siguiente ejercicio, `Guardar y siguiente` no debe fallar.
- Si un dia no tiene ejercicios, la vista debe mostrar un estado vacio simple.

## Testing

Validaciones minimas:

- render de lista compacta por dia
- abrir y cerrar ejercicio
- solo un editor abierto a la vez
- editar peso
- editar nota
- marcar hecho
- `Guardar y siguiente` abre el siguiente correcto
- el ultimo ejercicio no rompe el flujo
- persistencia en `localStorage`

## Criterios de Exito

La fase se considera correcta si:

- la sesion diaria requiere menos scroll en movil
- registrar peso y completado requiere menos interaccion que hoy
- el flujo entre ejercicios es continuo
- no se rompe la persistencia existente
- no se rompe `lint` ni `build`

## Fuera de Alcance Inmediato

Quedan para fases posteriores:

- chips de notas rapidas
- repetir ultimo peso
- CTA de continuar sesion
- historico de pesos por ejercicio
- exportacion o sync enriquecido
