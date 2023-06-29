# Proyecto final para la carrera de Desarrollo Web Full-Stack

Echo con 💚 y 🧉 por Juan Pedraza [Polibyus](https://github.com/Polibyus)

## Un poco sobre esto

La rubrica del mismo pedia realizar el backend de una aplicacion e-commerce para poder vender productos de un rubro a eleccion. Yo elegi poder vender productos impresos en 3D.
En si, uno de los desafios mas grandes a nivel personal, muchos conceptos nuevos, mucha logica que aplicar y tambien el entramado camino del backend, con algunos tropezones en el camino lo pude llevar adelante.
Se que hay muchisimas mejoras que hacerle. Me enfoque en cumplir las rubricas y (aunque no lo pedia) darle un poquito mas de estilo en la parte del front.

## Funcionalidad del sitio

En si esta bastante amigable la creacion de cuentas, lo cual permite decidir si uno es moderador o no para que el profesor pueda probar la aplicacion en todo su ancho. Tiene un inicio con una frase y luego es simple, un lugar donde ver los productos, si sos moderador, en el mismo listado podras editar y borrar los mismos. Un apartado para cargar dichos productos y un chat en tiempo real donde todos los usuarios pueden dejar sus mensajes y consultas, el moderador tambien tiene un boton especifico para eliminar todos los mensajes, en caso de que se acumulen o su uso sea inadecuado. La funcion de carrito, es experimental, ya que si bien funciona y completa la orden, debido a un problema con NodeMailer (dependencia que debia usar para finalizar la orden) no se esta efectuando el envio del mail, aunque si dicha orden se carga en la base de datos.

## Cosas a mejorar/errores conocidos

- Las fotos en el chat son iguales para todos. Debe cambiar segun el usuario y tambien la posicion del msg enviado por uno mismo deberia verse a la derecha. (Mas estetica de chat)
- La pagina inicial donde se elige singup o login, esta demasiado simple (Un poco mas de estilo che!)
- Node Mailer no me funciono como esperaba con el mail de google a configurar (no aparece dicha funcion en mi cuenta de google). Esto significa que:
    - No se envian mails en funcion a la creacion de cuentas.
    - No se envian mails cuando una orden es completada.
- La vista de productos en forma de lista podria ser mejorada.
- El logo del carrito podria llevar un conteo de sus cantidades.

## Link a Render donde se puede utilizar la app (actualizado junio 2023)

[Shop of Roll](https://proyecto-final-backend-xyxc.onrender.com)

## El sitio

Mi hermano tiene un proyecto personal donde imprime figuras en una impresora 3D, la verdad que es todo un arte lo que hace y sentia que no lo estaba podiendo explotar por la falta de difusión, lo cual pense que seria genial solucionar con un sitio web mostrando lo que hace. El cual hice la maqueta en el curso de desarrollo web [War of Roll](https://polibyus.github.io/War-of-Roll/). Al ser solo maquetado no tiene la funcionalidad, pero cumplio con lo requerido. Despues en el curso de JS quise meter un poco lo personal y programe un jueguito el cual permite obtener un descuento en la compra de un producto [Roll Adventure](https://polibyus.github.io/Roll-Adventure/). Luego con React para poder practicar el uso de esta herramienta [Old Shop of Roll](https://shop-of-roll.vercel.app/) complete un e-commerce funcional. En esta oportunidad cree el backend de una aplicacion de ecommerce.

## Sobre mi

Mi nombre es Juan Pedraza, Llevo 2 años en la programacion, mas que nada practicando, viendo, probando y aprendiendo, actualmente finalizando (con este proyecto) la carrera de Full Stack en [Coder House](https://www.coderhouse.com/). Atento a cualquier comentario que ayude a mejorar y aprender.

## Final

Agradezco que se hayan tomado el tiempo de pasar a leer y revisar. Les mando un fuerte abrazo y espero les haya gustado mi trabajo. Adios!!!
