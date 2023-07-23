import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useState } from "react";
  
  export default function BasicUsage({ src, name, location, Property, Description, Price, Rating, id,fetchProperties}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialState = {
      imageUrl: src,
      name: name,
      location: location,
      property_type: Property,
      description: Description,
      price: Price,
      rating: Rating,
    };
  
    const [formData, setFormData] = useState(initialState);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        // Replace the URL with your backend server endpoint for updating a property
        const response = await axios.put(
          `http://localhost:4500/property/edit_property/${id}`,
          formData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if(response.statusText=="OK"){
            alert(response.data.msg);
            fetchProperties()
        }
        console.log(response);
        // Optionally, show a success message or update the properties state with the updated property
        // You may also want to reset the selectedProperty state to null after the update is successful
        onClose(); // Close the modal after successful update
      } catch (error) {
        console.error("Error updating property:", error);
      }
    };
  
    return (
      <>
        <button onClick={onOpen}>Edit</button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleUpdate}>
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Property Type:
                  <input
                    type="text"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Edit Data</button>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  