import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const OrderDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { getOrders, isLoggedIn } = useFirebase();
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (isLoggedIn) {
      getOrders(bookId).then((res) => setOrders(res.docs));
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  if (orders === null)
    return <h1 className="mt-20 w-[70%] mx-auto">Loading...</h1>;
  return (
    <div className="mt-20 w-[70%] mx-auto">
        <h1 className="text-4xl my-5">Orders</h1>
      {orders.length === 0 ? (
        <p>No one has ordered this book yet.</p>
      ) : (
        <div>
          {orders.map((user) => (
            <div key={user.data().time} className="border-2 border-gray-500 rounded p-4">
              <p>Name: {user.data().name}</p>
              <p>Email: {user.data().email}</p>
              <p>Quantity: {user.data().quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
