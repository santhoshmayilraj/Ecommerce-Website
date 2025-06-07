import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

// Your exact image imports
import doubleSizeBed from '../assets/images/doublesize.jpg';
import floralPillowCover from '../assets/images/FloralPrintedCottonBedPillow.jpg';
import hostelSizeBed from '../assets/images/hostelsize.jpg';
import kapokFiber from '../assets/images/KapokFiberPod.jpg';
import kapokRaw from '../assets/images/KapokSilkCottonRaw.jpg';
import kingSizeBed from '../assets/images/kingsize.jpg';
import cottonPillow from '../assets/images/nagcottonpillows.jpg';
import queenSizeBed from '../assets/images/queensize.jpg';
import singleSizeBed from '../assets/images/singlesize.jpg';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

function Products() {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useBackend, setUseBackend] = useState(true);
  
  // UI states
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const navigate = useNavigate();

  // Exact image mapping based on your image filenames
  const imageMap = {
    'doublesize.jpg': doubleSizeBed,
    'FloralPrintedCottonBedPillow.jpg': floralPillowCover,
    'hostelsize.jpg': hostelSizeBed,
    'KapokFiberPod.jpg': kapokFiber,
    'KapokSilkCottonRaw.jpg': kapokRaw,
    'kingsize.jpg': kingSizeBed,
    'nagcottonpillows.jpg': cottonPillow,
    'queensize.jpg': queenSizeBed,
    'singlesize.jpg': singleSizeBed,
  };

  // Get correct image for a product
  const getProductImage = (product) => {
    if (product.image) {
      const filename = product.image.split('/').pop();
      return imageMap[filename] || kingSizeBed;
    }
    return kingSizeBed;
  };

  // Fallback static products (your exact data)
  const staticProducts = [
    {
      id: 'static-1',
      name: "Double Size Bed",
      category: "bed",
      price: 15999,
      rating: 4.8,
      image: doubleSizeBed,
      description: "Comfortable double-sized bed with premium silk cotton mattress for couples.",
      features: ['Dimensions: 75" x 54"', 'Premium silk cotton material', 'Ergonomic design', 'Long-lasting comfort'],
      stock: 25,
      in_stock: true
    },
    {
      id: 'static-2',
      name: "Floral Printed Pillow Cover",
      category: "pillow",
      price: 599,
      rating: 4.6,
      image: floralPillowCover,
      description: "Beautiful floral printed cotton pillow cover for a touch of elegance to your bedroom.",
      features: ['100% cotton material', 'Vibrant colors', 'Machine washable', 'Zipper closure'],
      stock: 50,
      in_stock: true
    },
    {
      id: 'static-3',
      name: "Hostel Size Bed",
      category: "bed",
      price: 9999,
      rating: 4.7,
      image: hostelSizeBed,
      description: "Compact and comfortable bed perfect for hostel and dormitory use.",
      features: ['Space-saving design', 'Durable construction', 'Easy to transport', 'Hypoallergenic'],
      stock: 35,
      in_stock: true
    },
    {
      id: 'static-4',
      name: "Kapok Cotton Fiber",
      category: "raw",
      price: 1999,
      rating: 4.9,
      image: kapokFiber,
      description: "Pure kapok cotton fiber for custom filling of pillows and cushions.",
      features: ['100% natural', 'Chemical-free', 'Hypoallergenic', 'Lightweight and fluffy'],
      stock: 100,
      in_stock: true
    },
    {
      id: 'static-5',
      name: "Kapok Silk Cotton Raw",
      category: "raw",
      price: 2499,
      rating: 4.9,
      image: kapokRaw,
      description: "Raw kapok silk cotton for premium quality mattress and pillow making.",
      features: ['Premium quality', 'Unprocessed raw material', 'Sustainable source', 'All-natural fibers'],
      stock: 75,
      in_stock: true
    },
    {
      id: 'static-6',
      name: "King Size Bed",
      category: "bed",
      price: 22999,
      rating: 5.0,
      image: kingSizeBed,
      description: "Luxurious king-sized bed for ultimate comfort and space.",
      features: ['Dimensions: 78" x 72"', 'Premium silk cotton filling', 'Extra comfort layer', 'Temperature regulating'],
      stock: 15,
      in_stock: true
    },
    {
      id: 'static-7',
      name: "Cotton Pillow",
      category: "pillow",
      price: 1299,
      rating: 4.7,
      image: cottonPillow,
      description: "Soft and comfortable cotton pillows for peaceful sleep.",
      features: ['Pure cotton fill', 'Perfect neck support', 'Dust mite resistant', 'Breathable fabric'],
      stock: 60,
      in_stock: true
    },
    {
      id: 'static-8',
      name: "Queen Size Bed",
      category: "bed",
      price: 18999,
      rating: 4.8,
      image: queenSizeBed,
      description: "Elegant queen-sized bed with premium comfort for couples.",
      features: ['Dimensions: 78" x 60"', 'Premium quality cotton', 'Medium-firm support', 'Durable stitching'],
      stock: 20,
      in_stock: true
    },
    {
      id: 'static-9',
      name: "Single Size Bed",
      category: "bed",
      price: 11999,
      rating: 4.8,
      image: singleSizeBed,
      description: "Comfortable single-sized bed perfect for one person.",
      features: ['Dimensions: 75" x 36"', 'Premium silk cotton filling', 'Ergonomic design', 'Lightweight and portable'],
      stock: 30,
      in_stock: true
    },
  ];

  // Function to load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loading cart from localStorage:', parsedCart);
        setCart(parsedCart);
        return parsedCart;
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.removeItem('cart');
    }
    return [];
  };

  // Function to save cart to localStorage
  const saveCartToStorage = (cartData) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartData));
      console.log('Cart saved to localStorage:', cartData);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/products/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform backend data to match your exact frontend structure
      const transformedProducts = data.products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category.toLowerCase(),
        price: product.price,
        rating: product.rating || 4.5,
        image: getProductImage(product),
        description: product.description,
        features: product.features || [],
        specifications: product.specifications || {},
        stock: product.stock || 0,
        in_stock: product.in_stock,
        is_low_stock: product.is_low_stock
      }));
      
      setProducts(transformedProducts);
      setUseBackend(true);
      console.log(`Loaded ${transformedProducts.length} products from backend`);
      
    } catch (error) {
      console.error('Backend fetch failed:', error);
      setError(`Backend connection failed: ${error.message}`);
      
      // Fallback to static data
      setProducts(staticProducts);
      setUseBackend(false);
      console.log(`Using static fallback data (${staticProducts.length} products)`);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Load cart from localStorage on mount and listen for changes
  useEffect(() => {
    // Load initial cart
    loadCartFromStorage();

    // Listen for storage changes (from other pages/tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        console.log('Storage event detected, updating cart');
        loadCartFromStorage();
      }
    };

    // Listen for custom cart update events (from same page)
    const handleCartUpdate = (e) => {
      console.log('Custom cart update event detected:', e.detail);
      if (e.detail && e.detail.cart) {
        setCart(e.detail.cart);
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Listen for navigation back to this page (when cart might have been updated)
  useEffect(() => {
    const handleFocus = () => {
      console.log('Page focused, checking for cart updates');
      loadCartFromStorage();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible, checking for cart updates');
        loadCartFromStorage();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Dynamic categories from products
  const categories = [
    { id: 'all', name: 'All Products' },
    ...Array.from(new Set(products.map(p => p.category)))
      .map(cat => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1)
      }))
  ];

  // Cart functions
  const toggleCart = () => {
    setCartVisible(!cartVisible);
    setOverlayVisible(!cartVisible);
  };

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
    
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    
    setCartVisible(true);
    setOverlayVisible(true);
    
    // Visual feedback
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

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Filter and sort products
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Switch between backend and static data
  const switchToStatic = () => {
    setProducts(staticProducts);
    setUseBackend(false);
    setError(null);
    console.log('Switched to static data');
  };

  // Loading state
  if (loading) {
    return (
      <div className="products-page">
        <div className="products-hero">
          <div className="hero-content">
            <h1>Our Products</h1>
            <p>Loading our premium collection...</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Cart overlay */}
      <div 
        className={`cart-overlay ${overlayVisible ? 'visible' : ''}`} 
        onClick={() => {
          setCartVisible(false);
          setOverlayVisible(false);
        }}
      ></div>
      
      <div className="products-hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Handcrafted with premium silk cotton for exceptional comfort</p>
          <div className="data-source-indicator">
            {useBackend ? (
              <span className="backend-indicator">Live Data ({sortedProducts.length} products)</span>
            ) : (
              <span className="static-indicator">Static Data ({sortedProducts.length} products)</span>
            )}
          </div>
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={fetchProducts} className="retry-btn">↻ Retry</button>
            </div>
          )}
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
            <option value="name">Name</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="control-buttons">
          <button onClick={fetchProducts} className="refresh-button" title="Refresh Backend Data">
            Refresh
          </button>
          {useBackend && (
            <button onClick={switchToStatic} className="static-button" title="Use Static Data">
              Static
            </button>
          )}
          {/* Custom Bed Creator Button */}
          <Link to="/custom-bed-creator" className="custom-bed-button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="6" width="18" height="11" rx="2" ry="2" />
              <path d="M12 2v4" />
              <path d="M7 8v2" />
              <path d="M17 8v2" />
            </svg>
            Create Custom Bed
          </Link>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-rating">
                <span>★</span> {product.rating}
              </div>
              {product.is_low_stock && product.stock > 0 && (
                <div className="low-stock-badge">Only {product.stock} left!</div>
              )}
              {!product.in_stock && (
                <div className="out-of-stock-badge">Out of Stock</div>
              )}
            </div>
            
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              {/* Show specifications if available */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="product-specs">
                  {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                    <span key={key} className="spec-item">
                      {key}: {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  ))}
                </div>
              )}
              
              <ul className="product-features">
                {product.features.slice(0, 3).map((feature, index) => (
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
                    className={`add-to-cart-btn ${!product.in_stock ? 'disabled' : ''}`}
                    data-product-id={product.id}
                    onClick={() => addToCart(product)}
                    disabled={!product.in_stock}
                  >
                    {!product.in_stock 
                      ? 'Out of Stock' 
                      : cart.some(item => item.id === product.id) 
                      ? 'Add More' 
                      : 'Add to Cart'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your filters.</p>
          <button onClick={() => setFilter('all')} className="reset-filters">
            Show All Products
          </button>
        </div>
      )}

      {/* Your existing cart JSX - keeping it exactly the same */}
      <div className={`mini-cart ${cartVisible ? 'visible' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h3>
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
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-quantity-badge">x{item.quantity}</div>
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4>{item.name}</h4>
                      <span className="cart-item-quantity">Qty: {item.quantity}</span>
                    </div>
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
              ))}
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
          <path d="m1 1 4 4 6 1 9-4v6l-6 3-1 6-4-1-4-4" />
        </svg>
        {cart.length > 0 && (
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        )}
      </button>
    </div>
  );
}

export default Products;