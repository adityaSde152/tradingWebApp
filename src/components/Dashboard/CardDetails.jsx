import { useState } from "react";
import { Link } from "react-router-dom";
import AddCardModal from "./AddCardModal";

const CardDetails = ({ isEditing, setIsEditing }) => {
  const [cards, setCards] = useState([
    {
      cardNumber: "4111111111111111",
      cardHolderName: "John Doe",
      expiryDate: "09/28",
      cvv: "123",
      type: "Visa",
    },
    {
      cardNumber: "5500000000000004",
      cardHolderName: "Jane Smith",
      expiryDate: "05/27",
      cvv: "456",
      type: "MasterCard",
    },
    {
      cardNumber: "340000000000009",
      cardHolderName: "Michael Johnson",
      expiryDate: "12/29",
      cvv: "789",
      type: "Amex",
    },
    {
      cardNumber: "6011000000000004",
      cardHolderName: "Emily Brown",
      expiryDate: "03/26",
      cvv: "321",
      type: "Discover",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" bg-gray-800 p-6 rounded-2xl">
      <div className="flex justify-between">
        <h1 className=" font-semibold mb-6 text-xl text-green">My Cards</h1>
        <div className="flex justify-center items-center gap-2 font-semibold mb-6 text-green">
          <p>{cards.length} Cards</p>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="border border-gray-50 rounded-md px-2 py-1 bg-black text-white cursor-pointer"
          >
            {isModalOpen ? "Close" : "Add more cards"}
          </button>
        </div>
      </div>
      {/*Modal */}
      {isModalOpen && (
        <AddCardModal setCards={setCards} setIsModalOpen={setIsModalOpen} />
      )}
      <div className="grid  grid-flow-col gap-6 h-66 overflow-auto scrollbar-hide">
        {cards.map((card, index) => (
          <div
            key={index}
            className=" bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 text-green rounded-2xl p-6 w-110 shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">{card.type}</h2>
            <p className="text-xl tracking-widest mb-4">
              {card.cardNumber?.replace(/(\d{4})(?=\d)/g, "$1 ")}
            </p>
            <div className="flex  justify-between items-center">
              <div>
                <p className="text-xs">Card Holder</p>
                <p className="font-semibold">{card.cardHolderName}</p>
              </div>
              <div>
                <p className="text-xs">Expires</p>
                <p className="font-semibold">{card.expiryDate}</p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-xs">CVV</p>
              <p className="font-semibold">{card.cvv}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
