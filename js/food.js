console.log("✅ We are connected to food.js!");

const appId = "a4d8d4a4"; // Replace with your Nutritionix App ID
const appKey = "b05d803a2597212e9a749bb57c321855"; // Replace with your Nutritionix App Key

function searchFood() {
  const food = document.getElementById("foodInput").value;
  console.log("Searching for food(s):", food);

  // Extract quantity from the beginning of the input
  const quantityMatch = food.match(/^\s*(\d+)/);
  debugger; // Pause here to inspect quantity

  if (quantityMatch) {
    const quantity = parseInt(quantityMatch[1]);
    console.log("Quantity entered:", quantity);

    if (quantity > 10) {
      alert("Please enter a quantity of 10 or less.");
      return;
    }
  }

  // Continue with fetch if quantity is valid
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
    console.log("Food response is received:", res);
    return res.json();
  })
  .then(data => {
    console.log("Here is the parsed data:", data);

    const item = data.foods[0];
    console.log("Here is the food item returned:", item);

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
    console.error("We have an error.", err);
    document.getElementById("results").innerHTML = "Oops! Something went wrong.";
  });
}
