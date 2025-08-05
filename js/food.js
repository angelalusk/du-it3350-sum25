console.log("✅ Connected to food.js!");

const appId = "a4d8d4a4"; // Replace with your Nutritionix App ID
const appKey = "b05d803a2597212e9a749bb57c321855"; // Replace with your Nutritionix App Key

function searchFood() {
  const food = document.getElementById("foodInput").value;
  console.log("🔍 Searching for food:", food);

  fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": appId,
      "x-app-key": appKey
    },
    body: JSON.stringify({ query: food })
  })
  .then(res => {
    console.log("📡 Response received:", res);
    return res.json();
  })
  .then(data => {
    console.log("📦 Parsed data:", data);

    const item = data.foods[0];
    console.log("🍽️ First food item:", item);

    const description = `
      <div class="card">
        <h2>Food: ${item.serving_unit} ${item.food_name}</h2>
        Qty: ${item.serving_qty} Calories: ${item.nf_calories} <br>
        Fat: ${item.nf_total_fat}g Sugar: ${item.nf_sugars}g <br>
        Protein: ${item.nf_protein}g
      </div>
    `;

    document.getElementById("results").innerHTML = description;
  })
  .catch(err => {
    console.error("❌ Error occurred:", err);
    document.getElementById("results").innerHTML = "Oops! Something went wrong.";
  });
}
