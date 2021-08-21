import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlanScreen.css";
import { loadStripe } from "@stripe/stripe-js"

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        const finalData = [];
        for (const data in products) {
          finalData.push(products[data]);
        }

        setProducts(finalData);

        console.log(products);
      });
  }, []);

  console.log(products);
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      docRef.onSnapshot(async (snap) => {
          const {error, sessionId} = snap.data()
          console.log(sessionId)

          if (error) {
              alert(`An error occured ${error.message}`)
          }

          if (sessionId) {
              const stripe = await loadStripe("pk_test_51JPZOhC6dSkw8byuKsrHNQ8tMpKjBazU7wg6rmwJ4XehdiJA2L9PADFiW3Rb36WxSFU4pdsSY9xPvI4ET983kOxW00ljmeJn80")
              stripe.redirectToCheckout({sessionId})
          }
      })
  };

  let render = null;
  if (products.length > 0) {
    render = (
      <div>
        {products.map((item, index) => {
          console.log(item);
          return (
            <div className="planScreen__plan" key={index}>
              <div className="planScreen__info">
                <h5>{item.name}</h5>
                <h6>{item.description}</h6>
              </div>
              <button onClick={() => loadCheckout(item?.prices.priceId)}>
                Subscribe
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="planScreen">{render}</div>;
}

export default PlanScreen;
