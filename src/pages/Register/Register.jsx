import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../Firebase/configFirebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";

import "./Register.css"; // Import the CSS file
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [immatriculationPart1, setImmatriculationPart1] = useState("");
  const [immatriculationPart2, setImmatriculationPart2] = useState("");
  const [selectedImmatriculationType, setSelectedImmatriculationType] = useState("TU"); // Default type is TU
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const Téléphone = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Determine immatriculation prefix based on user selection
      let immatriculationPrefix = "";
      let immatriculation = "";

      if (selectedImmatriculationType === "RS") {
        immatriculationPrefix = "RS";
        immatriculation = immatriculationPrefix + immatriculationPart1;
      } else if (selectedImmatriculationType === "TU") {
        immatriculationPrefix = "TU";
        immatriculation = immatriculationPrefix + immatriculationPart1 + immatriculationPart2;
      }

      // Create user on firestore
      await setDoc(doc(getFirestore(), "users", res.user.uid), {
        uid: res.user.uid,
        Téléphone,
        displayName,
        email,
        immatriculation,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error creating user:", error);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="tel" placeholder="Téléphone" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />

          <div className="immatriculation-container">
            <input
              required
              type="text"
              maxLength={selectedImmatriculationType === "RS" ? 6 : (selectedImmatriculationType === "Autre" ? 12 : 3)}
              placeholder={`Immatriculation  (${selectedImmatriculationType})`}
              value={immatriculationPart1}
              onChange={(e) => setImmatriculationPart1(e.target.value.replace(/\D/, ""))}
            />
            {selectedImmatriculationType === "TU" && (
              <>
                <h5 style={{ color: "orange" }}>TU</h5>
                <input
                  required
                  type="text"
                  maxLength={4} // Set max length to 4 for both RS and TU
                  placeholder={`Immatriculation `}
                  value={immatriculationPart2}
                  onChange={(e) => setImmatriculationPart2(e.target.value.replace(/\D/, ""))}
                />
              </>
            )}
          </div>

          <div className="immatriculation-type-container">
            <label>
              <input
                type="radio"
                value="TU"
                checked={selectedImmatriculationType === "TU"}
                onChange={() => setSelectedImmatriculationType("TU")}
              />
              TU
            </label>
            <label>
              <input
                type="radio"
                value="RS"
                checked={selectedImmatriculationType === "RS"}
                onChange={() => setSelectedImmatriculationType("RS")}
              />
              RS
            </label>
            <label>
              <input
                type="radio"
                value="Autre"
                maxLength={12}
                checked={selectedImmatriculationType === "Autre"}
                onChange={() => setSelectedImmatriculationType("Autre")}
              />
              Autre
            </label>
          </div>

          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;