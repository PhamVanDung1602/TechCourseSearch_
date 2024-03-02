import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EnrolledCourseCard from "./components/EnrolledCourseCard";
import { Link, useLocation} from "react-router-dom";
import UserInfoCard_User from "./components/UserInfoCard";

interface CardProps {
  id: number;
  title: string;
  url: string
  component: React.ReactNode;
}

function AccountInfoPage() {
  const cardData: CardProps[] = [
    // eslint-disable-next-line react/jsx-pascal-case
    { id: 1, title: "Thông tin người dùng", url: "/account/info", component: <UserInfoCard_User /> },
    { id: 2, title: "Khóa học tham gia", url: "/account/enrolled-course", component: <EnrolledCourseCard /> },

  ];

  const [selectedCardId, setSelectedCardId] = useState(cardData[0].id); // Set the initial state to the id of the first card;
  const location = useLocation();
  const handleClickCard = (id: number, url: String) => {
    setSelectedCardId(id);
  }

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedCard = cardData.find((card) => card.url === currentPath);
    if (selectedCard) {
      setSelectedCardId(selectedCard.id);
    }
  }, [location.pathname]);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-3">
            <div>
              {cardData.map((card) => (
                <Link
                  key={card.id}
                  to={card.url}
                  style={{ textDecoration: "none" }}
                  onClick={() => handleClickCard(card.id, card.url)}
                  className={location.pathname === card.url ? "active" : ""}
                >
                  <div>
                    <Card className="Card">
                      <div className="Card-content">
                        <span className="Card-text">{card.title}</span>
                        <span className="Card-arrow">&#10140;</span>
                      </div>
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-9">
            <Card>
              <Card.Body>
                {cardData.map((card) => (
                  selectedCardId === card.id && (
                    <div key={card.id}>
                      {card.component}
                    </div>
                  )
                ))}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section >
  );
}

export default AccountInfoPage