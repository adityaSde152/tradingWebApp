// import React from 'react'

// const CardDetails = () => {
//   return (
//     <section className='text-white bg-gray-800 p-6 rounded-lg'>
//         <h3 className='text-green font-semibold'>Card details</h3>
//         <div>

//         </div>
//     </section>
//   )
// }

// export default CardDetails
import React from "react";

const cards = [
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
];

const CardDetails = () => {
  return (
    <div className=" bg-gray-800 p-6 rounded-2xl">
      <div className="flex justify-between">
        <h1 className=" font-semibold mb-6 text-xl text-green">My Cards</h1>
        <h1 className=" font-semibold mb-6 text-green">
          {cards.length} Cards{" "}
          <button className="cursor-pointer bg-green/20 px-2 py-1 rounded-2xl">
            View All
          </button>
        </h1>
      </div>
      <div className="grid  grid-flow-col gap-6 h-66 overflow-auto scrollbar-hide">
        {cards.map((card, index) => (
          <div
            key={index}
            className=" bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 text-green rounded-2xl p-6 w-110 shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">{card.type}</h2>
            <p className="text-xl tracking-widest mb-4">
              {card.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
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
