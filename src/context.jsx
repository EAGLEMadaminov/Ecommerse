"use client";
import React, { useContext, useState, useEffect } from "react";
const Appcontext = React.createContext();
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050";

const AppProvider = ({ children }) => {
  const [allProductsList, setAllProductsList] = useState([]);

  const [categoryList, setCategorylist] = useState("");
  const [allCategoryList, setAllCategoryList] = useState("");

  const [brandList, setBrandList] = useState("");
  const [allBrnads, setAllbrands] = useState("");

  const [featuresList, setFeatiresList] = useState("");
  const [allFeatures, setAllFeatures] = useState("");
  const [showProductsByPage, setShowProductsByPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showSearch, setShowSearch] = useState([]);

  const getAllProducts = async () => {
    let { data } = await axios.get("/products");
    let productByPage = [];

    productByPage = data.slice(0, 10);
    setAllProductsList(productByPage);
    setPage(data.length / 10);
  };

  const deleteFunc = (item) => {
    const newSarch = showSearch.filter((one) => one != item);
    setShowSearch(newSarch);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Appcontext.Provider
      value={{
        allProductsList,
        setAllProductsList,
        categoryList,
        setCategorylist,
        allCategoryList,
        setAllCategoryList,
        brandList,
        setBrandList,
        allBrnads,
        setAllbrands,
        featuresList,
        setFeatiresList,
        allFeatures,
        setAllFeatures,
        getAllProducts,
        deleteFunc,
        showSearch,
        setShowSearch,
        showProductsByPage,
        setShowProductsByPage,
        page,
        setPage,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Appcontext);
};
export { Appcontext, AppProvider };
