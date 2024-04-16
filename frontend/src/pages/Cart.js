import React from "react";
import { useSelector } from "react-redux";
import Cartproduct from "../components/Cartproduct";
import emptygif from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.products.cartItem);
  // console.log(cartData);
  const totalprice = cartData.reduce((acc, curr) => {
    return acc + parseInt(curr.total);
  }, 0);
  const totalqty = cartData.reduce((acc, curr) => {
    return acc + parseInt(curr.qty);
  }, 0);

  const makePayment = async()=>{
    if(user.email){


            navigate("/success");
            setTimeout(()=>{
              navigate("/");
              window.location.reload();
            },3000);
            
    }
    else{
      toast("Order placed successfully");
      setTimeout(()=>{
        navigate("/home");
      },2000);
    }

    }

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-2xl md:text-4xl text-slate-600">
        Your Cart Items are{" "}
      </h2>
      {/* display cartItems */}
      {console.log(cartData)}
      {cartData[0] ? (
        <div className="my-4 flex gap-4">
          <div className="w-full max-w-3xl">
            {cartData.map((el) => {
              return (
                <Cartproduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  price={el.price}
                  total={el.total}
                  category={el.category}
                  image={el.image}
                  qty={el.qty}
                />
              );
            })}
          </div>
          
          <div className="w-full max-w-md shadow ml-auto max-h-[280px] rounded">
            <h2 className="p-2 bg-slate-500 text-white text-center text-lg rounded">
              Cart Summary
            </h2>
            <div className="w-full flex py-2 text-lg border-b">
              <p className="p-2 font-semibold">Total Quantity</p>
              <p className="ml-auto w-24">{totalqty}</p>
            </div>
            <div className="w-full flex py-2 text-lg border-b">
              <p className="p-2 font-semibold">Total Price</p>
              <p className="ml-auto w-28 text-lg">
                <span className="text-red-500 font-bold">₹ </span>
                {totalprice}
              </p>
            </div>
            <button
              className="w-full bg-red-500 text-lg font-semibold text-white p-2 capitalize my-2 rounded"
              onClick={makePayment}
            >
              pay now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full flex-col">
          <img src={emptygif} alt="emptygif" className="w-full max-w-md" />
          <p className="text-2xl -my-8 font-semibold text-center">
            Your Cart Is Empty...
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
