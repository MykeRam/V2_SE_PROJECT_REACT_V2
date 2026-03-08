import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
