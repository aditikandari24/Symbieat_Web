import React, { useState } from 'react';
import chickenburger from '../Images/chickenburger.png';
import chickenfriedrice from '../Images/chickenfriedrice.png';
import chickennoodles from '../Images/chickennoodles.png';
import pavbhaji from '../Images/pavbhaji.png';
import poha from '../Images/poha(1).png';
import meduvada from '../Images/meduvada.jpg';
import mixjuice from '../Images/mixjuice.jpeg';
import mango from '../Images/mangoshake1.jpg';
import nimbu from '../Images/nimbupani.png';
import chocolate from '../Images/chocolate.jpg';
import strawberry from '../Images/strawberry.jpg';
import espresso from '../Images/espresso.jpg';
import americano from '../Images/americano.png';
import latte from '../Images/latte.png';
import cold from '../Images/cold.png';
import sicetea from '../Images/sicetea.jpg';
import lemon from '../Images/lemonicetea.jpg';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const Menu = () => {
  const [filter, setFilter] = useState('all');
  const [sortingOption, setSortingOption] = useState('default');
  const dispatch = useDispatch();

  const menuItems = [
    { name: 'Chicken Burger', image: chickenburger, category: 'Canteen', price: 100 },
    { name: 'Chicken Fried Rice', image: chickenfriedrice, category: 'Canteen', price: 110 },
    { name: 'Chicken Noodles', image: chickennoodles, category: 'Canteen', price: 110 },
    { name: 'Pav Bhaji', image: pavbhaji, category: 'Canteen', price: 70 },
    { name: 'Poha', image: poha, category: 'Canteen', price: 30 },
    { name: 'Medu wada', image: meduvada, category: 'Canteen', price: 20 },
    { name: 'Mix Fruit Juice', image: mixjuice, category: 'Juice', price: 50 },
    { name: 'Mango milkshake', image: mango, category: 'Juice', price: 60 },
    { name: 'Lemon Juice', image: nimbu, category: 'Juice', price: 20 },
    { name: 'Chocolate Milkshake', image: chocolate, category: 'Juice', price: 50 },
    { name: 'Strawberry Milkshake', image: strawberry, category: 'Juice', price: 60 },
    { name: 'Espresso', image: espresso, category: 'Cafe', price: 40 },
    { name: 'Americano', image: americano, category: 'Cafe', price: 40 },
    { name: 'Latte', image: latte, category: 'Cafe', price: 40 },
    { name: 'Cold Drinks', image: cold, category: 'Cafe', price: 20 },
    { name: 'Strawberry Iced Tea', image: sicetea, category: 'Cafe', price: 40 },
    { name: 'Lemon Iced Tea', image: lemon, category: 'Cafe', price: 40 },
  ];

  const sortItems = (items, option) => {
    if (option === 'default') return items;
    if (option === 'priceLowToHigh') {
      return items.slice().sort((a, b) => a.price - b.price);
    }
    if (option === 'priceHighToLow') {
      return items.slice().sort((a, b) => b.price - a.price);
    }
  };

  const filterItems = (items, category) => {
    if (category === 'all') return items;
    return items.filter(item => item.category === category);
  };

  const filteredItems = filterItems(menuItems, filter);
  const sortedAndFilteredItems = sortItems(filteredItems, sortingOption);

  const styles = {
    menuContainer: {
      backgroundColor: '#64748b',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    menuHeader: {
      backgroundColor: '#1f2937',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logo: {
      color: 'white',
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
    dropdowns: {
      display: 'flex',
      gap: '16px',
    },
    dropdownLabel: {
      color: 'white',
      marginRight: '8px',
    },
    dropdownSelect: {
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: '#374151',
      color: 'white',
      border: 'none',
      outline: 'none',
    },
    menuItems: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    menuItem: {
      backgroundColor: '#e2e8f0',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      transition: 'transform 0.3s',
    },
    menuItemHover: {
      transform: 'translateY(-5px)',
    },
    menuItemImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginBottom: '12px',
    },
    menuItemDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    menuItemName: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    menuItemPrice: {
      color: '#4b5563',
      marginBottom: '16px',
    },
    quantitySelection: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    quantityLabel: {
      marginRight: '8px',
      color: '#4b5563',
    },
    quantityDropdown: {
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: '#d1d5db',
      color: '#4b5563',
      border: 'none',
      outline: 'none',
    },
    addToCartButton: {
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    addToCartButtonHover: {
      backgroundColor: '#2563eb',
    },
  };

  return (
    <div style={styles.menuContainer}>
      {/* Header section */}
      <nav style={styles.menuHeader}>
        {/* Logo */}
        <div style={styles.logo}>Order Now</div>
        {/* Sort and Filter dropdowns */}
        <div style={styles.dropdowns}>
          {/* Sort dropdown */}
          <div>
            <label style={styles.dropdownLabel}>Sort by:</label>
            <select
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
              style={styles.dropdownSelect}
            >
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price low to high</option>
              <option value="priceHighToLow">Price high to low</option>
            </select>
          </div>
          {/* Filter dropdown */}
          <div>
            <label style={styles.dropdownLabel}>Filter by:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.dropdownSelect}
            >
              <option value="all">All</option>
              <option value="Canteen">Canteen</option>
              <option value="Juice">Juice Bar</option>
              <option value="Cafe">Cafe</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <div style={styles.menuItems}>
        {sortedAndFilteredItems.map((menuItem, index) => (
          <div key={index} style={styles.menuItem}>
            {/* Menu Item Image */}
            <img
              src={menuItem.image}
              alt={menuItem.name}
              style={styles.menuItemImage}
            />
            {/* Menu Item Details */}
            <div style={styles.menuItemDetails}>
              <div style={styles.menuItemName}>{menuItem.name}</div>
              <div style={styles.menuItemPrice}>Price: Rs.{menuItem.price}</div>
              {/* Quantity Selection */}
              <div style={styles.quantitySelection}>
                <label style={styles.quantityLabel}>Quantity:</label>
                <select style={styles.quantityDropdown}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  console.log(menuItem);
                  dispatch(addCartItem(menuItem));
                }}
                style={styles.addToCartButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.addToCartButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.addToCartButton.backgroundColor;
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;


