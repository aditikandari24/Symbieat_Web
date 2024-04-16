import React, { useState, useEffect } from 'react';
import quote1 from '../Images/quotes1.jpg';
import quote2 from '../Images/quotes2.png';
import quote3 from '../Images/quotes3.jpg';
import quote4 from '../Images/quotes4.jpg';
import quote5 from '../Images/quotes5.jpg';
import quote6 from '../Images/quotes6.jpg';

const Home = (props) => {
  const [data, setData] = useState(null); // Example state variable

  useEffect(() => {
    // Example useEffect for fetching data
    fetchData();
  }, []);

  const fetchData = () => {
    // Example fetch data function
    // You can replace this with actual data fetching logic
    // Example:
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <div style={styles.header}>
            <h1 style={styles.heading}>"Indulge in culinary delights</h1>
            <p style={styles.subText}>with just a click away"</p>
            <button style={styles.orderButton} onClick={() => window.location.href = '/menu/65c73ce896fd3cae8e601f79'}>Order Now</button>
          </div>
          <div style={styles.card}>
            <div style={styles.aboutSection}>
              <h1>About:</h1>
              <p>
                Symbi Food Court includes a traditional low priced Canteen, Café Coffee Day (CCD) and a Juice Bar. The Canteen serves snacks, beverages, breakfast and lunch with a variety of items which suit the needs of students belonging to different geographical locations of the Country and even abroad. Frequent random checks are carried out to ensure that the food served by the Food Court is hygienic, tastes good and is made from good quality ingredients. The spacious building of the food court with good modern furniture and pleasant weather of Pune combined together to make it place where students eat together and indulge in healthy interactions.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.imageContainer}>
          <div style={styles.imageRow}>
            <img src={quote1} style={styles.image} />
            <img src={quote2} style={styles.image} />
            <img src={quote3} style={styles.image} />
          </div>
          <div style={styles.imageRow}>
            <img src={quote4} style={styles.image} />
            <img src={quote5} style={styles.image} />
            <img src={quote6} style={styles.image} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={{ textAlign: 'left' }}>
          <h2>Help & Contact Us</h2>
          <p>Email: {props.email}</p> {/* Example of using props */}
          <p>Phone:  {props.phone}</p> {/* Example of using props */}
        </div>
      </div>
    </div>
  );
};

// Define defaultProps for email and phone props
Home.defaultProps = {
  email: 'adminofficer@sitpune.edu.in',
  phone: '020 6193 6300'
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#F1EF99',
    minHeight: '100vh',
  },
  textContainer:{
    display:'block',
    width: '50%',
    height:'50vh',
    backgroundColor: '#F1EF99',
    alignSelf: 'flex-start',
    marginBottom: '20px', // Add margin to prevent overlap
  },
  header: {
    textAlign: 'left', // Text left-aligned
    marginBottom: '20px',
  },
  heading: {
    fontFamily: 'Times New Roman, serif', // Change font family here
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#D37676',
  },
  subText: {
    fontFamily: 'Times New Roman, serif', // Change font family here
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#D37676',
  },
  orderButton: {
    fontSize: '1.2rem',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ff6347',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
 
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // Take up all available space
    marginTop: '10px', // Add margin to create space between text and images
  },
  imageRow: {
    display: 'flex',
    justifyContent: 'flex-end', // Images right-aligned
    marginBottom: '10px',
  },
  image: {
    width: '200px',
    height: '200px',
    marginRight: '10px',
    borderRadius: '5px',
  },
  footer: {
    backgroundColor: '#8288A6',
    color: 'black',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  aboutSection: {
    fontFamily: 'Times New Roman, serif',
    color: 'black',
    padding: '20px',
  },
  card: {
    backgroundColor: '#B0C5A4',
    marginBottom: '20px',
    marginTop: '120px'
  },
};

export default Home;



