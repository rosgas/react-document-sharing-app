import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function CollectionItem({ item, id, setIsShown }) {
  const name = item.fullName;
  const firstLetterName = name.charAt(0);

  const uploadedTime = new Date(item.timestamp.seconds * 1000);
  const formatUploadedTime = uploadedTime
    .toLocaleDateString("sv")
    .replaceAll("-", "");
  const relativeUploadedTime = moment(
    `${formatUploadedTime}`,
    "YYYYMMDD"
  ).fromNow();

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${id}`);
    /* setIsShown(false); */
  }

  return (
    <div className="item-card" onClick={handleClick}>
      <header className="item-header">
        <div className="author-image">{firstLetterName}</div>
        <div>
          <p className="author-name title">{item.fullName}</p>
          <p className="author-job-title">{item.jobTitle}</p>
        </div>
        <div className="item-relative-date">{relativeUploadedTime}</div>
      </header>
      <section className="item-image">
        <img src={item.imgUrl} alt={item.name} />
      </section>
      <section className="item-details">
        <p className="item-name">{item.name}</p>
        <p className="item-project-name">{item.project}</p>
      </section>
      <footer className="card-footer">
        <p className="item-comments">n comments</p>
        <p className="item-shares">n shares</p>
      </footer>
    </div>
  );
}

export default CollectionItem;
