import React from 'react';

const PropertyCard = ({ property, onSelect, selected }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: selected ? '0px 0px 8px rgba(0, 123, 255, 0.5)' : 'none',
        transition: 'box-shadow 0.3s ease',
        backgroundColor: selected ? '#f1f1f1' : '#fff',
      }}
    >
      <img
        src={property.imageUrl}
        alt={property.name}
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3 style={{ marginBottom: '8px' }}>{property.name}</h3>
      <p style={{ marginBottom: '4px' }}>Location: {property.location}</p>
      <p style={{ marginBottom: '4px' }}>Property Type: {property.property_type}</p>
      <p style={{ marginBottom: '4px' }}>Description: {property.description}</p>
      <p style={{ marginBottom: '4px' }}>Price: ${property.price}</p>
      <p style={{ marginBottom: '4px' }}>Rating: {property.rating}</p>
      <button
        onClick={() => onSelect(property._id)}
        style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {selected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
};

export default PropertyCard;
