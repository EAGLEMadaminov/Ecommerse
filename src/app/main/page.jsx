"use client";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import Panel from "@/components/Panel";
import FooterComponent from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050";
import { useGlobalContext } from "@/context";
import Product from "@/components/Product";

export default function MainPage() {
  const [optionNum, setOptionNum] = useState(10);
  const [active, setActive] = useState(false);
  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const {
    allProductsList,
    setAllProductsList,
    setCategorylist,
    setAllCategoryList,
    setBrandList,
    setAllbrands,
    setFeatiresList,
    setAllFeatures,
    deleteFunc,
    showSearch,
    setShowSearch,
    page,
    setPage,
  } = useGlobalContext();

  console.log(page);
  let pageArray = new Array(page).fill("❤");

  const getAllCategory = async () => {
    try {
      let { data } = await axios.get("/categories");
      const all = data.slice(4);
      const list = data.slice(0, 4);
      setCategorylist(list);
      setAllCategoryList(all);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrands = async () => {
    try {
      let { data: brands } = await axios.get("/product_brands");
      const all = brands.slice(4);
      const list = brands.slice(0, 4);
      setBrandList(list);
      setAllbrands(all);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeatures = async () => {
    const { data: features } = await axios.get("/product_features");
    const four = features.splice(0, 4);
    const all = features.slice(4);
    setFeatiresList(four);
    setAllFeatures(all);
  };

  const showProductsByNumFunc = async (num) => {
    setPageNum(num);
    let { data } = await axios.get("/products");
    if (num > 1) {
      setDisablePrevBtn(false);
    } else if (num == 1) {
      setDisablePrevBtn(true);
    }

    if (num == 5) {
      setDisableNextBtn(true);
    } else if (num < 5) {
      setDisableNextBtn(false);
    }

    let array = [];
    if (Number(optionNum) === 10) {
      array = data.slice(num * 10 - optionNum, optionNum * num);
      setAllProductsList(array);
    } else if (Number(optionNum) === 20) {
      array = data.slice(num * 20 - optionNum, optionNum * num);
      setAllProductsList(array);
    }
  };

  const showPrevFunc = async () => {
    const { data } = await axios.get("/products");

    if (pageNum == 1) {
      setDisablePrevBtn(true);
      return;
    }
    setPageNum(pageNum - 1);

    let newA = [];

    if (Number(optionNum) === 10) {
      newA = data.slice((pageNum - 1) * 10 - 10, (pageNum - 1) * 10);
      setAllProductsList(newA);
    } else if (Number(optionNum) === 20) {
      newA = data.slice((pageNum - 1) * 20 - 20, (pageNum - 1) * 20);
      setAllProductsList(newA);
    }
  };

  const showProductsByPageFunc = async (e) => {
    setOptionNum(e.target.value);
    let { data } = await axios.get("/products");
    let newArray = data.slice(0, e.target.value);
    let num = Math.ceil(data.length / newArray.length);
    setPage(num);
    setAllProductsList(newArray);
  };

  const showNextFunc = async () => {
    let { data } = await axios.get("/products");

    if (pageNum == 5) {
      setDisableNextBtn(true);
      return;
    }
    setPageNum(pageNum + 1);

    let newA = [];

    if (Number(optionNum) === 10) {
      newA = data.slice((pageNum + 1) * 10 - 10, (pageNum + 1) * 10);
      setAllProductsList(newA);
    } else if (Number(optionNum) === 20) {
      newA = data.slice((pageNum + 1) * 20 - 20, (pageNum + 1) * 20);
      setAllProductsList(newA);
    }
    console.log(newA);
  };

  useEffect(() => {
    getAllCategory();
    getBrands();
    getFeatures();
  }, []);

  return (
    <div className="dark:bg-white">
      <Header />

      <Panel />

      {showSearch.length > 0 ? (
        <div className="flex gap-3 ml-[320px] pt-[100px]">
          {showSearch.map((item, index) => {
            return (
              <div
                key={index}
                className="border p-1 px-2 rounded-lg border-blue-500 dark:text-black"
              >
                {item}{" "}
                <button
                  className="ml-2 text-gray-400"
                  onClick={() => deleteFunc(item)}
                >
                  ✖
                </button>
              </div>
            );
          })}
          <button className="text-blue-600 " onClick={() => setShowSearch([])}>
            Clear all filter
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="products flex-wrap ml-[320px] pt-[100px] flex justify-around ">
        {allProductsList?.map((product, index) => {
          return <Product key={index} data={product} id={index} />;
        })}
      </div>
      <div className="container">
        <div className="choose flex justify-end dark:text-black">
          <select className="p-2 " onChange={showProductsByPageFunc}>
            <option value="10" className="p-2">
              Show 10
            </option>
            <option value="20" className="p-2">
              Show 20
            </option>
            <option value="50" className="p-2">
              Show 50
            </option>
          </select>
          <div className="page-select">
            <button
              className={`p-1 border px-[10px] rounded-l-lg ${
                disablePrevBtn ? "text-gray-500" : ""
              } `}
              disabled={disablePrevBtn}
              onClick={showPrevFunc}
            >
              ◀
            </button>
            {pageArray.map((one, index) => {
              return (
                <button
                  key={index}
                  className={`p-1 border px-3 ${
                    pageNum - 1 === index ? "bg-blue-300" : ""
                  }`}
                  onClick={() => showProductsByNumFunc(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              onClick={showNextFunc}
              disabled={disableNextBtn}
              className={`p-1 border px-[10px] rounded-r-lg ${
                disableNextBtn ? "text-gray-400" : ""
              }`}
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
