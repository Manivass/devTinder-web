import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremiumUser, setPremiumUser] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);
  var verifyPayment = async () => {
    const res = await axios.get(BASE_URL + "/payment/verification" , {withCredentials : true});
    setPremiumUser(res?.data?.isPremium);
  };

  const handleBuyPremium = async (type) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );

      const { newPayment, keyId } = res.data;
      const { amount, currency, orderId, notes } = newPayment;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
        },
        theme: {
          color: "#F37254",
        },
        handle: verifyPayment,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err?.message);
    }
  };
  return !isPremiumUser ? (
    <div className="flex w-full px-28 py-8">
      <div className="card bg-base-300  p-4 rounded-box grid h-auto grow place-items-center">
        <h2 className="text-xl font-semibold">Silver Membership</h2>
        <button
          className="btn btn-success mt-5"
          onClick={() => handleBuyPremium("silver")}
        >
          Buy Now
        </button>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 p-4 rounded-box grid h-auto grow place-items-center">
        <h2 className="text-xl font-semibold">Gold Membership</h2>
        <button
          className="btn btn-error mt-5"
          onClick={() => handleBuyPremium("gold")}
        >
          Buy Now
        </button>
      </div>
    </div>
  ) : (
    "you're already premium user"
  );
};
export default Premium;
