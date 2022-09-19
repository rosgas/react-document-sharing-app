import NotificationsBell from "./NotificationsBell";
import Account from "../components/Account";
import DropdownMenu from "./DropdownMenu";

function ProfileNav() {
  return (
    <div className="profile-nav">
      <NotificationsBell />
      <Account />
      <DropdownMenu />
    </div>
  );
}

export default ProfileNav;
