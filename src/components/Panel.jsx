import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050";
import { useGlobalContext } from "@/context";
function Panel() {
  const {
    categoryList,
    allCategoryList,
    brandList,
    allBrnads,
    featuresList,
    allFeatures,
    getAllProducts,
    deleteFunc,
    setAllProductsList,
    setShowSearch,
  } = useGlobalContext();
  const [showCategory, setShowCategory] = useState(false);
  const [showAllCategory, setShowAllCategory] = useState("");

  const [showBrands, setShowBrands] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [showFeatures, setShowFeatures] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const showFeaturesFunc = async (e, item) => {
    if (e.target.checked) {
      try {
        let { data: searMaterial } = await axios.get(
          `/products/?material=${item.material[0]}&material=${item.material[1]}`
        );
        const value = item.material[0];
        setShowSearch((showSearch) => [...showSearch, value]);
        setAllProductsList(searMaterial);
      } catch (error) {
        console.log(error);
      }
    } else {
      getAllProducts();
      deleteFunc(item.material[0]);
    }
  };

  const showBrandsFunc = async (e, item) => {
    if (e.target.checked) {
      try {
        let { data: searchBrand } = await axios.get(
          `/products/?brand=${item.brand}`
        );
        setAllProductsList(searchBrand);
        const value = item.brand;
        setShowSearch((showSearch) => [...showSearch, value]);
        setIsSearchDelete(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      getAllProducts();
      deleteFunc(item.brand);
    }
  };

  const showProductByCateFunc = async (item) => {
    try {
      let { data } = await axios.get(`/products/?category=${item.category}`);
      setAllProductsList(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" pt-[120px] inset-0 snap-center overflow-y-auto border-t fixed w-[300px]">
      <ul className="mx-6 dark:text-black mt-3">
        <li className="my-3 border-t pb-5 pt-2 ">
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="text-2xl w-full flex justify-between items-center"
          >
            Categories
            {showCategory ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down ml-7"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </button>
          {showCategory ? (
            <ul className="ml-5 dark:text-black">
              {categoryList.map((item, index) => {
                return (
                  <li className="my-2" key={index}>
                    <button onClick={() => showProductByCateFunc(item)}>
                      {item.category}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          {showAllCategory && showCategory ? (
            <ul className="ml-5">
              {allCategoryList?.map((one, indx) => {
                return (
                  <li key={indx} className="my-2">
                    <button onClick={() => showProductByCateFunc(one)}>
                      {one.category}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          {showCategory ? (
            <button
              className="ml-5 text-blue-600 "
              onClick={() => setShowAllCategory(!showAllCategory)}
            >
              {showAllCategory ? "See less" : "See all"}
            </button>
          ) : (
            ""
          )}
        </li>

        <li className="my-3 pb-5 pt-2 border-t dark:text-black">
          <button
            onClick={() => setShowBrands(!showBrands)}
            className="show-btn text-2xl flex items-center w-full justify-between"
          >
            Brands
            {showBrands ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down ml-7"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </button>
          {showBrands ? (
            <div>
              <ul className="ml-5 dark:text-black">
                {brandList.map((item, index) => {
                  return (
                    <li className="my-2" key={index}>
                      <label
                        htmlFor={`brand_${index}`}
                        onClick={(e) => showBrandsFunc(e, item)}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          id={`brand_${index}`}
                        />
                        {item.brand}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          {showAllBrands && showBrands ? (
            <ul className="ml-5">
              {allBrnads?.map((one, indx) => {
                return (
                  <li key={indx} className="my-2">
                    <label
                      htmlFor={`brand_${indx}_all`}
                      onClick={(e) => showBrandsFunc(e, one)}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        id={`brand_${indx}_all`}
                      />
                      {one.brand}
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          {showBrands ? (
            <button
              className="ml-5 text-blue-600 "
              onClick={() => setShowAllBrands(!showAllBrands)}
            >
              {showAllBrands ? "See less" : "See all"}
            </button>
          ) : (
            ""
          )}
        </li>

        <li className="my-3 mb-5 pt-2 border-t dark:text-black">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="show-btn text-2xl flex w-full justify-between items-center"
          >
            Features
            {showFeatures ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down ml-7"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </button>
          {showFeatures ? (
            <ul className="ml-5 dark:text-black">
              {featuresList.map((item, index) => {
                return (
                  <li className="my-2" key={index}>
                    <label
                      htmlFor={`material_${index}`}
                      onClick={(e) => showFeaturesFunc(e, item)}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        id={`material_${index}`}
                      />
                      {item.material}
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          {showAllFeatures && showFeatures ? (
            <ul className="ml-5">
              {allFeatures?.map((one, indx) => {
                return (
                  <li key={indx} className="my-2">
                    <label
                      htmlFor={`material_${indx}_all`}
                      onClick={(e) => showFeaturesFunc(e, one)}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        id={`material_${indx}_all`}
                      />
                      {one.material}
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          {showFeatures ? (
            <button
              className="ml-5 text-blue-600 "
              onClick={() => setShowAllFeatures(!showAllFeatures)}
            >
              {showAllFeatures ? "See less" : "See all"}
            </button>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}

export default Panel;
