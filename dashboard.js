
// Show Add Medicine form
document.getElementById("show-add").addEventListener("click", () => {
  document.getElementById("add-section").classList.remove("hidden");
  document.getElementById("search-section").classList.add("hidden");
});

// Show Search Medicine form
document.getElementById("show-search").addEventListener("click", () => {
  document.getElementById("search-section").classList.remove("hidden");
  document.getElementById("add-section").classList.add("hidden");
});

// Add Medicine Logic
document.getElementById("medicine-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("med-name").value.trim();
  const manufacture = document.getElementById("med-manufacture").value;
  const expiry = document.getElementById("med-expiry").value;
  const price = document.getElementById("med-price").value;

  if (!name || !manufacture || !expiry || !price) {
    alert("Please fill all fields");
    return;
  }

  let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
  const existing = medicines.find(med => med.name.toLowerCase() === name.toLowerCase());

  if (existing) {
    alert("Medicine already exists!");
    return;
  }

  medicines.push({ name, manufacture, expiry, price });
  localStorage.setItem("medicines", JSON.stringify(medicines));
  alert("Medicine added successfully!");

  this.reset();
});

// Search Medicine
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const resultDiv = document.getElementById("search-result");
  resultDiv.innerHTML = "";

  const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
  const med = medicines.find(m => m.name.toLowerCase() === query);

  if (!med) {
    resultDiv.innerHTML = `<p class="text-red-600 font-medium">Medicine not found.</p>`;
    return;
  }

  const expiryDate = new Date(med.expiry);
  const today = new Date();
  const isExpired = expiryDate < today;

  resultDiv.innerHTML = `
    <div class="bg-white p-4 rounded shadow">
      <h3 class="text-xl font-semibold mb-2">${med.name}</h3>
      <p><strong>Manufacturing Date:</strong> ${new Date(med.manufacture).toDateString()}</p>
      <p><strong>Expiry Date:</strong> ${new Date(med.expiry).toDateString()}</p>
      <p><strong>Price:</strong> $${parseFloat(med.price).toFixed(2)}</p>
      ${isExpired ? '<p class="text-red-600 font-bold mt-2">⚠️ This medicine is expired.</p>' : ''}
    </div>
  `;
});
