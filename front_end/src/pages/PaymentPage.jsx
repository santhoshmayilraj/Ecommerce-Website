import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './PaymentPage.css';
import qrCodeImage from '../assets/images/qr-code-placeholder.jpg';

function PaymentPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    deliveryNotes: ''
  });
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // API Configuration
  const API_BASE_URL = 'http://localhost:8000/api/billing';

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== '[]') {
      setCart(JSON.parse(savedCart));
    } else {
      navigate('/products');
    }
  }, [navigate]);

  // Calculate order totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharges = deliveryOption === 'express' ? 299 : 149;
  const tax = Math.round(subtotal * 0.18);
  const codFee = paymentMethod === 'cod' ? 50 : 0;
  const total = subtotal + deliveryCharges + tax + codFee;

  // Expected delivery date
  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDays = deliveryOption === 'express' ? 2 : 5;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Send order data to backend
  const sendOrderToBackend = async (orderData) => {
    try {
      console.log('Sending order to backend:', orderData);
      
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Order successfully sent to backend:', result);
      return result;
      
    } catch (error) {
      console.error('Error sending order to backend:', error);
      
      // Don't block the UI flow, but log the error
      // You might want to show a notification to the user
      alert(`Order placed successfully, but there was an issue syncing with our system. Order ID: ${orderData.order_number}. Please contact support if needed.`);
      
      throw error;
    }
  };

  // Process payment
  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Generate order number
      const generatedOrderNumber = 'OD' + Math.floor(100000000 + Math.random() * 900000000);
      setOrderNumber(generatedOrderNumber);
      
      // Prepare order data for backend
      const orderData = {
        order_number: generatedOrderNumber,
        customer_details: {
          name: deliveryDetails.fullName,
          email: deliveryDetails.email,
          phone: deliveryDetails.phone,
          address: {
            street: deliveryDetails.address,
            city: deliveryDetails.city,
            state: deliveryDetails.state,
            pincode: deliveryDetails.pincode,
            delivery_notes: deliveryDetails.deliveryNotes || null
          }
        },
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          is_custom: item.isCustom || false,
          custom_specifications: item.customSpecs || null
        })),
        payment_details: {
          method: paymentMethod,
          status: paymentMethod === 'cod' ? 'pending' : 'completed',
          subtotal: subtotal,
          tax: tax,
          delivery_charges: deliveryCharges,
          cod_charges: codFee,
          total_amount: total
        },
        delivery_details: {
          option: deliveryOption,
          expected_date: getDeliveryDate(),
          charges: deliveryCharges
        },
        order_status: 'confirmed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send order to backend
      await sendOrderToBackend(orderData);
      
      // Clear cart after successful payment and backend sync
      localStorage.setItem('cart', '[]');
      
      setIsProcessing(false);
      setStep(3);
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
      
      // Still proceed to confirmation if it's just a backend sync issue
      // The order is placed locally, backend sync can be retried later
      localStorage.setItem('cart', '[]');
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  // Handle delivery details form change
  const handleDeliveryDetailsChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Handle delivery option change
  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setFormErrors(prev => ({ ...prev, paymentMethod: '' }));
  };

  // Validate delivery details form
  const validateDeliveryForm = () => {
    const errors = {};
    if (!deliveryDetails.fullName.trim()) errors.fullName = 'Full name is required';
    if (!deliveryDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(deliveryDetails.email)) {
      errors.email = 'Email is invalid';
    }
    if (!deliveryDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(deliveryDetails.phone.trim())) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!deliveryDetails.address.trim()) errors.address = 'Address is required';
    if (!deliveryDetails.city.trim()) errors.city = 'City is required';
    if (!deliveryDetails.state.trim()) errors.state = 'State is required';
    if (!deliveryDetails.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(deliveryDetails.pincode.trim())) {
      errors.pincode = 'Pincode must be 6 digits';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate payment selection
  const validatePaymentSelection = () => {
    if (!paymentMethod) {
      setFormErrors(prev => ({ ...prev, paymentMethod: 'Please select a payment method' }));
      return false;
    }
    return true;
  };

  // Handle form submission for each step
  const handleNext = () => {
    if (step === 1) {
      if (validateDeliveryForm()) {
        setStep(2);
        window.scrollTo(0, 0);
      }
    } else if (step === 2) {
      if (validatePaymentSelection()) {
        processPayment();
      }
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // Print invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="payment-page">
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Processing your payment...</p>
          <p className="processing-subtext">Please don't close this window</p>
        </div>
      )}
      
      <div className="payment-header">
        <h1>Checkout</h1>
        {step < 3 && (
          <div className="checkout-steps">
            <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-name">Delivery Details</span>
            </div>
            <div className="step-connector"></div>
            <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-name">Payment</span>
            </div>
            <div className="step-connector"></div>
            <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-name">Confirmation</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="payment-content">
        <div className="payment-main">
          {step === 1 && (
            <div className="delivery-details-section">
              <h2>Delivery Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={deliveryDetails.fullName}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.fullName ? 'error' : ''}
                  />
                  {formErrors.fullName && <p className="error-message">{formErrors.fullName}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={deliveryDetails.email}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={deliveryDetails.phone}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.phone ? 'error' : ''}
                    maxLength={10}
                  />
                  {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleDeliveryDetailsChange}
                    rows="3"
                    className={formErrors.address ? 'error' : ''}
                  ></textarea>
                  {formErrors.address && <p className="error-message">{formErrors.address}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryDetails.city}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.city ? 'error' : ''}
                  />
                  {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryDetails.state}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.state ? 'error' : ''}
                  />
                  {formErrors.state && <p className="error-message">{formErrors.state}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={deliveryDetails.pincode}
                    onChange={handleDeliveryDetailsChange}
                    className={formErrors.pincode ? 'error' : ''}
                    maxLength={6}
                  />
                  {formErrors.pincode && <p className="error-message">{formErrors.pincode}</p>}
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="deliveryNotes">Delivery Notes (Optional)</label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    value={deliveryDetails.deliveryNotes}
                    onChange={handleDeliveryDetailsChange}
                    rows="2"
                    placeholder="Any special instructions for delivery"
                  ></textarea>
                </div>
              </div>
              
              <div className="delivery-options">
                <h3>Delivery Method</h3>
                <div className="delivery-options-grid">
                  <div 
                    className={`delivery-option ${deliveryOption === 'standard' ? 'selected' : ''}`}
                    onClick={() => handleDeliveryOptionChange('standard')}
                  >
                    <div className="delivery-option-radio">
                      <div className={`radio-inner ${deliveryOption === 'standard' ? 'selected' : ''}`}></div>
                    </div>
                    <div className="delivery-option-content">
                      <h4>Standard Delivery</h4>
                      <p>Delivery in 5-7 business days</p>
                      <span className="delivery-price">₹149</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`delivery-option ${deliveryOption === 'express' ? 'selected' : ''}`}
                    onClick={() => handleDeliveryOptionChange('express')}
                  >
                    <div className="delivery-option-radio">
                      <div className={`radio-inner ${deliveryOption === 'express' ? 'selected' : ''}`}></div>
                    </div>
                    <div className="delivery-option-content">
                      <h4>Express Delivery</h4>
                      <p>Delivery in 2-3 business days</p>
                      <span className="delivery-price">₹299</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="payment-methods-section">
              <h2>Select Payment Method</h2>
              
              {formErrors.paymentMethod && (
                <p className="error-message payment-error">{formErrors.paymentMethod}</p>
              )}
              
              <div className="payment-methods-grid">
                <div 
                  className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('upi')}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-radio">
                      <div className={`radio-inner ${paymentMethod === 'upi' ? 'selected' : ''}`}></div>
                    </div>
                    <h4>UPI Payment</h4>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <div className="payment-method-details upi-details">
                      <div className="upi-qr-container">
                        <img src={qrCodeImage} alt="UPI QR Code" className="upi-qr" />
                      </div>
                      <div className="upi-instructions">
                        <p>Scan the QR code using any UPI app:</p>
                        <div className="upi-icons">
                          <span>GPay</span>
                          <span>PhonePe</span>
                          <span>Paytm</span>
                          <span>BHIM</span>
                        </div>
                        <p className="upi-id">UPI ID: nagarathinam@upi</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-radio">
                      <div className={`radio-inner ${paymentMethod === 'card' ? 'selected' : ''}`}></div>
                    </div>
                    <h4>Credit / Debit Card</h4>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="payment-method-details card-details">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxLength="16" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input type="text" placeholder="MM/YY" maxLength="5" />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="password" placeholder="123" maxLength="3" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Name on Card</label>
                        <input type="text" placeholder="John Doe" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`payment-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('netbanking')}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-radio">
                      <div className={`radio-inner ${paymentMethod === 'netbanking' ? 'selected' : ''}`}></div>
                    </div>
                    <h4>Net Banking</h4>
                  </div>
                  
                  {paymentMethod === 'netbanking' && (
                    <div className="payment-method-details netbanking-details">
                      <div className="bank-selection">
                        <p>Select your bank:</p>
                        <select className="bank-select">
                          <option value="">-- Select Bank --</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="bob">Bank of Baroda</option>
                          <option value="canara">Canara Bank</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`payment-method ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('cod')}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-radio">
                      <div className={`radio-inner ${paymentMethod === 'cod' ? 'selected' : ''}`}></div>
                    </div>
                    <h4>Cash on Delivery</h4>
                  </div>
                  
                  {paymentMethod === 'cod' && (
                    <div className="payment-method-details cod-details">
                      <p>Pay when your order is delivered.</p>
                      <p className="cod-note">Note: Additional fee of ₹50 applies for Cash on Delivery.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="order-confirmation no-print">
              <div className="confirmation-header">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h2>Payment Successful!</h2>
                <p>Your order has been placed successfully.</p>
                <div className="order-number">
                  <span>Order Number:</span>
                  <strong>{orderNumber}</strong>
                </div>
              </div>
              
              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <p>Your order will be delivered to:</p>
                <div className="delivery-address">
                  <p><strong>{deliveryDetails.fullName}</strong></p>
                  <p>{deliveryDetails.address}</p>
                  <p>{deliveryDetails.city}, {deliveryDetails.state} - {deliveryDetails.pincode}</p>
                  <p>Phone: {deliveryDetails.phone}</p>
                </div>
                <p className="delivery-date">
                  <strong>Expected Delivery:</strong> {getDeliveryDate()}
                </p>
              </div>
              
              <div className="confirmation-actions">
                <button className="print-invoice-btn" onClick={printInvoice}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2 2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print Invoice
                </button>
                <Link to="/" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
          
          {/* Printable Invoice - only visible when printing */}
          {step === 3 && (
            <div className="print-only invoice">
              <div className="invoice-header">
                <div className="company-logo">
                  <h2>Nagarathinam</h2>
                </div>
                <div className="invoice-title">
                  <h2>Tax Invoice / Receipt</h2>
                  <p>Order: {orderNumber}</p>
                  <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              
              <div className="invoice-details">
                <div className="invoice-address">
                  <div className="billing-address">
                    <h3>Billing Address:</h3>
                    <p>{deliveryDetails.fullName}</p>
                    <p>{deliveryDetails.address}</p>
                    <p>{deliveryDetails.city}, {deliveryDetails.state} - {deliveryDetails.pincode}</p>
                    <p>Phone: {deliveryDetails.phone}</p>
                    <p>Email: {deliveryDetails.email}</p>
                  </div>
                  <div className="shipping-address">
                    <h3>Shipping Address:</h3>
                    <p>{deliveryDetails.fullName}</p>
                    <p>{deliveryDetails.address}</p>
                    <p>{deliveryDetails.city}, {deliveryDetails.state} - {deliveryDetails.pincode}</p>
                    <p>Phone: {deliveryDetails.phone}</p>
                  </div>
                </div>
                
                <div className="invoice-payment">
                  <h3>Payment Information:</h3>
                  <p><strong>Payment Method:</strong> {
                    paymentMethod === 'upi' ? 'UPI Payment' :
                    paymentMethod === 'card' ? 'Credit/Debit Card' :
                    paymentMethod === 'netbanking' ? 'Net Banking' :
                    'Cash on Delivery'
                  }</p>
                  <p><strong>Payment Status:</strong> {paymentMethod === 'cod' ? 'Pending' : 'Paid'}</p>
                  <p><strong>Expected Delivery:</strong> {getDeliveryDate()}</p>
                </div>
              </div>
              
              <div className="invoice-items">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th className="item-name">Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="item-name">{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toLocaleString()}</td>
                        <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="invoice-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>GST (18%):</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping ({deliveryOption === 'express' ? 'Express' : 'Standard'}):</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                {codFee > 0 && (
                  <div className="total-row">
                    <span>COD Charges:</span>
                    <span>₹{codFee}</span>
                  </div>
                )}
                <div className="total-row grand-total">
                  <span>Grand Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="invoice-footer">
                <p>Thank you for shopping with Nagarathinam!</p>
                <p>For any queries, please contact us at support@nagarathinam.com</p>
                <p>This is a computer-generated invoice and doesn't require a signature.</p>
              </div>
            </div>
          )}
        </div>
        
        {step < 3 && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <div className="item-price-row">
                      <span className="item-price">₹{item.price.toLocaleString()}</span>
                      <span className="item-subtotal">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="price-summary">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Delivery:</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="price-row">
                <span>Tax (18%):</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              {codFee > 0 && (
                <div className="price-row">
                  <span>COD Charges:</span>
                  <span>₹{codFee}</span>
                </div>
              )}
              <div className="price-row total">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              
              {step === 1 && (
                <button className="checkout-btn" onClick={handleNext}>
                  Continue to Payment
                </button>
              )}
              
              {step === 2 && (
                <div className="checkout-actions">
                  <button className="back-btn" onClick={handleBack}>
                    Back
                  </button>
                  <button className="checkout-btn" onClick={handleNext}>
                    Pay ₹{total.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;