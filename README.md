# HANGMAN

## 1. Introducción
Hangman o "El ahorcado", como se le conoce en español, es un juego en el cual se debe adivinar una palabra escondida aleatoria. El juego empieza con una línea en la que se visualiza el número de letras que tiene la palabra y un dibujo de una horca. El jugador tiene múltiples intentos para adivinar la palabra, letra por letra. Si acierta, se muestra la posición o posiciones de la letra seleccionada en la palabra, y si falla, se dibuja una parte de un muñeco de palos bajo la horca. El jugador pierde si el dibujo del muñeco de palos se completa, y gana si acierta todas las letras antes de que el dibujo se complete.
## 2. Juego
En esta versión del clásico juego, la partida empieza en el momento en que un jugador ejecuta el cliente, el cual se conecta automáticamente al servidor y obtiene una palabra aleatoria del mismo, quien la obtiene a través de una API. Todos los jugadores que se conecten subsecuentemente juegan la misma partida. El servidor admite hasta a 3 jugadores al mismo tiempo, quienes reciben la misma palabra que el jugador inicial. También reciben el mismo estado de la partida, es decir, todas las letras que han sido desbloqueadas y el dibujo del muñeco en la horca por donde iba antes de conectarse.
Los jugadores se pueden conectar y desconectar en cualquier momento, y pueden jugar cuando quieran. Pero **cuidado**, ya que al igual que el acierto de un jugador cuenta para todos, también lo hace el fallo, así que tendrán que trabajar en equipo si quieren evitar perder.
Para terminar la partida, solo tendrán que salir todos los jugadores. Después de que hayan salido todos, podrán iniciar una partida nueva ejecutando el cliente otra vez.
## 3. Instalación y ejecución
Para correr el servidor localmente, simplemente necesitará clonar el repositorio en la ubicación que desee. Todas las dependencias están incluídas. Después, entrar en la carpeta "server" desde el terminal e iniciar el servidor ejecutando el comando "npm start". Por último, deberá iniciar el cliente. Para ello se recomienda especialmente instalar la extensión "Live Server" de Ritwick Dey en VSCode. Una vez instalada, abrir la pestaña del explorador, hacer clic derecho en el "index.html" de la carpeta "cliente" y elegir "Open with Live Server". Esto montará el cliente en el puerto 5500 de su host y abrirá automáticamente una instancia del mismo (si no la abre automáticamente, ir a su localhost en el puerto 5500 desde su navegador de preferencia). A partir de ahí, podrá abrir hasta dos instancias más del cliente y jugar en multijugador.
## 4. Créditos
- API de las palabras (https://pow-3bae6d63ret5.deno.dev/word): Rafael Lara Campos.
- ws (https://github.com/websockets/ws): Luigi Pinca, et al.
- **Resto del proyecto: este servidor.**
- *acredítame donde lo uses.*
- *o no.*
- *soy programador, no policía.*
