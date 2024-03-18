import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { firestore, storage } from '../../../Firebase/configFirebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Gallerie.css'

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

  const handleDeleteImage = async (e, imageId, imageURL) => {
    e.preventDefault(); // Empêche le comportement par défaut du bouton (suppression de la carte et rafraîchissement de la page)
    
    // Supprimer l'image du stockage Firebase
    const imageRef = ref(storage, imageURL);
    await deleteObject(imageRef);

    // Supprimer l'entrée dans la collection Firestore
    const galleryCollection = collection(firestore, 'gallery');
    await deleteDoc(doc(galleryCollection, imageId));
    
    // Mettre à jour la liste des images après la suppression
    const updatedImages = galleryImages.filter(image => image.id !== imageId);
    setGalleryImages(updatedImages);
  };

  return (
    <div>
      <h1>Galerie de photos</h1>
      <input type="file" onChange={handleImageUpload} />
      <div className="gallery-container d-flex flex-wrap">
        {galleryImages.map(image => (
          <Card key={image.id} style={{ width: '200px', margin: '0.5rem' }}>
            <Card.Img variant="top" src={image.imageURL} alt={`Image ${image.id}`} />
            <Card.Body>
  <Button variant="danger" onClick={(e) => handleDeleteImage(e, image.id, image.imageURL)} className="delete-button">
    Supprimer
  </Button>
</Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
