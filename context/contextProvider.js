"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PushNotification } from "@/comps/PushNotification";
import { useGET } from "@/roupi/utils";
export const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [trackID, setTrackID] = useState(
    typeof localStorage !== "undefined" && localStorage.getItem("trackID")
  );
  const [notification, setNotifiction] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    if (localStorage?.getItem("trackID")) {
      setTrackID(localStorage?.getItem("trackID"));
    }
    if (!localStorage?.getItem("trackID")) {
      useGET("tracking/init/").then((res) => {
        if (res.type == "success") {
          setTrackID(res.data);
          localStorage.setItem("trackID", res.data);
        }
      });
    }
  }, []);

  const [cron, setCron] = useState(false);
  const handleNotification = ({ type, message }) => {
    setNotifiction({ type: type, message: message });
    if (cron) clearTimeout(cron);
    const tim = setTimeout(() => {
      setNotifiction({ type: null, message: null });
    }, 4000);
    setCron(tim);
  };

  return (
    <StateContext.Provider
      value={{
        handleNotification,
        trackID,
        setTrackID,
      }}
    >
      {children}
      {notification.type && (
        <PushNotification
          type={notification.type}
          message={notification.message}
          onClick={() => setNotifiction({ type: "", message: "" })}
        />
      )}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
