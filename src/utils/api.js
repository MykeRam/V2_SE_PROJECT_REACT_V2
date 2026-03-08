const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Request failed: ${res.status}`));
  }

  return res.json();
}

function normalizeItem(item) {
  return {
    ...item,
    _id: item._id ?? item.id,
    imageUrl: item.imageUrl ?? item.link,
    link: item.link ?? item.imageUrl,
  };
}

function getItems() {
  return fetch(`${BASE_URL}/items`)
    .then(checkResponse)
    .then((items) => items.map(normalizeItem));
}

function addItem(itemData) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: itemData.name,
      weather: itemData.weather,
      imageUrl: itemData.imageUrl,
    }),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

function deleteItem(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(new Error(`Request failed: ${res.status}`));
    }

    return itemId;
  });
}

export { getItems, addItem, deleteItem };
