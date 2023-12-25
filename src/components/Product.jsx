"use client";
import React, { useState } from "react";

function Product({ data: product, id: index }) {
  const [likeCount, setLikeCount] = useState(0);
  const [showBtns, setShowBtns] = useState(false);
  const [choosenProduct, setChoosenProduct] = useState(1);

  const showAllInfoAboutProduct = (id) => {
    setShowBtns(true);
    setChoosenProduct(id);
    console.log(id + 1);
  };

  const showProductFunc=()=>{
    
  }
  return (
    <div
      key={index}
      onClick={() => showAllInfoAboutProduct(index)}
      className="product relative mx-3 my-5 hover:cursor-pointer border p-3 text-center rounded-lg bg-white w-[250px] "
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9-DKqJQY99UjwaGmzSmLUr5RS5n7IIeadg&usqp=CAU"
        alt=""
        className="mx-auto"
      />
      <div className="info dark:text-black">
        <div className="flex p-5 pb-0 justify-between">
          <p className="text-semibold flex items-center">
            ${product?.price}
            <del className="text-gray-400 ml-1 text-[14px]">
              ${product?.price + 100}
            </del>
          </p>
          <button
            className="border p-1  rounded-md"
            onClick={() => setLikeCount(likeCount + 1)}
          >
            🤍 <span>{likeCount ? likeCount : ""}</span>
          </button>
        </div>
        <div className="flex items-center">
          <svg
            className="ml-5"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="15"
            viewBox="0 0 80 15"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M72 12.0553L76.944 15L75.632 9.45L80 5.71579L74.248 5.23421L72 0L69.752 5.23421L64 5.71579L68.368 9.45L67.056 15L72 12.0553Z"
              fill="#D5CDC5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M56 12.0553L60.944 15L59.632 9.45L64 5.71579L58.248 5.23421L56 0L53.752 5.23421L48 5.71579L52.368 9.45L51.056 15L56 12.0553Z"
              fill="#FF9017"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40 12.0553L44.944 15L43.632 9.45L48 5.71579L42.248 5.23421L40 0L37.752 5.23421L32 5.71579L36.368 9.45L35.056 15L40 12.0553Z"
              fill="#FF9017"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 12.0553L28.944 15L27.632 9.45L32 5.71579L26.248 5.23421L24 0L21.752 5.23421L16 5.71579L20.368 9.45L19.056 15L24 12.0553Z"
              fill="#FF9017"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 12.0553L12.944 15L11.632 9.45L16 5.71579L10.248 5.23421L8 0L5.752 5.23421L0 5.71579L4.368 9.45L3.056 15L8 12.0553Z"
              fill="#FF9017"
            />
          </svg>
          <p className="text-[14px] ml-2 text-[#FF9017]">7.5</p>
        </div>
        <p className=" text-gray-500 ml-5 mt-1 text-left text-[16px]">
          {product?.name}
        </p>
      </div>
      {showBtns && choosenProduct === index ? (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 "
          style={{ backgroundColor: "rgba(0,0,0,0.4" }}
        >
          <div className="flex justify-around  mt-[270px] items-center ">
            <button className="border p-2 px-5 rounded-[20px]" onClick={()=>showProductFunc(index)}>Show</button>
            <button className="border p-2 px-3 rounded-[20px] ">
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Product;
