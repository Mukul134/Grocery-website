import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-lg p-3 bg-white w-full max-w-64 mx-auto"
      >
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition-all duration-300 w-full max-w-[120px] sm:max-w-[150px]"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/70 text-xs sm:text-sm">
          <p className="text-gray-600 truncate">{product.category}</p>
          <p className="text-gray-800 font-medium text-base sm:text-lg truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-3 sm:w-4"
                />
              ))}
            <p className="text-xs sm:text-sm">({4})</p>
          </div>
          <div className="flex items-center justify-between mt-2 sm:mt-3">
            <p className="text-base sm:text-xl font-medium text-gray-700">
              {currency}${product.offerPrice}{" "}
              <span className="text-gray-500/60 text-xs sm:text-sm line-through">
                {currency}${product.price}
              </span>
            </p>
            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-yellow-100 border border-primary w-16 sm:w-20 h-8 sm:h-9 rounded text-gray-600 text-sm sm:text-base font-medium"
                  onClick={() => addToCart(product._id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-5 sm:h-15"
                  >
                    <path
                      d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                      stroke="#DAA520"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2 w-16 sm:w-20 h-8 sm:h-9 bg-primary-500/25 rounded text-gray-600 text-sm sm:text-base">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-1 sm:px-2 h-full font-semibold"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs sm:text-sm">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-1 sm:px-2 h-full font-semibold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
