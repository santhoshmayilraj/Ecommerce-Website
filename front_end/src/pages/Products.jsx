import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

import doubleSizeBed from '../assets/images/doublesize.jpg';
import floralPillowCover from '../assets/images/FloralPrintedCottonBedPillow.jpg';
import hostelSizeBed from '../assets/images/hostelsize.jpg';
import kapokFiber from '../assets/images/KapokFiberPod.jpg';
import kapokRaw from '../assets/images/KapokSilkCottonRaw.jpg';
import kingSizeBed from '../assets/images/kingsize.jpg';
import cottonPillow from '../assets/images/nagcottonpillows.jpg';
import queenSizeBed from '../assets/images/queensize.jpg';
import singleSizeBed from '../assets/images/singlesize.jpg';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: "Double Size Bed",
      category: "bed",
      price: 15999,
      rating: 4.8,
      image: doubleSizeBed,
      description: "Comfortable double-sized bed with premium silk cotton mattress for couples.",
      features: ['Dimensions: 75" x 54"', 'Premium silk cotton material', 'Ergonomic design', 'Long-lasting comfort']
    },
    {
      id: 2,
      name: "Floral Printed Pillow Cover",
      category: "pillow",
      price: 599,
      rating: 4.6,
      image: floralPillowCover,
      description: "Beautiful floral printed cotton pillow cover for a touch of elegance to your bedroom.",
      features: ['100% cotton material', 'Vibrant colors', 'Machine washable', 'Zipper closure']
    },
    {
      id: 3,
      name: "Hostel Size Bed",
      category: "bed",
      price: 9999,
      rating: 4.7,
      image: hostelSizeBed,
      description: "Compact and comfortable bed perfect for hostel and dormitory use.",
      features: ['Space-saving design', 'Durable construction', 'Easy to transport', 'Hypoallergenic']
    },
    {
      id: 4,
      name: "Kapok Cotton Fiber",
      category: "raw",
      price: 1999,
      rating: 4.9,
      image: kapokFiber,
      description: "Pure kapok cotton fiber for custom filling of pillows and cushions.",
      features: ['100% natural', 'Chemical-free', 'Hypoallergenic', 'Lightweight and fluffy']
    },
    {
      id: 5,
      name: "Kapok Silk Cotton Raw",
      category: "raw",
      price: 2499,
      rating: 4.9,
      image: kapokRaw,
      description: "Raw kapok silk cotton for premium quality mattress and pillow making.",
      features: ['Premium quality', 'Unprocessed raw material', 'Sustainable source', 'All-natural fibers']
    },
    {
      id: 6,
      name: "King Size Bed",
      category: "bed",
      price: 22999,
      rating: 5.0,
      image: kingSizeBed,
      description: "Luxurious king-sized bed for ultimate comfort and space.",
      features: ['Dimensions: 78" x 72"', 'Premium silk cotton filling', 'Extra comfort layer', 'Temperature regulating']
    },
    {
      id: 7,
      name: "Cotton Pillow",
      category: "pillow",
      price: 1299,
      rating: 4.7,
      image: cottonPillow,
      description: "Soft and comfortable cotton pillows for peaceful sleep.",
      features: ['Pure cotton fill', 'Perfect neck support', 'Dust mite resistant', 'Breathable fabric']
    },
    {
      id: 8,
      name: "Queen Size Bed",
      category: "bed",
      price: 18999,
      rating: 4.8,
      image: queenSizeBed,
      description: "Elegant queen-sized bed with premium comfort for couples.",
      features: ['Dimensions: 78" x 60"', 'Premium quality cotton', 'Medium-firm support', 'Durable stitching']
    },
    {
      id: 9,
      name: "Single Size Bed",
      category: "bed",
      price: 11999,
      rating: 4.8,
      image: singleSizeBed,
      description: "Comfortable single-sized bed perfect for one person.",
      features: ['Dimensions: 75" x 36"', 'Premium silk cotton filling', 'Ergonomic design', 'Lightweight and portable']
    },
  ]);

  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const navigate = useNavigate();

  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'bed', name: 'Beds' },
    { id: 'pillow', name: 'Pillows' },
    { id: 'raw', name: 'Raw Materials' }
  ];

  // FIXED: Load cart from localStorage and immediately sync state
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        return parsedCart;
      }
      setCart([]);
      return [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      localStorage.removeItem('cart');
      setCart([]);
      return [];
    }
  };

  // FIXED: Load cart ONLY on mount - no dependencies
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // FIXED: Save to localStorage only when cart is manually updated (not from polling)
  const saveCartToStorage = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // FIXED: Simple polling without dependency on cart state
  useEffect(() => {
    let lastCartCheck = JSON.stringify(cart);
    
    const checkForCartChanges = () => {
      try {
        const currentCartString = localStorage.getItem('cart') || '[]';
        
        // Only update if localStorage is different from our last check
        if (currentCartString !== lastCartCheck) {
          const currentCart = JSON.parse(currentCartString);
          
          // Check for new custom items
          const currentCustomItems = currentCart.filter(item => item.isCustom);
          const previousCart = JSON.parse(lastCartCheck);
          const previousCustomItems = previousCart.filter(item => item.isCustom);
          
          // Show notification for newly added custom items
          if (currentCustomItems.length > previousCustomItems.length) {
            const newCustomItem = currentCustomItems[currentCustomItems.length - 1];
            setNotification({
              message: `Custom mattress "${newCustomItem.name}" added to cart!`,
              type: 'success'
            });
            
            setTimeout(() => setNotification(null), 5000);
            
            // Show cart when custom item is added
            setCartVisible(true);
            setOverlayVisible(true);
          }
          
          // Update cart state and tracking
          setCart(currentCart);
          lastCartCheck = currentCartString;
        }
      } catch (error) {
        console.error('Error checking cart changes:', error);
      }
    };

    // Check every 500ms for changes
    const interval = setInterval(checkForCartChanges, 500);

    // Cleanup
    return () => clearInterval(interval);
  }, []); // NO dependencies to avoid loops

  // Toggle cart visibility
  const toggleCart = () => {
    setCartVisible(!cartVisible);
    setOverlayVisible(!cartVisible);
  };

  // FIXED: Add to cart with immediate localStorage save
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      );
    } else {
      updatedCart = [...cart, {...product, quantity: 1}];
    }
    
    // Update both state and localStorage immediately
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    
    // Show cart
    setCartVisible(true);
    setOverlayVisible(true);
    
    // Visual feedback for add to cart button
    const button = document.querySelector(`button[data-product-id="${product.id}"]`);
    if (button) {
      const originalText = button.innerText;
      button.innerText = "Added!";
      button.classList.add("added");
      
      setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove("added");
      }, 1500);
    }
  };

  // FIXED: Remove from cart with immediate localStorage save
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // FIXED: Update quantity with immediate localStorage save
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Filter products
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: featured (no sort)
    return 0;
  });

  // Close cart when clicking outside
  const closeCartOnOutsideClick = () => {
    setCartVisible(false);
    setOverlayVisible(false);
  };

  // Enhanced cart item renderer with custom item support
  const renderCartItem = (item) => (
    <div className="cart-item" key={item.id}>
      <div className="cart-item-image">
        <img 
          src={item.image} 
          alt={item.name}
          onError={(e) => {
            e.target.src = doubleSizeBed; // Fallback to a default image
          }}
        />
        <div className="cart-item-quantity-badge">
          x{item.quantity}
        </div>
      </div>
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h4>{item.name}</h4>
          {item.isCustom && (
            <span className="custom-item-badge">Custom</span>
          )}
          <span className="cart-item-quantity">
            Qty: {item.quantity}
          </span>
        </div>
        
        {/* Show custom specifications for custom items */}
        {item.isCustom && item.customSpecs && (
          <div className="custom-specs">
            <small style={{ 
              color: '#666', 
              fontSize: '0.85em', 
              display: 'block',
              marginBottom: '4px'
            }}>
              📏 Dimensions: {item.customSpecs.dimensions.length}" × {item.customSpecs.dimensions.breadth}" × {item.customSpecs.dimensions.height}"
            </small>
            <small style={{ 
              color: '#666', 
              fontSize: '0.85em', 
              display: 'block' 
            }}>
              🎨 Design: {item.customSpecs.designName}
            </small>
          </div>
        )}
        
        <div className="cart-item-price">
          <span>₹{item.price.toLocaleString()}</span>
          <span className="item-subtotal">
            Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
        <div className="cart-item-controls">
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >−</button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >+</button>
          <button 
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="products-page">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Overlay for cart */}
      <div 
        className={`cart-overlay ${overlayVisible ? 'visible' : ''}`} 
        onClick={closeCartOnOutsideClick}
      ></div>
      
      <div className="products-hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Handcrafted with premium silk cotton for exceptional comfort</p>
        </div>
      </div>

      <div className="products-controls">
        <div className="filter-container">
          <span>Filter by: </span>
          <div className="category-tabs">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`category-tab ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="sort-container">
          <span>Sort by: </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
        
        <button 
          className="custom-bed-button" 
          onClick={() => navigate('/custom-bed-creator')}
        >
          <span>Custom Mattress Creator</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-rating">
                <span>★</span> {product.rating}
              </div>
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <ul className="product-features">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="product-footer">
                <span className="product-price">₹{product.price.toLocaleString()}</span>
                <div className="cart-action-container">
                  {cart.some(item => item.id === product.id) && (
                    <span className="cart-quantity-badge">
                      x{cart.find(item => item.id === product.id).quantity}
                    </span>
                  )}
                  <button 
                    className="add-to-cart-btn"
                    data-product-id={product.id}
                    onClick={() => addToCart(product)}
                  >
                    {cart.some(item => item.id === product.id) ? 'Add More' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Mini Cart */}
      <div className={`mini-cart ${cartVisible ? 'visible' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cart.reduce((total, item) => total + item.quantity, 0) || 0} items)</h3>
          <button className="close-cart" onClick={toggleCart}>×</button>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={toggleCart}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => renderCartItem(item))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">₹{cartTotal.toLocaleString()}</span>
              </div>
              <button className="checkout-btn" onClick={() => navigate("/payment")}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping" onClick={toggleCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Cart Toggle Button */}
      <button 
        className={`cart-toggle ${cart.length > 0 ? 'has-items' : ''}`}
        onClick={toggleCart}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {cart.length > 0 && (
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        )}
      </button>
    </div>
  );
}

export default Products;