import "./SideBar.css";

function SideBar({ user }) {
  return (
    <aside className="sidebar">
      <img className="sidebar__avatar" src={user.avatar} alt={user.name} />
      <p className="sidebar__name">{user.name}</p>
    </aside>
  );
}

export default SideBar;
