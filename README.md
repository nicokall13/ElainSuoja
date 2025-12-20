Eläinsuoja – Web-sovellus
Tämä projekti on eläinsuojan verkkosovellus, jossa käyttäjä voi selata eläimiä, tarkastella niiden tietoja ja lähettää adoptiohakemuksia. Ylläpitäjä voi tarkastella saapuneita hakemuksia erillisen Admin-rajapinnan kautta.

Sovellus on toteutettu mikropalveluarkkitehtuurilla, ja se koostuu frontendistä sekä kahdesta Node.js-palvelimesta, jotka toimivat Docker Compose -ympäristössä. Datan hallinnassa on siirrytty staattisista tiedostoista dynaamiseen SQLite-tietokantaan.

Projektin rakenne
frontend/ – HTML, CSS, JS ja Nginx-konfiguraatio.

server-a/ – Julkinen API (eläinten haku ja adoptiohakemusten vastaanotto).

server-b/ – Admin API (hakemusten lukeminen tietokannasta).

data/ – SQLite-tietokanta (elainsuoja.db) ja eläinten kuvat.

scripts_and_data/ – Alkuperäiset JSON-tiedostot ja migraatioskriptit.

docker-compose.yml – Konttiympäristön määritykset.

Teknologiat
Node.js + Express (Backend-palvelimet)

SQLite (Relaatiotietokanta)

Nginx (Reverse Proxy ja Frontendin tarjoilu)

Docker & Docker Compose (Kontitusteknologia)

HTML, CSS, JavaScript (Frontend)

Asennus ja käynnistys
Vaatimukset
Docker

Docker Compose

Käynnistys
Projektin juuressa suorita komento:

Bash

docker compose up --build
Sovellus käynnistyy ja on käytettävissä osoitteessa: http://localhost:8080

Reitit
Frontend: http://localhost:8080 – Pääsivu ja eläinten selaus.

API (Server-A): http://localhost:8080/api – Eläintiedot ja adoptioiden lähetys.

Admin API (Server-B): http://localhost:8080/admin/adoptions – Adoptiohakemusten tarkastelu.

Data ja tietokanta
Sovellus käyttää dynaamista SQLite-tietokantaa, joka on sijoitettu jaettuun Docker-volumeen.

Tietokanta: data/elainsuoja.db sisältää taulut animals ja adoptions.

SQL JOIN: Admin-näkymässä hyödynnetään SQL-liitoksia yhdistämään hakemukset ja eläinten nimet dynaamisesti.

Kuvat: Eläinten kuvat sijaitsevat data/kuvat/-hakemistossa. Sovelluksessa on automaattinen "fallback"-logiikka puuttuville kuville (tulossa.png).

Tekijä
Nico Kallioniemi Eläinsuoja-projekti — Web-palvelujen toteutus
