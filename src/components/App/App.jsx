import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getWeather } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { addItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const user = {
    name: "Myke",
    avatar:
      "https://comicbook.com/wp-content/uploads/sites/4/2021/09/f07f8eed57dbf719fa539475e6e3f399.jpeg",
  };

  const [weatherData, setWeatherData] = useState({
    temperature: { F: 72, C: 22 },
    location: "New York",
    type: "warm",
    timeOfDay: "day",
    weatherType: "sunny",
  });

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleAddItemSubmit(newItem, resetForm) {
    addItem(newItem)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteClick(card) {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  const weatherFilteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          weatherData={weatherData}
          onAddClick={handleAddClick}
          user={user}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                clothingItems={weatherFilteredItems}
                onCardClick={handleCardClick}
                onAddClick={handleAddClick}
              />
            }
          />
        </Routes>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onClose={handleCloseModal}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onDeleteClick={handleDeleteClick}
          onClose={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
