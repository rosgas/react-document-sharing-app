import { getAuth } from "firebase/auth";

function Account() {
  const auth = getAuth();

  const name = auth.currentUser.displayName;
  const firstName = name.replace(/ .*/, "");
  const firstLetterName = firstName.substring(0, 1);

  return (
    <>
      <div className="account">
        <div className="account-image">{firstLetterName}</div>
        <p className="account-name">Hi {firstName}</p>
      </div>
    </>
  );
}

export default Account;
