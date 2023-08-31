//fetching from API
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((res) => res.json())
  .then((data) => {
    displayItems(
      data?.categories,
      "strCategory",
      "strCategory",
      "strCategoryThumb",
      "handleClickByCategory"
    );
  });

const dispalyDetails = (data) => {
  const area = document.getElementById("items_area");
  const items = document.createElement("div");
  area.innerHTML = "";
  const item = `
              <div class="singleItem_div">
                <p>Item Name: ${data?.strMeal}</p>
              </div>
              `;
  items.innerHTML = item;
  area.appendChild(items);
};

const handleSingleItem = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      dispalyDetails(data?.meals[0]);
    });
};

const displayItems = (data, id, name, image, functionCall) => {
  const area = document.getElementById("items_area");
  area.innerHTML = "";
  if (data?.length) {
    data?.map((element) => {
      const items = document.createElement("div");
      const item = `
            <div class="items" onclick="${functionCall}('${element[id]}')">
              <img class="item_image" alt="" src=${element[image]}>
              <p class="item_name">${element[name]}</p>
            </div>
            `;
      items.innerHTML = item;
      area.appendChild(items);
    });
  } else {
    area.innerHTML = `<p class="not_found">No match Found...!</p>`;
  }
};

const handleClickByCategory = (category) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((data) => {
      displayItems(
        data?.meals,
        "idMeal",
        "strMeal",
        "strMealThumb",
        "handleSingleItem"
      );
    });
};

const handleSearch = () => {
  const query = document.getElementById("search_input");
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`)
    .then((res) => res.json())
    .then((data) => {
      displayItems(
        data?.meals,
        "idMeal",
        "strMeal",
        "strMealThumb",
        "handleSingleItem"
      );
    });
  query.value = "";
};
