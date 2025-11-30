🐾 Eläinsuoja – Web-sovellus

Eläinsuoja on yksinkertainen verkkosovellus, jossa käyttäjä voi selata eläimiä, tarkastella niiden tietoja sekä lähettää adoptiohakemuksen. Ylläpitäjä voi tarkastella adoptioita ja hallinnoida dataa erillisen admin-rajapinnan kautta.

Sovellus koostuu frontendistä sekä kahdesta Node.js-palvelimesta, jotka toimivat Docker Compose -ympäristössä.

📁 Projektin rakenne
frontend/      – HTML, CSS, JavaScript, Nginx  
server-a/      – Julkinen API (eläimet, adoptiohakemus)  
server-b/      – Admin API (hakemusten tallennus)  
data/          – animals.json, adoptions.json, kuvat  
docker-compose.yml

🛠 Käytetyt teknologiat

Node.js + Express

Nginx

Docker & Docker Compose

HTML, CSS, JavaScript

🚀 Asennus ja käynnistys
Vaatimukset

Docker

Docker Compose

Käynnistys

Projektin juuressa suorita:

docker compose up --build


Sovellus käynnistyy osoitteeseen:

👉 http://localhost:8080

🔗 Reitit
Osa	URL
Frontend	http://localhost:8080

Julkinen API (server-a)	http://localhost:8080/api

Admin API (server-b)	http://localhost:8080/admin

📦 Data

data/-kansiosta löytyy:

animals.json — eläinten tiedot

adoptions.json — tallennetut adoptiohakemukset

kuvat/ — eläinten kuvat

👤 Tekijä

Nico Kallioniemi
Eläinsuoja-projekti — Web-palvelujen toteutus
