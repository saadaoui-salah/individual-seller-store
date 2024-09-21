"use client";

import { useStateContext } from "@/context/contextProvider";
import { usePOST } from "./utils";
import { useState } from "react";

export const useCreateOrder = (id) => {
  const { handleNotification, trackID } = useStateContext();
  const [order, setOrder] = useState({
    packID: null,
    shippingID: null,
    productID: id,
    quantity: 1,
  });
  const submit = (e, data, hasPacks) => {
    e.preventDefault();
    if (!order.packID && hasPacks) {
      handleNotification({
        type: "error",
        message: "Please select pack",
      });
      return;
    }
    if (!order.shippingID) {
      handleNotification({
        type: "error",
        message: "Please select your province",
      });
      return;
    }
    if (!data.fullName) {
      handleNotification({
        type: "error",
        message: "Please enter your full name",
      });
      return;
    }
    if (!data.address) {
      handleNotification({
        type: "error",
        message: "Please enter your address",
      });
      return;
    }
    if (!data.phoneNumber) {
      handleNotification({
        type: "error",
        message: "Please enter your phone number",
      });
      return;
    }
    if (!data.postalCode) {
      handleNotification({
        type: "error",
        message: "Please enter your postal code",
      });
      return;
    }
    usePOST("one-seller/order/create/", {
      data: { ...data, ...order },
      headers: {
        "X-Comercify-Visitor": trackID,
      },
    }).then((res) => {
      if (res?.type == "success") handleNotification(res);
      if (res?.type == "error") handleNotification(res);
    });
  };
  return { submit, setOrder, order };
};
