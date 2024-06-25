import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AddToCart = () => {
  const location = useLocation();
  const selectedItem = location.state.selectedItem;
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
         
          <div className="row">
            <div className="col-md-6">
            <h4 className="card-title">{selectedItem.item_name}</h4>
              <img src={`http://localhost:5000/foodmenu/${selectedItem.food_itemImg}`} style={{width:'100px',height:'100px'}} alt={selectedItem.item_name}className="img-fluid"/>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Quantity:</label>
                <div className="input-group">
                  <button className="btn btn-secondary"onClick={handleDecrease}> - </button>
                  <input type="number"value={quantity} style={{width:'100px'}} onChange={(e) => setQuantity(e.target.value)}className="form-control"/>
                  <button className="btn btn-secondary"onClick={handleIncrease}> + </button>
                </div>
              </div>
                 <p style={{fontSize:'20px'}}> Price:  {selectedItem.item_price * quantity} Rs.</p>
             

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;