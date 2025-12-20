const API = "/api";
const page = window.location.pathname;

// ETUSIVUN LOGIIKKA (index.html)
if (page === "/" || page.includes("index.html")) {
  fetch(`${API}/animals`)
    .then((res) => res.json())
    .then((animals) => {
      const list = document.getElementById("animalList");
      if (!list) return;

      list.innerHTML = animals
        .map((a) => {
          // Tarkistetaan onko kuvaa, muuten käytetään oletuskuvaa
          const img =
            a.image && a.image.trim() !== ""
              ? `/kuvat/${a.image}`
              : "/kuvat/tulossa.png";

          return `
            <div class="card">
                <img src="${img}" alt="${a.name}">
                <h3>${a.name}</h3>
                <p>${a.type}, ${a.age} v</p>
                <button onclick="viewAnimal(${a.id})">Katso lisää</button>
            </div>
          `;
        })
        .join("");
    });
}

// Funktio siirtymiseen eläimen omalle sivulle
function viewAnimal(id) {
  window.location = `animal.html?id=${id}`;
}

// 2. ELÄINSIVUN LOGIIKKA (animal.html)
if (page.endsWith("animal.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    // Haetaan yksittäisen eläimen tiedot
    fetch(`${API}/animals/${id}`)
      .then((res) => res.json())
      .then((a) => {
        const img =
          a.image && a.image.trim() !== ""
            ? `/kuvat/${a.image}`
            : "/kuvat/tulossa.png";

        const details = document.getElementById("details");
        if (details) {
          details.innerHTML = `
            <img src="${img}" alt="${a.name}" class="main-img">
            <h2>${a.name}</h2>
            <p><strong>Ikä:</strong> ${a.age} vuotta</p>
            <p><strong>Rotu:</strong> ${a.breed}</p>
            <p><strong>Laji:</strong> ${a.type}</p>
            <p class="description">${a.description}</p>
            <p><strong>Status:</strong> ${a.status}</p>
          `;
        }
      });

    // 3. ADOPTIOLOMAKKEEN LÄHETYS
    const adoptForm = document.getElementById("adoptForm");
    if (adoptForm) {
      adoptForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = {
          adopterName: document.getElementById("name").value,
          email: document.getElementById("email").value,
        };

        // Lähetetään POST-pyyntö Server-A:lle
        fetch(`${API}/animals/${id}/adopt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              window.location = "thankyou.html";
            } else {
              alert("Virhe: " + (result.error || "Tallennus epäonnistui"));
            }
          })
          .catch((err) => console.error("Lähetysvirhe:", err));
      });
    }
  }
}
