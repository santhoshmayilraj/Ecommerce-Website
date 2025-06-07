import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import './CustomBedCreator.css';

// Import a placeholder image for custom mattresses
import kingSizeBed from '../assets/images/kingsize.jpg';

// Simple 3D Loading Component (for inside Canvas)
function Canvas3DLoader() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.5}
      color="#666"
      anchorX="center"
      anchorY="middle"
    >
      Loading 3D Model...
    </Text>
  );
}

// Enhanced 3D Mattress Component
function MattressModel({ dimensions, design }) {
  const { length, breadth, height } = dimensions;
  
  // Convert inches to 3D scale (divide by 15 for better sizing)
  const scaleLength = length / 15;
  const scaleBreadth = breadth / 15;
  const scaleHeight = height / 15;

  const mattressColors = useMemo(() => {
    switch (design) {
      case 1:
        return { main: '#FFB6C1', accent: '#FF69B4', border: '#FF1493' }; // Pink
      case 2:
        return { main: '#87CEEB', accent: '#4169E1', border: '#0000CD' }; // Blue
      case 3:
        return { main: '#F0E68C', accent: '#DAA520', border: '#B8860B' }; // Gold
      case 4:
        return { main: '#F5F5F5', accent: '#D3D3D3', border: '#A9A9A9' }; // White/Gray
      default:
        return { main: '#F5F5DC', accent: '#DDD8C0', border: '#C0C0C0' }; // Beige
    }
  }, [design]);

  return (
    <group rotation={[0, Math.PI / 6, 0]} position={[0, 0, 0]}>
      {/* Main Mattress Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[scaleLength, scaleHeight, scaleBreadth]} />
        <meshStandardMaterial 
          color={mattressColors.main}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Top Comfort Layer */}
      <mesh position={[0, scaleHeight * 0.4, 0]} castShadow>
        <boxGeometry args={[scaleLength * 0.98, scaleHeight * 0.2, scaleBreadth * 0.98]} />
        <meshStandardMaterial 
          color={mattressColors.accent}
          roughness={0.3}
          metalness={0.05}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Border/Piping */}
      <mesh position={[0, scaleHeight * 0.45, 0]}>
        <boxGeometry args={[scaleLength * 1.02, scaleHeight * 0.1, scaleBreadth * 1.02]} />
        <meshStandardMaterial 
          color={mattressColors.border}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Corner Details */}
      {[
        [-scaleLength * 0.45, 0, -scaleBreadth * 0.45],
        [scaleLength * 0.45, 0, -scaleBreadth * 0.45],
        [-scaleLength * 0.45, 0, scaleBreadth * 0.45],
        [scaleLength * 0.45, 0, scaleBreadth * 0.45]
      ].map((position, i) => (
        <mesh key={`corner-${i}`} position={position}>
          <cylinderGeometry args={[0.08, 0.08, scaleHeight * 1.1, 8]} />
          <meshStandardMaterial 
            color={mattressColors.border}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Design-specific patterns */}
      {design === 1 && (
        // Floral pattern dots
        Array.from({ length: 12 }, (_, i) => {
          const x = (Math.random() - 0.5) * scaleLength * 0.8;
          const z = (Math.random() - 0.5) * scaleBreadth * 0.8;
          return (
            <mesh key={`flower-${i}`} position={[x, scaleHeight * 0.51, z]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#FF1493" />
            </mesh>
          );
        })
      )}

      {design === 2 && (
        // Geometric diamond pattern
        Array.from({ length: 6 }, (_, i) => {
          const x = ((i % 3) - 1) * scaleLength * 0.3;
          const z = (Math.floor(i / 3) - 0.5) * scaleBreadth * 0.4;
          return (
            <mesh key={`diamond-${i}`} position={[x, scaleHeight * 0.51, z]} rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[0.1, 0.02, 0.1]} />
              <meshStandardMaterial color="#0000CD" />
            </mesh>
          );
        })
      )}

      {design === 3 && (
        // Luxury gold accents
        Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = Math.min(scaleLength, scaleBreadth) * 0.3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={`luxury-${i}`} position={[x, scaleHeight * 0.51, z]}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.1} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// Enhanced Loading Component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-text">
          <h4>Loading 3D Model</h4>
          <p>Preparing your custom mattress preview...</p>
        </div>
      </div>
    </div>
  );
}

// Main Component
function CustomBedCreator() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    length: 75, // inches
    breadth: 54, // inches
    height: 8   // inches
  });
  
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Pricing calculation (unchanged)
  const calculatePrice = () => {
    const volume = dimensions.length * dimensions.breadth * dimensions.height;
    const basePrice = volume * 0.08;
    const designMultiplier = selectedDesign === 1 ? 1.2 : selectedDesign === 2 ? 1.4 : selectedDesign === 3 ? 1.8 : 1.1;
    return Math.round(basePrice * designMultiplier);
  };

  const handleDimensionChange = (dimension, value) => {
    const limits = {
      length: { min: 36, max: 96 },
      breadth: { min: 24, max: 84 },
      height: { min: 4, max: 16 }
    };
    
    setDimensions(prev => ({
      ...prev,
      [dimension]: Math.max(limits[dimension].min, Math.min(limits[dimension].max, parseInt(value) || 0))
    }));
  };

  const designs = [
    { 
      id: 1, 
      name: 'Floral Blossom', 
      description: 'Beautiful floral pattern with pink blooms',
      icon: '🌸',
      color: '#FFB6C1',
      gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
      features: ['Floral Print Design', 'Soft Pink Tones', 'Romantic Appeal', 'Premium Cotton Cover']
    },
    { 
      id: 2, 
      name: 'Geometric Blue', 
      description: 'Modern geometric diamond pattern in blue',
      icon: '💎',
      color: '#87CEEB',
      gradient: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
      features: ['Diamond Pattern', 'Ocean Blue Color', 'Contemporary Style', 'Wrinkle Resistant']
    },
    { 
      id: 3, 
      name: 'Luxury Gold', 
      description: 'Elegant damask pattern with gold accents',
      icon: '✨',
      color: '#F0E68C',
      gradient: 'linear-gradient(135deg, #F0E68C 0%, #DAA520 100%)',
      features: ['Damask Design', 'Gold Accents', 'Royal Elegance', 'Silk Touch Finish']
    },
    { 
      id: 4, 
      name: 'Minimalist White', 
      description: 'Clean lines and modern simplicity',
      icon: '⚪',
      color: '#F5F5F5',
      gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
      features: ['Clean Lines', 'Pure White', 'Modern Appeal', 'Easy Care']
    }
  ];

  // Add to cart function (unchanged - preserving existing logic)
  const addToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      const customMattress = {
        id: `custom-mattress-${Date.now()}`,
        name: `Custom ${designs.find(d => d.id === selectedDesign)?.name} Mattress`,
        category: 'custom-mattress',
        price: calculatePrice(),
        rating: 5.0,
        image: kingSizeBed,
        description: `Custom ${designs.find(d => d.id === selectedDesign)?.name.toLowerCase()} mattress with dimensions ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
        features: [
          `Dimensions: ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
          ...designs.find(d => d.id === selectedDesign)?.features || [],
          'Premium silk cotton filling',
          'Custom handcrafted mattress'
        ],
        isCustom: true,
        customSpecs: { dimensions, design: selectedDesign },
        stock: 1,
        in_stock: true
      };

      // Get existing cart
      const existingCartString = localStorage.getItem('cart');
      const existingCart = existingCartString ? JSON.parse(existingCartString) : [];
      
      // Add new item
      const updatedCart = [...existingCart, { ...customMattress, quantity: 1 }];
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Trigger storage event manually for same-window updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        newValue: JSON.stringify(updatedCart),
        oldValue: existingCartString
      }));

      // Also dispatch custom event
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { 
          cart: updatedCart, 
          newItem: customMattress 
        } 
      }));
      
      // Debug log
      console.log('Custom mattress added to cart:', customMattress);
      console.log('Updated cart:', updatedCart);
      
      // Show success message
      alert('🎉 Custom mattress added to cart successfully!');
      
      // Navigate back to products page
      setTimeout(() => {
        navigate('/products');
      }, 500);
      
    } catch (error) {
      console.error('Error adding custom mattress to cart:', error);
      alert('❌ Error adding mattress to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleCanvasCreated = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="custom-mattress-creator">
      {/* Enhanced Header */}
      <div className="creator-header">
        <div className="header-background"></div>
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/products')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
          
          <div className="header-main">
            <div className="header-text">
              <span className="header-badge">
                <span className="badge-icon">🛏️</span>
                Custom Design Studio
              </span>
              <h1>Create Your Perfect Mattress</h1>
              <p>Experience premium comfort with our advanced 3D design technology. Craft a mattress that's uniquely yours.</p>
            </div>
            
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌟</div>
                <div className="stat-content">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Premium Materials</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛡️</div>
                <div className="stat-content">
                  <span className="stat-number">10 Year</span>
                  <span className="stat-label">Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW LAYOUT: Main content with side-by-side layout */}
      <div className="creator-content">
        {/* Left side: Controls and 3D Preview */}
        <div className="left-panel">
          {/* Dimensions Section */}
          <div className="panel-section dimension-controls">
            <div className="section-header">
              <div className="section-icon">📏</div>
              <div className="section-text">
                <h3>Mattress Dimensions</h3>
                <span className="section-subtitle">Customize to your exact needs</span>
              </div>
            </div>
            
            <div className="dimension-grid">
              {[
                { key: 'length', label: 'Length', icon: '📏', min: 36, max: 96, unit: '"' },
                { key: 'breadth', label: 'Width', icon: '📐', min: 24, max: 84, unit: '"' },
                { key: 'height', label: 'Height', icon: '📊', min: 4, max: 16, unit: '"' }
              ].map(({ key, label, icon, min, max, unit }) => (
                <div key={key} className="dimension-group">
                  <label htmlFor={key}>
                    <span className="dimension-icon">{icon}</span>
                    <span className="dimension-label">{label}</span>
                    <span className="dimension-value">{dimensions[key]}{unit}</span>
                  </label>
                  <div className="input-container">
                    <input
                      type="range"
                      id={key}
                      min={min}
                      max={max}
                      value={dimensions[key]}
                      onChange={(e) => handleDimensionChange(key, e.target.value)}
                      className="dimension-slider"
                    />
                    <input
                      type="number"
                      value={dimensions[key]}
                      onChange={(e) => handleDimensionChange(key, e.target.value)}
                      className="dimension-input"
                      min={min}
                      max={max}
                    />
                  </div>
                  <div className="dimension-range">{min}" - {max}"</div>
                </div>
              ))}
            </div>
            
            <div className="dimension-summary">
              <div className="summary-item">
                <span className="summary-label">Total Area:</span>
                <span className="summary-value">{(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Volume:</span>
                <span className="summary-value">{(dimensions.length * dimensions.breadth * dimensions.height / 1728).toFixed(2)} cu ft</span>
              </div>
            </div>
          </div>

          {/* 3D Preview Panel */}
          <div className="preview-panel">
            <div className="panel-header">
              <div className="header-left">
                <h3>3D Preview</h3>
                <span className="preview-subtitle">Real-time mattress visualization</span>
              </div>
              <div className="preview-controls">
                <span className="control-hint">
                  <span className="control-icon">🖱️</span>
                  Drag to rotate
                </span>
                <span className="control-hint">
                  <span className="control-icon">🔍</span>
                  Scroll to zoom
                </span>
              </div>
            </div>
            
            <div className="canvas-container">
              {isLoading && (
                <div className="loading-overlay">
                  <LoadingSpinner />
                </div>
              )}
              
              <Canvas 
                camera={{ position: [5, 3, 5], fov: 60 }}
                onCreated={handleCanvasCreated}
                className={`preview-canvas ${isLoading ? 'loading' : 'loaded'}`}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  
                  <MattressModel 
                    dimensions={dimensions} 
                    design={selectedDesign}
                  />
                  
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={10}
                    autoRotate={false}
                    dampingFactor={0.05}
                    enableDamping={true}
                  />
                  
                  <Environment preset="city" />
                  
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial 
                      color="#ffffff" 
                      transparent 
                      opacity={0.3}
                      roughness={0.8}
                    />
                  </mesh>
                </Suspense>
              </Canvas>
            </div>
            
            <div className="preview-info">
              <div className="dimension-display">
                <div className="dimension-tag">
                  <span className="tag-label">L</span>
                  <span className="tag-value">{dimensions.length}"</span>
                </div>
                <div className="dimension-tag">
                  <span className="tag-label">W</span>
                  <span className="tag-value">{dimensions.breadth}"</span>
                </div>
                <div className="dimension-tag">
                  <span className="tag-label">H</span>
                  <span className="tag-value">{dimensions.height}"</span>
                </div>
              </div>
              
              <div className="mattress-summary">
                <div className="summary-row">
                  <span className="summary-label">Design:</span>
                  <span className="summary-value">{designs.find(d => d.id === selectedDesign)?.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Size:</span>
                  <span className="summary-value">{(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Design Selection and Price */}
        <div className="right-panel">
          {/* HORIZONTAL Design Selection */}
          <div className="panel-section design-selection-horizontal">
            <div className="section-header">
              <div className="section-icon">🎨</div>
              <div className="section-text">
                <h3>Design & Pattern</h3>
                <span className="section-subtitle">Choose your style preference</span>
              </div>
            </div>
            
            <div className="design-options-horizontal">
              {designs.map(design => (
                <div
                  key={design.id}
                  className={`design-card-horizontal ${selectedDesign === design.id ? 'active' : ''}`}
                  onClick={() => setSelectedDesign(design.id)}
                >
                  <div className="design-header-horizontal">
                    <div className="design-icon-horizontal">{design.icon}</div>
                    <div 
                      className="color-preview-horizontal" 
                      style={{ background: design.gradient }}
                    ></div>
                  </div>
                  
                  <div className="design-info-horizontal">
                    <h4 className="design-name-horizontal">{design.name}</h4>
                    <p className="design-desc-horizontal">{design.description}</p>
                    
                    <div className="design-features-horizontal">
                      {design.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag-horizontal">{feature}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="design-selector-horizontal">
                    <div className="radio-button-horizontal">
                      <div className="radio-inner-horizontal"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Price Section */}
          <div className="panel-section price-display">
            <div className="price-header">
              <div className="price-icon">💰</div>
              <div className="price-text">
                <h3>Custom Mattress Price</h3>
                <div className="price-amount">₹{calculatePrice().toLocaleString()}</div>
              </div>
            </div>
            
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>Base Price:</span>
                <span>₹{Math.round(dimensions.length * dimensions.breadth * dimensions.height * 0.08).toLocaleString()}</span>
              </div>
              <div className="breakdown-item">
                <span>Design Premium:</span>
                <span>{selectedDesign === 1 ? '+20%' : selectedDesign === 2 ? '+40%' : selectedDesign === 3 ? '+80%' : '+10%'}</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-item total">
                <span>Total Price:</span>
                <span>₹{calculatePrice().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="price-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Premium Materials Included</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>10-Year Warranty</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Free Home Delivery</span>
              </div>
            </div>
            
            <button 
              className={`add-to-cart-custom ${isAddingToCart ? 'loading' : ''}`}
              onClick={addToCart}
              disabled={isAddingToCart}
            >
              <div className="button-content">
                <span className="button-icon">
                  {isAddingToCart ? '⏳' : '🛒'}
                </span>
                <span className="button-text">
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </span>
              </div>
              {isAddingToCart && <div className="button-loader"></div>}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Specifications */}
      <div className="specifications">
        <div className="spec-header">
          <h3>Technical Specifications</h3>
          <p>Detailed information about your custom mattress</p>
        </div>
        
        <div className="spec-grid">
          <div className="spec-item">
            <div className="spec-icon">📦</div>
            <div className="spec-content">
              <strong>Volume</strong>
              <span>{(dimensions.length * dimensions.breadth * dimensions.height / 1728).toFixed(2)} cubic feet</span>
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-icon">🌿</div>
            <div className="spec-content">
              <strong>Material</strong>
              <span>Premium Silk Cotton & Memory Foam</span>
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-icon">🎨</div>
            <div className="spec-content">
              <strong>Pattern</strong>
              <span>{designs.find(d => d.id === selectedDesign)?.name}</span>
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-icon">🛡️</div>
            <div className="spec-content">
              <strong>Warranty</strong>
              <span>10 Years Full Coverage</span>
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-icon">🚚</div>
            <div className="spec-content">
              <strong>Delivery</strong>
              <span>Free Home Delivery in 7-14 days</span>
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-icon">⚖️</div>
            <div className="spec-content">
              <strong>Weight</strong>
              <span>~{Math.round(dimensions.length * dimensions.breadth * dimensions.height * 0.02)} lbs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomBedCreator;