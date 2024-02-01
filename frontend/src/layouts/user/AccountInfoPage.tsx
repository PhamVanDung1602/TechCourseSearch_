import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserInfoCard from "./components/UserInfoCard";


interface CardProps {
  title: string;
}
const CardInfo: React.FC<CardProps> = (props) => {
  return (
    <Card className="Card">
      <div className="Card-content">
        <span className="Card-text">{props.title}</span>
        <span className="Card-arrow">&#10140;</span>
      </div>
    </Card>
  );
}
function AccountInfoPage() {
  const cardData = [
    { id: 1, title: "Thông tin người dùng" },
    { id: 2, title: "Khóa học tham gia" },
    { id: 3, title: "Khóa học tự tạo" },
    { id: 4, title: "Danh sách yêu thích" },
    { id: 5, title: "Lịch sử tìm kiếm" },
    { id: 6, title: "Đánh giá và phản hồi" },
  ];

  const [selectedCardId, setSelectedCardId] = useState(cardData[0].id); // Set the initial state to the id of the first card;
  const handleClickCard = (id: number) => {
    setSelectedCardId(id);
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-3">
            <div>
              {cardData.map((card) => (
                <Link
                  key={card.id}
                  to=""
                  style={{ textDecoration: "none" }}
                  onClick={() => handleClickCard(card.id)}
                >
                  <div>
                    <CardInfo key={card.id} title={card.title} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-9">
            <Card>
              <Card.Body>
                {selectedCardId === 1 && <UserInfoCard />}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section >
  );
}

export default AccountInfoPage