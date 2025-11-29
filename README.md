Eläinsuoja – Web-sovellus

Tämä projekti on yksinkertainen eläinsuojan verkkosovellus, jossa käyttäjä voi selata eläimiä, tarkastella niiden tietoja ja lähettää adoptiohakemuksen. Ylläpitäjä voi tarkastella adoptioita ja hallinnoida dataa.
Sovellus koostuu frontendistä sekä kahdesta Node.js-palvelimesta, jotka toimivat Docker Compose -ympäristössä.

Projektin rakenne
frontend/ – HTML, CSS, JS, Nginx
server-a/ – Julkinen API (eläimet, adoptiohakemus)
server-b/ – Admin API (hakemusten tallennus)
data/ – animals.json, adoptions.json ja kuvat
docker-compose.yml

Teknologiat
Node.js + Express
Nginx
Docker & Docker Compose
HTML, CSS, JavaScript

Asennus ja käynnistys
Vaatimukset
Docker
Docker Compose

Käynnistys
Projektin juuressa:
docker compose up --build
Sovellus käynnistyy osoitteeseen: http://localhost:8080

Reitit
Frontend: http://localhost:8080
API (server-a): http://localhost:8080/api
Admin API (server-b): http://localhost:8080/admin

Data
data/-kansiossa sijaitsevat:
animals.json — eläinten tiedot
adoptions.json — tallennettavat adoptiohakemukset
kuvat/ — kuvahakemisto eläinten kuville

Tekijä
Nico Kallioniemi
Eläinsuoja-projekti — Web palvelujen toteutus
