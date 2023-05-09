import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../store/reducers/CartReducer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Shipping = ({ history }) => {
const navigate=useNavigate()
    const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.Cart);
console.log(shippingInfo)
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo?.length < 10 || phoneNo?.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  useEffect(()=>{

    setAddress(shippingInfo.address)
    setCountry(shippingInfo.country)
    setState(shippingInfo.state)
    setPhoneNo(shippingInfo.phoneNo)
    setPinCode(shippingInfo.pinCode)
    setCity(shippingInfo.city)


  },[])

  return (
    <Fragment>

<ToastContainer/>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
             
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
