import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";

type PressData = {
  id: string;
  name: string;
  status: string;
  speed: number;
  envelopePacks: number;
  envelopesProcessed: number;
  envelopesProduced: number;
  softDeleted: boolean;
};

type PressContextValue = {
  presses: PressData[];
};

const PressContext = createContext<PressContextValue | undefined>(undefined);

export const PressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [presses, setPresses] = useState<PressData[]>([]);

  useEffect(() => {
    const pressCollection = collection(FIRESTORE_DB, "presses");
    const unsubscribe = onSnapshot(pressCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PressData[];
      setPresses(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PressContext.Provider value={{ presses }}>
      {children}
    </PressContext.Provider>
  );
};

export const usePresses = (): PressContextValue => {
  const context = useContext(PressContext);
  if (!context) {
    throw new Error("usePresses must be used within a PressProvider");
  }
  return context;
};
