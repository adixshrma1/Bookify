import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

const Card = (props) => {
  const { getImgURL } = useFirebase();

  const [URL, setURL] = useState(null);

  useEffect(() => {
    getImgURL(props.path).then((url) => setURL(url));
  }, []);
  return (
    <div className="p-4 rounded-md shadow cursor-pointer">
      <img src={URL} className="rounded-md" />
      <div className="mt-3 text-center">
        <p className="text-lg">{props.name}</p>
        <p className="font-light">Price Rs {props.price}/-</p>
      </div>
    </div>
  );
};

export default Card;
