import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Details = () => {
  const { bookId } = useParams();
  const { viewBook, getImgURL, placeOrder, isLoggedIn } = useFirebase();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if(isLoggedIn)
      viewBook(bookId).then((res) => setData(res.data()));
    else navigate('/')
  }, []);

  useEffect(() => {
    if (data !== null) {
      getImgURL(data.path).then((url) => setImgURL(url));
    }
  }, [data]);

  const handlePlaceOrder = async () => {
    const data = await placeOrder(bookId, quantity);
    console.log(data); // testing...
  };

  useEffect(() => {
    console.log(data); // for development purpose
  }, [data]);

  if (data === null)
    return <h1 className="mt-20 w-[70%] mx-auto">Loading...</h1>;
  return (
    <div className="h-screen w-[50%] mx-auto flex justify-between items-center">
      <div className="basis-[45%]">
        <img className="rounded" src={imgURL} alt="" />
      </div>
      <div className="basis-[45%] ">
        <h1 className="mb-5 text-2xl">Book Details</h1>
        <p>Name: {data.name}</p>
        <p>Price: Rs {data.price}/-</p>
        <p>ISBN: {data.isbn}</p>

        <h1 className="mt-10 mb-5 text-2xl">Owner Details</h1>
        <div className="flex items-center gap-2">
          <img className="w-7 rounded-full" src={data.userImg} alt="" />
          <p className="text-lg">{data.username}</p>
        </div>
        <p>{data.email}</p>
        <div className="mt-5">
          <label className="">Quantity: </label>
          <input className="border px-2 py-1 rounded" type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Details;
