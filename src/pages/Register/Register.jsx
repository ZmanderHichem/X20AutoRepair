import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../Firebase/configFirebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
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

      // Create a unique image name
      const date = new Date().getTime();
      // const storageRef = ref(storage, `${displayName + date}`);

      // Uncomment the following lines when you want to upload a file
      // const file = e.target[4].files[0];
      // await uploadBytesResumable(storageRef, file);
      // const downloadURL = await getDownloadURL(storageRef);

      // Update profile
      await updateProfile(res.user, {
        displayName,
        // photoURL: downloadURL,
      });

      // Create user on Firestore
      await setDoc(doc(getFirestore(), "users", res.user.uid), {
        uid: res.user.uid,
        Téléphone,
        displayName,
        email,
        // photoURL: downloadURL,
      });

      // Create empty user chats on Firestore on your own types of components related to your site
      // await setDoc(doc(getFirestore(), "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      console.error("Firebase Authentication Error:", err.code, err.message);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="tel" placeholder="Téléphone" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          {/* Uncomment the following lines when you want to upload a file */}
          {/* <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Aj</span>
          </label> */}
          <button disabled={loading}>Sign up</button>
          {loading && "Please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
