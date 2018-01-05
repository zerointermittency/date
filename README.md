# Bienvenido

Base para el manejo de fechas para cualquier proyecto.

## Instalación

```bash
yarn add @zerointermittency/date
# npm i --save @zerointermittency/date
```

## Api

El modulo extiende una clase de **[Date][date]** (objeto nativo de javascript para manipular fechas), para poder hacer algunas validaciones y hacer mas sencillo algunas operaciones concurrentes.

##### Iniciar

Funciona igual que **[Date][date]**, se instancia un objeto como se hace a continuación

```javascript
const ZIDate = require('@zerointermittency/date');
let date = new ZIDate();
```

> puede o no recibir un parámetro al ser instanciado, para mayor información ver la documentación de **[Date][date]**

##### Método **toISOString**

Se sobrescribe este método para cuando sea utilizado no tenga mili segundos.

```javascript
let dateDefault = new Date(1505865600000);
dateDefault.toISOString(); // 2017-09-20T00:00:00.000Z

const ZIDate = require('@zerointermittency/date'),
    dateNunchee = new ZIDate(1505865600000);
dateNunchee.toISOString(); // 2017-09-20T00:00:00Z
```

##### Método estático **toISOString**

Realiza la misma función que el método anterior pero recibe como parámetro una instancia de **Date** o **ZIDate**.

```javascript
const dateDefault = new Date(1505865600000);
ZIDate.toISOString(dateDefault); // 2017-09-20T00:00:00Z
```

##### Método **add**

```javascript
const ZIDate = require('@zerointermittency/date'),
    date = new ZIDate();
date.add(140); // mutable
const newDate = date.add(140, true); //inmutable
```

Este método es el que nos permite manipular la fecha y agregarle los segundos que necesitemos por parámetro. En el ejemplo anterior se le agregar 140 segundos a la fecha (mutable), retorna el mismo objeto modificado o se le agrega los mismos 140 pero devuelve un nuevo objeto **[Date][date]** (inmutable).

##### Método **substract**

```javascript
const ZIDate = require('@zerointermittency/date'),
    date = new ZIDate();
date.substract(140); // mutable
const newDate = date.substract(140, true); //inmutable
```

Este método es simplemente el inverso de **add**, ya que en vez de agregar segundos los quita.

##### Método **diff**

```javascript
const date1 = new ZIDate(1505865600000), // 2017-09-20T00:00:00Z
    date2 = new ZIDate(1504224000000); // 2017-09-01T00:00:00Z
date1.diff(date2); // 1641600 segundos => 19 días
date1.diff(date2, 'day'); // 19 días
date1.diff(date2, 'D'); // 19 días
```

Este método entrega la diferencia entre las fechas, es positivo si la fecha pasada por parámetro es menor y es un número negativo si es mayor. El segundo parámetro determina el tipo de periodo en el cual se evaluá.

> Los periodos de comparación aceptados son [year|Y, month|M, day|D, hour|h, minute|m, second|s], default **second**

##### Método **before**

```javascript
const date1 = new ZIDate(1505865600000), // 2017-09-20T00:00:00Z
    date2 = new ZIDate(1504224000000); // 2017-09-01T00:00:00Z
date1.before(date2); // false
date2.before(date1); // true
```

Este método entrega si una fecha es anterior a otra, se analiza si la fecha pasada por parámetro es mayor. Retorna verdadero o falso según corresponda.

##### Método **after**

```javascript
const date1 = new ZIDate(1505865600000), // 2017-09-20T00:00:00Z
    date2 = new ZIDate(1504224000000); // 2017-09-01T00:00:00Z
date1.after(date2); // false
date2.after(date1); // true
```

Este método entrega si una fecha es posterior a otra, se analiza si la fecha pasada por parámetro es menor. Retorna verdadero o falso según corresponda.

##### Método **equal**

```javascript
const date1 = new ZIDate(1505865600000), // 2017-09-20T00:00:00Z
    date2 = new ZIDate(1504224000000); // 2017-09-01T00:00:00Z
date2.equal(date1); // false
date1.equal(date1); // true
date1.equal(date1, 'seconds'); // true
date1.equal(date2, 'month'); // true
```

Este método entrega si una fecha es igual a otra, se analiza dependiendo del periodo que se pasa en el segundo parámetro.

> Los periodos de comparación aceptados son [year|Y, month|M, day|D, hour|h, minute|m, second|s], default **second**

## Pruebas funcionales (Unit Testing)

Se llevaron a cabo las pruebas funcionales de todos los métodos agregados a **[Date][date]** de javascript, para ejecutar las pruebas:

```bash
yarn test
```

## Pruebas de rendimiento (benchmark)

Con el objetivo de que sea optimo el código se comparo la funcionalidad con una de las librerías mas utilizadas para el manejo de fechas como lo es [moment][moment] pruebas de rendimiento, de las cuales se determino que:

- Utilizar de manera nativa los métodos de **[Date][date]** es muchísimo mas eficiente que utilizar moment, ya que este al poseer demasiadas funcionalidades sobrecarga su instanciación y deja de ser optimo para cuando se desea utilizar de manera recurrente:

```bash
yarn benchmark benchmark/moment-date.js
```

```
init moment x 1,518,778 ops/sec ±4.48% (82 runs sampled)
init date x 5,212,516 ops/sec ±3.04% (87 runs sampled)
Fastest is init date
moment format x 93,716 ops/sec ±1.20% (89 runs sampled)
date toISOString x 2,371,054 ops/sec ±0.89% (92 runs sampled)
Fastest is date toISOString
moment add seconds x 847,563 ops/sec ±1.18% (87 runs sampled)
date add seconds inmutable x 2,821,352 ops/sec ±0.76% (92 runs sampled)
Fastest is date add seconds inmutable
moment isSame x 263,861 ops/sec ±1.01% (91 runs sampled)
ZIDate equal x 730,118 ops/sec ±0.95% (92 runs sampled)
Fastest is ZIDate equal
diff instaces x 2,322,656 ops/sec ±0.96% (90 runs sampled)
diff with getTime() x 4,231,257 ops/sec ±1.02% (91 runs sampled)
Fastest is diff with getTime()
```

- Utilizar el método **[Math.trunc][trunc]** es mucho mas optimo que realizar un **[parseInt][parseInt]**:

```bash
yarn benchmark benchmark/MathTrunc-parseInt.js
```

```
Math.trunc x 578,506,072 ops/sec ±1.02% (90 runs sampled)
parseInt x 51,519,302 ops/sec ±4.34% (86 runs sampled)
Fastest is Math.trunc
```

## Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

### [Unreleased]

### [1.0.0] - 2018-01-04
#### Added
- Se agregan pruebas funcionales con el objetivo de tener probado todo el código, usando [istanbul js][istanbul] para saber cuanto
- Se crea clase que extiende **Date**, para así no interferir con el uso de esta funcionalidades nativa.
- Se agregar método **substract**, para quitar segundos a la fecha
- Se agregar método **add**, para agregar segundos a la fecha
- Se agregar método **diff**, para obtener la diferencia con otro objeto **Date**, según el periodo que se necesite ya sea comparar días, horas, minutos y segundos
- Se agregar método **equal**, para validar si es igual a otro objeto **Date**, según el periodo que se necesite ya sea comparar año, mes, día, hora, minuto y segundo
- Se agregar método **before**, para validar si antes a otro objeto **Date**
- Se agregar método **after**, para validar si después a otro objeto **Date**
- Modificación de la función **toISOString** de **Date**, para utilizar el formato ISO sin los mili segundos
- Se clona el método **toISOString** para que funcione de manera estática
- README.md instalación, pruebas y uso
- Errores estandarizados y basados en [@zerointermittency/error][zerointermittency-error]

[zerointermittency-error]: https://www.npmjs.com/package/@zerointermittency/error
[moment]: https://momentjs.com
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[dependency-versions]: https://yarnpkg.com/en/docs/dependency-versions#toc-semantic-versioning
[template-literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[string-operator]: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Assignment_Operators
[string-concat]: https://www.w3schools.com/jsref/jsref_concat_string.asp
[trunc]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
[parseInt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
[contributing]: https://bitbucket.org/smartbox_way/nunchee-js/src/master/CONTRIBUTING.md
[istanbul]: https://istanbul.js.org/