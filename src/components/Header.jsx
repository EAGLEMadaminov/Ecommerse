import React from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Link from "next/link";
import axios from "axios";
axios.defaults.baseURL = "http://locolhost:5050";
import { useGlobalContext } from "@/context";

function Header() {
  const { setAllProductsList } = useGlobalContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let serach = e.target[0].value;
    try {
      let { data } = await axios.get(`/products/?q=${serach}`);
      setAllProductsList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    e.target[0].value = "";
  };

  return (
    <div className="fixed w-full z-[2] bg-white py-5   flex justify-between">
      <div className="container  flex justify-between mx-auto">
        <Image
          width={150}
          height={50}
          className="w-auto h-auto"
          src={Logo}
          alt="logo png"
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Search"
            className="border w-[500px] dark:text-black border-blue-600 p-2 rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 px-3 rounded-r-lg"
          >
            Search
          </button>
        </form>
        <button className="text-gray-400 flex flex-col  items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-heart-fill "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
          <Link href="/order">Orders</Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
