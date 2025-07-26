import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
  />
);
const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="First Name"
                name="firstName"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              type="email"
              placeholder="Email Address"
              name="email"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="Street"
              name="street"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="City"
                name="city"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="State"
                name="state"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="number"
                placeholder="Zip Code"
                name="zipcode"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="Country"
                name="country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="Phone Number"
              name="phone"
            />
            <button
              type="submit"
              className="w-full mt-6 bg-primary text-gray-600 py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded-md"
            >
              Save Address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          alt="Add Address"
          className="md:mr-16 mb-16 md:mt-0"
        />
      </div>
    </div>
  );
};

export default AddAddress;
