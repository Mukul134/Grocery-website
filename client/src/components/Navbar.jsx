import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
  } = useAppContext();

  const logOut = async () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">
      <NavLink to={"/"} onClick={() => setOpen(false)}>
        <img
          className="h-16 w-auto rounded-full object-contain"
          src={assets.logo}
          alt="logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"}>All Products</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          role="button"
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            className="w-6 opacity-80"
            alt="cart"
          />
          <button className="absolute -top-2 -right-3 text-xs text-gray-600 bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-gray-600 rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md tesxt-sm z-40">
              <li>
                <button
                  onClick={() => navigate("/my-orders")}
                  className="w-full text-left p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="w-full text-left p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 sm:hidden">
        <div
          role="button"
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            className="w-6 opacity-80"
            alt="cart"
          />
          <button className="absolute -top-2 -right-3 text-xs text-gray-600 bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink to={"/"} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to={"/products"} onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {user && (
            <NavLink to={"/orders"} onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to={"/contact"} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logOut}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
