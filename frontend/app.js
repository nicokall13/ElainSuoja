const API = "/api";
// Mikä sivu auki
const page = window.location.pathname;

// Etusivu eläin listan lataus
if (page === "/" || page.includes("index.html")) {
  // API kutsu server-b
  fetch(`${API}/animals`)
    .then((res) => res.json())
    .then((animals) => {
      const list = document.getElementById("animalList");

      // Eläinkorttien generointi
      list.innerHTML = animals
        .map((a) => {
          const img =
            a.image && a.image.trim() !== ""
              ? `/kuvat/${a.image}`
              : "/kuvat/tulossa.png";

          return `
             <div class="card">
                <img src="${img}">
                <h3>${a.name}</h3>
                <p>${a.type}, ${a.age} v</p>
                <button onclick="viewAnimal(${a.id})">Katso lisää</button>
            </div>
          `;
        })
        .join("");
    });
}
// Siirtyminen omalle sivulle
function viewAnimal(id) {
  window.location = `animal.html?id=${id}`;
}

// Eläinsivu haetaan url id perusteella
if (page.endsWith("animal.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  //Yksittäinen eläin tiedot
  fetch(`${API}/animals/${id}`)
    .then((res) => res.json())
    .then((a) => {
      // Tässä AI apuna
      const img =
        a.image && a.image.trim() !== ""
          ? `/kuvat/${a.image}`
          : "/kuvat/tulossa.png";

      document.getElementById("details").innerHTML = `
            <img src="${img}">
            <h2>${a.name}</h2>
            <p><strong>Ikä:</strong> ${a.age}</p>
            <p><strong>Rotu:</strong> ${a.breed}</p>
            <p>${a.description}</p>
            <p><strong>Status:</strong> ${a.status}</p>
        `;
    });
  // Lomake
  document.getElementById("adoptForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      adopterName: document.getElementById("name").value,
      email: document.getElementById("email").value,
    };
    // Postaa adoptio ja näytä kiitos
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
          alert(result.error);
        }
      });
  });
}
