import React, { useState } from 'react';
import chickenburger from '../Images/chickenburger.png';
import chickenfriedrice from '../Images/chickenfriedrice.png';
import chickennoodles from '../Images/chickennoodles.png';
import pavbhaji from '../Images/pavbhaji.png';
import poha from '../Images/poha(1).png';
import meduvada from '../Images/meduvada.jpg';
import mixjuice from '../Images/mixjuice.jpeg';
import mango from '../Images/mangoshake1.jpg';
import nimbu from '../Images/nimbupani.png'
import chocolate from '../Images/chocolate.jpg'
import strawberry from '../Images/strawberry.jpg'
import espresso from '../Images/espresso.jpg'
import americano from '../Images/americano.png'
import latte from '../Images/latte.png'
import cold from '../Images/cold.png'
import sicetea from '../Images/sicetea.jpg'
import lemon from '../Images/lemonicetea.jpg'
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from "react-redux";

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

  // Function to sort menu items based on price
  const sortItems = (items, option) => {
    if (option === 'default') return items;
    if (option === 'priceLowToHigh') {
      return items.slice().sort((a, b) => a.price - b.price);
    }
    if (option === 'priceHighToLow') {
      return items.slice().sort((a, b) => b.price - a.price);
    }
  };

  // Function to filter menu items based on category
  const filterItems = (items, category) => {
    if (category === 'all') return items;
    return items.filter(item => item.category === category);
  };

  // Filter and sort menu items
  const filteredItems = filterItems(menuItems, filter);
  const sortedAndFilteredItems = sortItems(filteredItems, sortingOption);

  return (
    <div style={{ backgroundColor: '#64748b' }}>
      {/* Header */}
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-xl font-bold">Order Now</div>
          {/* Sort */}
          <div className="flex items-center">
            <div className="text-white">Sort by:</div>
            <select
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
              className="px-2 py-1 rounded-md bg-gray-700 text-white ml-2"
            >
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price low to high</option>
              <option value="priceHighToLow">Price high to low</option>
            </select>
          </div>
          {/* Filter */}
          <div className="flex items-center">
            <div className="text-white">Filter by:</div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-1 rounded-md bg-gray-700 text-white ml-2"
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
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Render each menu item */}
        {sortedAndFilteredItems.map((menuItem, index) => (
          <div key={index} className="bg-slate-400 p-4 rounded-md flex flex-col items-center">
            {/* Menu Item Image */}
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-40 h-40 object-cover mb-3"
            />
            {/* Menu Item Name */}
            <div className="text-lg font-semibold">{menuItem.name}</div>
            {/* Price */}
            <div className="text-gray-700">Price: Rs.{menuItem.price}</div>
            {/* Quantity Selection */}
            <div className="flex items-center mt-2">
              <label className="mr-2 text-gray-700">Quantity:</label>
              <select className="px-2 py-1 rounded-md bg-gray-300 text-gray-700">
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {/* Add to Cart Button */}
              <button onClick={() => {
                console.log(menuItem)
                dispatch(addCartItem(menuItem))
                }} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md">
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

