# state-machine

npm install
node index.js

Deberá comenzar un webserver en http://localhost:3000

Para realizar requests:

POST http://localhost:3000/scooters

body:
{
  "serial": Int,
  "action": ["C" | "D" | "M" | "S"]
}



