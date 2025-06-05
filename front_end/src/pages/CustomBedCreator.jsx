import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import './CustomBedCreator.css';

<<<<<<< Updated upstream
// Simple 3D Loading Component (for inside Canvas)
=======
// Standard Realistic Mattress 3D Model
function StandardMattressModel({ dimensions }) {
  const { length, breadth, height } = dimensions;
  
  // Convert inches to 3D scale for better visualization
  const scaleLength = length / 15;
  const scaleBreadth = breadth / 15;
  const scaleHeight = height / 6;

  return (
    <group rotation={[0, Math.PI / 6, 0]} position={[0, 0, 0]}>
      {/* Main Mattress Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[scaleLength, scaleHeight, scaleBreadth]} />
        <meshPhysicalMaterial 
          color="#F8F8F8"
          roughness={0.7}
          metalness={0.0}
          clearcoat={0.2}
          clearcoatRoughness={0.8}
        />
      </mesh>

      {/* Top Comfort Layer */}
      <mesh position={[0, scaleHeight * 0.4, 0]} castShadow>
        <boxGeometry args={[scaleLength * 0.98, scaleHeight * 0.2, scaleBreadth * 0.98]} />
        <meshPhysicalMaterial 
          color="#FFFFFF"
          roughness={0.5}
          metalness={0.0}
          transmission={0.05}
          opacity={0.95}
          transparent
        />
      </mesh>

      {/* Mattress Piping/Border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[scaleLength * 1.02, scaleHeight * 1.05, scaleBreadth * 1.02]} />
        <meshStandardMaterial 
          color="#E0E0E0"
          roughness={0.6}
          metalness={0.1}
          wireframe={false}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Realistic Quilted Pattern */}
      {Array.from({ length: Math.floor(scaleLength * 1.5) }, (_, i) => 
        Array.from({ length: Math.floor(scaleBreadth * 1.5) }, (_, j) => {
          const x = (i - Math.floor(scaleLength * 0.75)) * 0.6;
          const z = (j - Math.floor(scaleBreadth * 0.75)) * 0.6;
          return (
            <mesh 
              key={`quilt-${i}-${j}`} 
              position={[x, scaleHeight * 0.51, z]}
            >
              <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
              <meshStandardMaterial 
                color="#D0D0D0"
                roughness={0.4}
                metalness={0.0}
              />
            </mesh>
          );
        })
      ).flat()}

      {/* Corner Support Elements */}
      {[
        [-scaleLength * 0.47, -scaleHeight * 0.35, -scaleBreadth * 0.47],
        [scaleLength * 0.47, -scaleHeight * 0.35, -scaleBreadth * 0.47],
        [-scaleLength * 0.47, -scaleHeight * 0.35, scaleBreadth * 0.47],
        [scaleLength * 0.47, -scaleHeight * 0.35, scaleBreadth * 0.47]
      ].map((position, i) => (
        <mesh key={`corner-${i}`} position={position}>
          <cylinderGeometry args={[0.04, 0.04, scaleHeight * 0.7, 8]} />
          <meshStandardMaterial 
            color="#C8C8C8"
            roughness={0.6}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Brand Label */}
      <mesh position={[scaleLength * 0.25, scaleHeight * 0.52, scaleBreadth * 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Memory Foam Layers Visualization */}
      <mesh position={[0, -scaleHeight * 0.3, 0]}>
        <boxGeometry args={[scaleLength * 0.95, scaleHeight * 0.3, scaleBreadth * 0.95]} />
        <meshStandardMaterial 
          color="#FFF8DC"
          roughness={0.8}
          metalness={0.0}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// 3D Loading Component
>>>>>>> Stashed changes
function Canvas3DLoader() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.3}
      color="#6366f1"
      anchorX="center"
      anchorY="middle"
    >
      Loading 3D Model...
    </Text>
  );
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-text">Preparing your mattress...</p>
    </div>
  );
}

// Main Component
function CustomBedCreator() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    length: 75,
    breadth: 54,
    height: 8
  });
  
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [selectedPattern, setSelectedPattern] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Pricing calculation
  const calculatePrice = () => {
    const volume = dimensions.length * dimensions.breadth * dimensions.height;
    const basePrice = volume * 0.15;
    const designMultipliers = { 1: 1.2, 2: 1.4, 3: 1.8, 4: 1.1 };
    const patternMultipliers = { 1: 1.0, 2: 1.1, 3: 1.3, 4: 1.2 };
    return Math.round(basePrice * designMultipliers[selectedDesign] * patternMultipliers[selectedPattern]);
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
      name: 'Classic Comfort', 
      description: 'Traditional comfort with modern materials',
      icon: '🛏️',
      color: '#f59e0b',
      features: ['Memory Foam Core', 'Breathable Cover', 'Medium Firmness']
    },
    { 
      id: 2, 
      name: 'Premium Support', 
      description: 'Enhanced support for better spine alignment',
      icon: '💪',
      color: '#3b82f6',
      features: ['Zoned Support', 'Cooling Gel', 'Firm Feel']
    },
    { 
      id: 3, 
      name: 'Luxury Plus', 
      description: 'Ultimate luxury with premium materials',
      icon: '✨',
      color: '#8b5cf6',
      features: ['Organic Materials', 'Silk Blend Cover', 'Plush Comfort']
    },
    { 
      id: 4, 
      name: 'Eco Natural', 
      description: 'Environmentally conscious sleep solution',
      icon: '🌿',
      color: '#10b981',
      features: ['100% Natural', 'Bamboo Cover', 'Eco-Friendly']
    }
  ];

<<<<<<< Updated upstream
  const addToCart = () => {
    const customMattress = {
      id: `custom-mattress-${Date.now()}`,
      name: `Custom ${designs.find(d => d.id === selectedDesign)?.name} Mattress`,
      category: 'custom-mattress',
      price: calculatePrice(),
      rating: 5.0,
      image: '/api/placeholder/400/300',
      description: `Custom ${designs.find(d => d.id === selectedDesign)?.name.toLowerCase()} mattress with dimensions ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
      features: [
        `Dimensions: ${dimensions.length}" x ${dimensions.breadth}" x ${dimensions.height}"`,
        ...designs.find(d => d.id === selectedDesign)?.features || [],
        'Premium silk cotton filling',
        'Custom handcrafted mattress'
      ],
      isCustom: true,
      customSpecs: { dimensions, design: selectedDesign }
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, { ...customMattress, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Show success message
    alert('Custom mattress added to cart successfully!');
    navigate('/products');
=======
  const patterns = [
    { id: 1, name: 'Classic Grid', description: 'Traditional quilted pattern', icon: '⬜' },
    { id: 2, name: 'Diamond Elite', description: 'Elegant diamond stitching', icon: '💎' },
    { id: 3, name: 'Wave Flow', description: 'Modern wave pattern', icon: '🌊' },
    { id: 4, name: 'Minimal Clean', description: 'Simple, clean lines', icon: '➖' }
  ];

  const addToCart = () => {
    try {
      const customMattress = {
        id: `custom-mattress-${Date.now()}`,
        name: `Custom ${designs.find(d => d.id === selectedDesign)?.name} Mattress`,
        category: 'custom-mattress',
        price: calculatePrice(),
        rating: 5.0,
        image: '/api/placeholder/400/300',
        description: `Custom mattress with ${designs.find(d => d.id === selectedDesign)?.name} design and ${patterns.find(p => p.id === selectedPattern)?.name} pattern`,
        features: [
          `Dimensions: ${dimensions.length}" × ${dimensions.breadth}" × ${dimensions.height}"`,
          ...designs.find(d => d.id === selectedDesign)?.features || [],
          '10-Year Warranty',
          'Free Delivery'
        ],
        isCustom: true,
        customSpecs: { 
          dimensions: { ...dimensions }, 
          design: selectedDesign,
          pattern: selectedPattern
        },
        quantity: 1
      };

      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...existingCart, customMattress];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      alert(`✅ Custom mattress added to cart! Price: ₹${calculatePrice().toLocaleString()}`);
      navigate('/products');
      
    } catch (error) {
      console.error('Error adding custom mattress to cart:', error);
      alert('❌ Error adding mattress to cart. Please try again.');
    }
>>>>>>> Stashed changes
  };

  const handleCanvasCreated = () => {
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="mattress-creator">
      {/* Header */}
      <header className="creator-header">
        <button className="back-btn" onClick={() => navigate('/products')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 className="header-title">Custom Mattress Creator</h1>
        <div className="header-subtitle">Design your perfect sleep solution</div>
      </header>

      <div className="creator-main">
        {/* Left Panel - Controls */}
        <div className="controls-panel">
          {/* Dimensions */}
          <section className="control-section">
            <h2 className="section-title">Dimensions</h2>
            <div className="dimension-controls">
              {['length', 'breadth', 'height'].map((dim) => {
                const labels = { length: 'Length', breadth: 'Width', height: 'Height' };
                const limits = {
                  length: { min: 36, max: 96 },
                  breadth: { min: 24, max: 84 },
                  height: { min: 4, max: 16 }
                };
                
                return (
                  <div key={dim} className="dimension-item">
                    <label className="dimension-label">
                      {labels[dim]} ({dimensions[dim]}″)
                    </label>
                    <input
                      type="range"
                      min={limits[dim].min}
                      max={limits[dim].max}
                      value={dimensions[dim]}
                      onChange={(e) => handleDimensionChange(dim, e.target.value)}
                      className="dimension-slider"
                    />
                    <div className="dimension-range">
                      {limits[dim].min}″ - {limits[dim].max}″
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Design Selection */}
          <section className="control-section">
            <h2 className="section-title">Mattress Type</h2>
            <div className="option-grid">
              {designs.map(design => (
                <div
                  key={design.id}
                  className={`option-card ${selectedDesign === design.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDesign(design.id)}
                  style={{ '--accent-color': design.color }}
                >
                  <div className="option-icon">{design.icon}</div>
                  <div className="option-content">
                    <h3 className="option-name">{design.name}</h3>
                    <p className="option-description">{design.description}</p>
                    <ul className="option-features">
                      {design.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pattern Selection */}
          <section className="control-section">
            <h2 className="section-title">Quilting Pattern</h2>
            <div className="pattern-grid">
              {patterns.map(pattern => (
                <div
                  key={pattern.id}
                  className={`pattern-card ${selectedPattern === pattern.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPattern(pattern.id)}
                >
                  <div className="pattern-icon">{pattern.icon}</div>
                  <div className="pattern-info">
                    <h4 className="pattern-name">{pattern.name}</h4>
                    <p className="pattern-description">{pattern.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Price & Purchase */}
          <section className="control-section price-section">
            <div className="price-display">
              <span className="price-label">Total Price</span>
              <span className="price-value">₹{calculatePrice().toLocaleString()}</span>
            </div>
            <button className="add-to-cart-btn" onClick={addToCart}>
              Add to Cart - ₹{calculatePrice().toLocaleString()}
            </button>
          </section>
        </div>

        {/* Right Panel - 3D Preview */}
        <div className="preview-panel">
          <div className="preview-header">
            <h2>3D Preview</h2>
            <div className="preview-controls">
              <span className="control-hint">Drag to rotate • Scroll to zoom</span>
            </div>
          </div>
          
          <div className="canvas-container">
            {isLoading && <LoadingSpinner />}
            
            <Canvas 
              camera={{ position: [5, 3, 5], fov: 60 }}
              onCreated={handleCanvasCreated}
              shadows
              dpr={[1, 2]}
              gl={{ antialias: true }}
            >
              <Suspense fallback={<Canvas3DLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight 
                  position={[8, 10, 6]} 
                  intensity={1} 
                  castShadow 
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.3} />
                
                <StandardMattressModel dimensions={dimensions} />
                
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={2}
                  maxDistance={10}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 6}
                />
                
                <Environment preset="apartment" />
                
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="#f8fafc" />
                </mesh>
              </Suspense>
            </Canvas>
          </div>

          <div className="mattress-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Dimensions</span>
                <span className="info-value">{dimensions.length}″ × {dimensions.breadth}″ × {dimensions.height}″</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type</span>
                <span className="info-value">{designs.find(d => d.id === selectedDesign)?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pattern</span>
                <span className="info-value">{patterns.find(p => p.id === selectedPattern)?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Area</span>
                <span className="info-value">{(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomBedCreator;