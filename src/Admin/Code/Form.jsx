import React, { useState, useEffect } from 'react';
import Nav_1 from './Nav_1';
import "../Css/Form.css"
const Form = () => {
    const [dishId, setDishId] = useState(null); // To store next dishId
    const [dishName, setDishName] = useState('');
    const [items, setItems] = useState([
        { name: '', quantity: 0, calories: 0 },
        { name: '', quantity: 0, calories: 0 }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch the current data from API to get the next available dishId
    useEffect(() => {
        fetch('https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData.json')
            .then((response) => response.json())
            .then((data) => {
                const dishCount = data ? Object.keys(data).length : 0;
                setDishId(dishCount + 1); // Set next available dishId
            })
            .catch((error) => console.error('Error fetching dishes:', error));
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare data to send
        const newDish = {
            dishId: dishId,
            dishName: dishName,
            items: items
        };

        // Send data to Firebase API
        fetch('https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDish),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsSubmitting(false);
                alert('Dish data added successfully!');
                // Optionally reset form after successful submission
                setDishName('');
                setItems([
                    { name: '', quantity: 0, calories: 0 },
                    { name: '', quantity: 0, calories: 0 }
                ]);
                // After submission, fetch the next dishId
                fetch('https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData.json')
                    .then((response) => response.json())
                    .then((data) => {
                        const dishCount = data ? Object.keys(data).length : 0;
                        setDishId(dishCount + 1); // Update dishId for next submission
                    })
                    .catch((error) => console.error('Error fetching dishes:', error));
            })
            .catch((error) => {
                setIsSubmitting(false);
                alert('Error submitting dish data');
                console.error('Error submitting dish data:', error);
            });
    };

    // Handle change in form fields
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

    // Add new item input field
    const addNewItem = () => {
        setItems([
            ...items,
            { name: '', quantity: 0, calories: 0 }
        ]);
    };

    return (
        <>
        <Nav_1/>
        <div className='Form_1'>
            <h1>Admin - Add Dish</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Dish Name:</label>
                    <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        required
                    />
                </div>
                <h3>Items:</h3>
                {items.map((item, index) => (
                    <div key={index}>
                        <label>Item {index + 1} Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                            min="1"
                        />
                        <label>Calories:</label>
                        <input
                            type="number"
                            name="calories"
                            value={item.calories}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                            min="0"
                        />
                    </div>
                ))}
                <div>
                    <button type="button" onClick={addNewItem}>
                        Add More Item
                    </button>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Dish'}
                    </button>
                </div>
            </form>
        </div>
        </>

    );
};

export default Form;
