import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export default function FootPressurePanel() {
  const [feet, setFeet] = useState([]);

  useEffect(() => {
    const feetRef = ref(database, "go2/feet");

    const unsubscribe = onValue(feetRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFeet(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="foot-grid">
      {feet.map((value, index) => (
        <div key={index} className="foot-box">
          <div className="metric-small">Foot {index + 1}</div>
          <div className="metric-medium">{value} N</div>
        </div>
      ))}
    </div>
  );
}
