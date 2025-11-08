async function loadData() {
  const res = await fetch("/.netlify/functions/load");
  const data = await res.json();

  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  data.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.value}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("save").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const value = document.getElementById("value").value;

  // carrega o json atual
  const current = await (await fetch("/.netlify/functions/load")).json();

  // adiciona item novo
  current.push({ name, value });

  // salva
  await fetch("/.netlify/functions/save", {
    method: "POST",
    body: JSON.stringify(current)
  });

  loadData();
});

loadData();
