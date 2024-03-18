import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { firestore, storage } from '../../../Firebase/configFirebase';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const galleryCollection = collection(firestore, 'gallery');
      const gallerySnapshot = await getDocs(galleryCollection);
      const galleryData = gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGalleryImages(galleryData);
    };

    fetchGalleryImages();
  }, [uploadedImage]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `gallery/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const galleryCollection = collection(firestore, 'gallery');
    const newDocRef = await addDoc(galleryCollection, { imageURL: downloadURL, description: 'Nouvelle image' });

    setUploadedImage({ id: newDocRef.id, imageURL: downloadURL });
  };

  const handleDeleteImage = async (imageId, imageURL) => {
    // Supprimer l'image du stockage Firebase
    const imageRef = ref(storage, imageURL);
    await deleteObject(imageRef);

    // Supprimer l'entrée dans la collection Firestore
    const galleryCollection = collection(firestore, 'gallery');
    await deleteDoc(doc(galleryCollection, imageId));
  };

  return (
    <div>
      <h1>Galerie de photos</h1>
      <input type="file" onChange={handleImageUpload} />
      <div>
        {galleryImages.map(image => (
          <div key={image.id}>
            <img src={image.imageURL} alt={`Image ${image.id}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <button onClick={() => handleDeleteImage(image.id, image.imageURL)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
