function addItem(itemData) {
  const newItem = {
    _id: Date.now(),
    name: itemData.name,
    weather: itemData.weather,
    link: itemData.link,
  };

  return Promise.resolve(newItem);
}

function deleteItem(itemId) {
  return Promise.resolve(itemId);
}

export { addItem, deleteItem };
