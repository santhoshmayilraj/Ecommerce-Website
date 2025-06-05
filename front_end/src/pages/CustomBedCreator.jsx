import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import './CustomBedCreator.css';

// Import default image
import doubleSizeBed from '../assets/images/mattress.jpg';

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

// Fixed 3D Mattress Component - WILL NOT CHANGE
function MattressModel({ dimensions }) {
  const { length, breadth, height } = dimensions;
  
  // Convert inches to 3D scale (divide by 15 for better sizing)
  const scaleLength = length / 15;
  const scaleBreadth = breadth / 15;
  const scaleHeight = height / 15;

  // Fixed mattress colors - always white/cream regardless of selection
  const mattressColors = {
    main: '#FFFEF7',
    accent: '#FFFFFF', 
    border: '#2C2C2C'
  };

  return (
    <group rotation={[0, Math.PI / 6, 0]} position={[0, 0, 0]}>
      {/* Main Mattress Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[scaleLength, scaleHeight, scaleBreadth]} />
        <meshStandardMaterial 
          color={mattressColors.main}
          roughness={0.7}
          metalness={0.0}
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

      {/* Border/Piping - The 4 dark lines */}
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

      {/* Fixed quilted pattern - doesn't change */}
      {Array.from({ length: Math.floor(scaleLength * 2) }, (_, i) => 
        Array.from({ length: Math.floor(scaleBreadth * 2) }, (_, j) => {
          const x = (i - Math.floor(scaleLength)) * 0.7;
          const z = (j - Math.floor(scaleBreadth)) * 0.7;
          return (
            <mesh 
              key={`quilt-${i}-${j}`} 
              position={[x, scaleHeight * 0.51, z]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
              <meshStandardMaterial 
                color="#E0E0E0"
                roughness={0.4}
                metalness={0.0}
              />
            </mesh>
          );
        })
      ).flat()}
    </group>
  );
}

// Enhanced Loading Component
function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner-container">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h3 className="loading-title">Crafting Your Mattress</h3>
        <p className="loading-subtitle">Creating the perfect sleep experience...</p>
      </div>
    </div>
  );
}

// Size recommendation component
function SizeRecommendations({ onSelectSize }) {
  const sizePresets = [
    { name: 'Twin', length: 75, breadth: 38, height: 8, icon: '🛏️', desc: 'Perfect for children' },
    { name: 'Full', length: 75, breadth: 54, height: 8, icon: '🛌', desc: 'Ideal for single adults' },
    { name: 'Queen', length: 80, breadth: 60, height: 10, icon: '👑', desc: 'Most popular choice' },
    { name: 'King', length: 80, breadth: 76, height: 12, icon: '🏰', desc: 'Maximum comfort' }
  ];

  return (
    <div className="size-recommendations">
      <h4>Quick Size Selection</h4>
      <div className="size-preset-grid">
        {sizePresets.map((size, index) => (
          <div 
            key={index} 
            className="size-preset-card"
            onClick={() => onSelectSize(size)}
          >
            <span className="size-icon">{size.icon}</span>
            <h5>{size.name}</h5>
            <p className="size-dimensions">{size.length}" × {size.breadth}"</p>
            <p className="size-desc">{size.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Live price calculator component
function PriceBreakdown({ dimensions, selectedDesign, designs }) {
  const volume = dimensions.length * dimensions.breadth * dimensions.height;
  const basePrice = Math.round(volume * 0.08);
  const designMultiplier = selectedDesign === 1 ? 1.2 : selectedDesign === 2 ? 1.4 : selectedDesign === 3 ? 1.8 : 1.1;
  const designPremium = Math.round(basePrice * (designMultiplier - 1));
  const totalPrice = Math.round(basePrice * designMultiplier);

  return (
    <div className="price-breakdown-detailed">
      <div className="price-calculation">
        <div className="calc-row">
          <span>Volume ({dimensions.length}" × {dimensions.breadth}" × {dimensions.height}")</span>
          <span>{volume.toLocaleString()} cu in</span>
        </div>
        <div className="calc-row">
          <span>Base Price (₹0.08 per cu in)</span>
          <span>₹{basePrice.toLocaleString()}</span>
        </div>
        <div className="calc-row">
          <span>{designs.find(d => d.id === selectedDesign)?.name} Premium</span>
          <span>₹{designPremium.toLocaleString()}</span>
        </div>
        <div className="calc-separator"></div>
        <div className="calc-total">
          <span>Total Amount</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// Main Component with IMPROVED LAYOUT
function CustomBedCreator() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    length: 75,
    breadth: 54,
    height: 8
  });
  
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dimensions');

  // Pricing calculation - SAME LOGIC
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

  const handleSizePresetSelect = (preset) => {
    setDimensions({
      length: preset.length,
      breadth: preset.breadth,
      height: preset.height
    });
  };

  const designs = [
    { 
      id: 1, 
      name: 'Floral Blossom', 
      description: 'Beautiful floral pattern with pink blooms',
      icon: '🌸',
      color: '#FFB6C1',
      features: ['Floral Print Design', 'Soft Pink Tones', 'Romantic Appeal', 'Premium Cotton Cover']
    },
    { 
      id: 2, 
      name: 'Geometric Blue', 
      description: 'Modern geometric diamond pattern in blue',
      icon: '💎',
      color: '#87CEEB',
      features: ['Diamond Pattern', 'Ocean Blue Color', 'Contemporary Style', 'Wrinkle Resistant']
    },
    { 
      id: 3, 
      name: 'Luxury Gold', 
      description: 'Elegant damask pattern with gold accents',
      icon: '✨',
      color: '#F0E68C',
      features: ['Damask Design', 'Gold Accents', 'Royal Elegance', 'Silk Touch Finish']
    },
    { 
      id: 4, 
      name: 'Minimalist White', 
      description: 'Clean lines and modern simplicity',
      icon: '⚪',
      color: '#F5F5F5',
      features: ['Clean Lines', 'Pure White', 'Modern Appeal', 'Easy Care']
    }
  ];

  // SAME ADD TO CART LOGIC - UNCHANGED
  const addToCart = () => {
    try {
      const customMattress = {
        id: `custom-mattress-${Date.now()}`,
        name: `Custom ${designs.find(d => d.id === selectedDesign)?.name} Mattress`,
        category: 'custom-mattress',
        price: calculatePrice(),
        rating: 5.0,
        image: doubleSizeBed,
        description: `Custom ${designs.find(d => d.id === selectedDesign)?.name.toLowerCase()} mattress with dimensions ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
        features: [
          `Dimensions: ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
          ...designs.find(d => d.id === selectedDesign)?.features || [],
          'Premium silk cotton filling',
          'Custom handcrafted mattress'
        ],
        isCustom: true,
        customSpecs: { 
          dimensions: { ...dimensions }, 
          design: selectedDesign,
          designName: designs.find(d => d.id === selectedDesign)?.name
        },
        quantity: 1
      };

      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...existingCart, customMattress];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      alert('Custom mattress added to cart successfully!');
      navigate('/products');
      
    } catch (error) {
      console.error('Error adding custom mattress to cart:', error);
      alert('Error adding mattress to cart. Please try again.');
    }
  };

  const handleCanvasCreated = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="mattress-studio">
      {/* IMMERSIVE HEADER */}
      <header className="studio-header">
        <div className="header-background">
          <div className="header-pattern"></div>
        </div>
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/products')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Store
          </button>
          
          <div className="header-main">
            <div className="studio-branding">
              <div className="studio-icon">🛏️</div>
              <h1>Dream Mattress Studio</h1>
              <p>Design your perfect sleep sanctuary</p>
            </div>
            
            <div className="live-price-display">
              <div className="price-label">Your Custom Price</div>
              <div className="price-amount">₹{calculatePrice().toLocaleString()}</div>
              <div className="price-savings">Save 30% vs retail</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="studio-workspace">
        {/* LEFT PANEL - 3D PREVIEW & STATS */}
        <div className="preview-panel">
          {/* 3D Canvas */}
          <div className="canvas-section">
            <div className="canvas-header">
              <h3>Live 3D Preview</h3>
              <div className="canvas-controls">
                <span className="control-hint">🖱️ Drag to rotate</span>
                <span className="control-hint">🔍 Scroll to zoom</span>
              </div>
            </div>
            
            <div className="canvas-container">
              {isLoading && <LoadingSpinner />}
              
              <Canvas 
                camera={{ position: [5, 3, 5], fov: 60 }}
                onCreated={handleCanvasCreated}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.8s ease-in-out'
                }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  
                  <MattressModel dimensions={dimensions} />
                  
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
                  
                  <Environment preset="studio" />
                  
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial 
                      color="#f8fafc" 
                      transparent 
                      opacity={0.4}
                      roughness={0.8}
                    />
                  </mesh>
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Stats & Specifications */}
          <div className="preview-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📐</div>
                <div className="stat-content">
                  <h4>Dimensions</h4>
                  <p>{dimensions.length}" × {dimensions.breadth}" × {dimensions.height}"</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h4>Surface Area</h4>
                  <p>{(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🎨</div>
                <div className="stat-content">
                  <h4>Design</h4>
                  <p>{designs.find(d => d.id === selectedDesign)?.name}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⚖️</div>
                <div className="stat-content">
                  <h4>Est. Weight</h4>
                  <p>{Math.round(dimensions.length * dimensions.breadth * dimensions.height / 200)} lbs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER PANEL - CONTROLS */}
        <div className="controls-panel">
          {/* Tab Navigation */}
          <div className="control-tabs">
            <button 
              className={`tab-button ${activeTab === 'dimensions' ? 'active' : ''}`}
              onClick={() => setActiveTab('dimensions')}
            >
              <span className="tab-icon">📏</span>
              <span>Size</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <span className="tab-icon">🎨</span>
              <span>Design</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              <span className="tab-icon">🧵</span>
              <span>Materials</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'dimensions' && (
              <div className="dimensions-tab">
                <div className="tab-header">
                  <h3>Perfect Size Selection</h3>
                  <p>Customize every dimension to fit your space perfectly</p>
                </div>

                <SizeRecommendations onSelectSize={handleSizePresetSelect} />

                <div className="custom-dimensions">
                  <h4>Custom Dimensions</h4>
                  <div className="dimension-controls">
                    {['length', 'breadth', 'height'].map((dim) => {
                      const labels = { length: 'Length', breadth: 'Width', height: 'Thickness' };
                      const limits = {
                        length: { min: 36, max: 96 },
                        breadth: { min: 24, max: 84 },
                        height: { min: 4, max: 16 }
                      };
                      
                      return (
                        <div key={dim} className="dimension-slider-group">
                          <div className="slider-header">
                            <label>{labels[dim]}</label>
                            <span className="dimension-value">{dimensions[dim]}"</span>
                          </div>
                          <input
                            type="range"
                            min={limits[dim].min}
                            max={limits[dim].max}
                            value={dimensions[dim]}
                            onChange={(e) => handleDimensionChange(dim, e.target.value)}
                            className="dimension-slider"
                          />
                          <div className="slider-range">
                            <span>{limits[dim].min}"</span>
                            <span>{limits[dim].max}"</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="design-tab">
                <div className="tab-header">
                  <h3>Style & Pattern</h3>
                  <p>Choose from our premium design collection</p>
                </div>

                <div className="design-gallery">
                  {designs.map(design => (
                    <div
                      key={design.id}
                      className={`design-card ${selectedDesign === design.id ? 'selected' : ''}`}
                      onClick={() => setSelectedDesign(design.id)}
                    >
                      <div className="design-preview">
                        <div className="design-icon">{design.icon}</div>
                        <div 
                          className="design-color" 
                          style={{ backgroundColor: design.color }}
                        ></div>
                      </div>
                      <div className="design-info">
                        <h4>{design.name}</h4>
                        <p>{design.description}</p>
                        <div className="design-features">
                          {design.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="feature-badge">{feature}</span>
                          ))}
                        </div>
                      </div>
                      {selectedDesign === design.id && (
                        <div className="selected-indicator">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="materials-tab">
                <div className="tab-header">
                  <h3>Premium Materials</h3>
                  <p>Every mattress is crafted with the finest materials</p>
                </div>

                <div className="materials-showcase">
                  <div className="material-card">
                    <div className="material-icon">🌿</div>
                    <h4>Organic Cotton Cover</h4>
                    <p>Breathable, hypoallergenic, and naturally temperature regulating</p>
                    <div className="material-features">
                      <span>✓ GOTS Certified</span>
                      <span>✓ Antimicrobial</span>
                    </div>
                  </div>

                  <div className="material-card">
                    <div className="material-icon">🧊</div>
                    <h4>Memory Foam Core</h4>
                    <p>Pressure-relieving foam that contours to your body shape</p>
                    <div className="material-features">
                      <span>✓ CertiPUR-US</span>
                      <span>✓ Temperature Neutral</span>
                    </div>
                  </div>

                  <div className="material-card">
                    <div className="material-icon">🌬️</div>
                    <h4>Ventilated Support</h4>
                    <p>Advanced airflow channels for optimal temperature control</p>
                    <div className="material-features">
                      <span>✓ Enhanced Breathability</span>
                      <span>✓ Moisture Wicking</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - ORDER SUMMARY */}
        <div className="summary-panel">
          <div className="summary-card">
            <div className="summary-header">
              <h3>Your Custom Mattress</h3>
              <div className="estimated-delivery">
                <span className="delivery-icon">🚛</span>
                <span>Ships in 2-3 weeks</span>
              </div>
            </div>

            <PriceBreakdown 
              dimensions={dimensions} 
              selectedDesign={selectedDesign} 
              designs={designs} 
            />

            <div className="summary-features">
              <h4>What's Included</h4>
              <div className="included-features">
                <div className="feature-item">
                  <span className="feature-check">✅</span>
                  <span>10-Year Warranty</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✅</span>
                  <span>Free White Glove Delivery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✅</span>
                  <span>100-Night Sleep Trial</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✅</span>
                  <span>Eco-Friendly Materials</span>
                </div>
              </div>
            </div>

            <button className="add-to-cart-button" onClick={addToCart}>
              <span className="button-icon">🛒</span>
              <span className="button-text">Add to Cart</span>
              <span className="button-price">₹{calculatePrice().toLocaleString()}</span>
            </button>

            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💳</span>
                <span>Easy EMI Available</span>
              </div>
            </div>
          </div>

          <div className="help-section">
            <div className="help-card">
              <h4>Need Assistance?</h4>
              <p>Our sleep experts are here to help you create the perfect mattress for your needs.</p>
              <div className="help-actions">
                <button className="help-button primary">
                  <span>💬</span>
                  Live Chat
                </button>
                <button className="help-button secondary">
                  <span>📞</span>
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomBedCreator;