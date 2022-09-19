import arrowDown from "../assets/svg/arrow-down.svg";

function DropdownMenu() {
  return (
    <img
      className="toggler"
      src={arrowDown}
      alt=""
      style={{ cursor: "pointer" }}
    />
  );
}

export default DropdownMenu;
