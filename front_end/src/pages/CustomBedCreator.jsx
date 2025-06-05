import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import './CustomBedCreator.css';

<<<<<<< Updated upstream
// Simple 3D Loading Component (for inside Canvas)
=======
// Enhanced Realistic Mattress 3D Model with Blue Theme
function EnhancedMattressModel({ dimensions }) {
  const { length, breadth, height } = dimensions;
  
  // Convert inches to 3D scale for better visualization
  const scaleLength = length / 12;
  const scaleBreadth = breadth / 12;
  const scaleHeight = height / 6;

  return (
    <group rotation={[0, Math.PI / 8, 0]} position={[0, 0, 0]}>
      {/* Main Mattress Body - Premium Blue */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[scaleLength, scaleHeight, scaleBreadth]} />
        <meshPhysicalMaterial 
          color="#E6F3FF"
          roughness={0.8}
          metalness={0.0}
          clearcoat={0.3}
          clearcoatRoughness={0.7}
        />
      </mesh>

      {/* Top Quilted Layer - Light Blue */}
      <mesh position={[0, scaleHeight * 0.45, 0]} castShadow>
        <boxGeometry args={[scaleLength * 0.99, scaleHeight * 0.18, scaleBreadth * 0.99]} />
        <meshPhysicalMaterial 
          color="#B3D9FF"
          roughness={0.6}
          metalness={0.0}
          transmission={0.1}
          opacity={0.95}
          transparent
        />
      </mesh>

      {/* Side Panels - Soft Blue Gray */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[scaleLength * 1.01, scaleHeight * 1.02, scaleBreadth * 1.01]} />
        <meshStandardMaterial 
          color="#D1E7FF"
          roughness={0.5}
          metalness={0.0}
          wireframe={false}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Realistic Quilted Diamond Pattern - Darker Blue */}
      {Array.from({ length: Math.floor(scaleLength * 2) }, (_, i) => 
        Array.from({ length: Math.floor(scaleBreadth * 2) }, (_, j) => {
          const x = (i - Math.floor(scaleLength)) * 0.7;
          const z = (j - Math.floor(scaleBreadth)) * 0.7;
          return (
            <mesh 
              key={`quilt-${i}-${j}`} 
              position={[x, scaleHeight * 0.52, z]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
              <meshStandardMaterial 
                color="#87CEEB"
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          );
        })
      ).flat()}

      {/* Corner Reinforcements - Steel Blue */}
      {[
        [-scaleLength * 0.48, -scaleHeight * 0.3, -scaleBreadth * 0.48],
        [scaleLength * 0.48, -scaleHeight * 0.3, -scaleBreadth * 0.48],
        [-scaleLength * 0.48, -scaleHeight * 0.3, scaleBreadth * 0.48],
        [scaleLength * 0.48, -scaleHeight * 0.3, scaleBreadth * 0.48]
      ].map((position, i) => (
        <mesh key={`corner-${i}`} position={position}>
          <cylinderGeometry args={[0.05, 0.05, scaleHeight * 0.6, 8]} />
          <meshStandardMaterial 
            color="#4682B4"
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Premium Border Piping - Navy Blue */}
      {[
        [0, scaleHeight * 0.5, scaleBreadth * 0.5],
        [0, scaleHeight * 0.5, -scaleBreadth * 0.5],
        [scaleLength * 0.5, scaleHeight * 0.5, 0],
        [-scaleLength * 0.5, scaleHeight * 0.5, 0]
      ].map((position, i) => (
        <mesh key={`piping-${i}`} position={position}>
          <cylinderGeometry args={[0.02, 0.02, i < 2 ? scaleLength : scaleBreadth, 8]} />
          <meshStandardMaterial 
            color="#191970"
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Brand Label - White */}
      <mesh position={[scaleLength * 0.3, scaleHeight * 0.53, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Memory Foam Base Layer - Light Blue Cream */}
      <mesh position={[0, -scaleHeight * 0.25, 0]}>
        <boxGeometry args={[scaleLength * 0.96, scaleHeight * 0.4, scaleBreadth * 0.96]} />
        <meshStandardMaterial 
          color="#F0F8FF"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

// Loading Component
>>>>>>> Stashed changes
function Canvas3DLoader() {
  return (
    <Text
      position={[0, 0, 0]}
<<<<<<< Updated upstream
      fontSize={0.5}
      color="#666"
=======
      fontSize={0.4}
      color="#6366f1"
>>>>>>> Stashed changes
      anchorX="center"
      anchorY="middle"
    >
      Loading 3D Preview...
    </Text>
  );
}

<<<<<<< Updated upstream
// Simplified 3D Mattress Component
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

// HTML Loading Component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading 3D Mattress Model...</p>
=======
// Enhanced Loading Spinner
function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Crafting your perfect mattress...</p>
>>>>>>> Stashed changes
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

  // Pricing calculation
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
  };

  const handleCanvasCreated = () => {
    // Add a small delay to ensure everything is loaded
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
  };

  const handleCanvasCreated = () => {
    setTimeout(() => setIsLoading(false), 1200);
>>>>>>> Stashed changes
  };

  return (
    <div className="custom-mattress-creator">
      <div className="creator-header">
        <button className="back-button" onClick={() => navigate('/products')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
        <div className="header-content">
<<<<<<< Updated upstream
          <h1>Custom Mattress Creator</h1>
          <p>Design your perfect mattress with advanced 3D preview technology</p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Premium Materials</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10 Year</span>
              <span className="stat-label">Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <div className="creator-content">
        <div className="controls-panel">
          <div className="panel-section dimension-controls">
            <div className="section-header">
              <h3>Mattress Dimensions</h3>
              <span className="section-subtitle">Customize to your exact needs</span>
            </div>
            
            <div className="dimension-grid">
              <div className="dimension-group">
                <label htmlFor="length">
                  <span className="dimension-icon">📏</span>
                  Length: {dimensions.length}"
                </label>
                <div className="input-container">
                  <input
                    type="range"
                    id="length"
                    min="36"
                    max="96"
                    value={dimensions.length}
                    onChange={(e) => handleDimensionChange('length', e.target.value)}
                    className="dimension-slider"
                  />
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => handleDimensionChange('length', e.target.value)}
                    className="dimension-input"
                    min="36"
                    max="96"
                  />
                </div>
                <div className="dimension-range">36" - 96"</div>
              </div>

              <div className="dimension-group">
                <label htmlFor="breadth">
                  <span className="dimension-icon">📐</span>
                  Width: {dimensions.breadth}"
                </label>
                <div className="input-container">
                  <input
                    type="range"
                    id="breadth"
                    min="24"
                    max="84"
                    value={dimensions.breadth}
                    onChange={(e) => handleDimensionChange('breadth', e.target.value)}
                    className="dimension-slider"
                  />
                  <input
                    type="number"
                    value={dimensions.breadth}
                    onChange={(e) => handleDimensionChange('breadth', e.target.value)}
                    className="dimension-input"
                    min="24"
                    max="84"
                  />
                </div>
                <div className="dimension-range">24" - 84"</div>
              </div>

              <div className="dimension-group">
                <label htmlFor="height">
                  <span className="dimension-icon">📊</span>
                  Height: {dimensions.height}"
                </label>
                <div className="input-container">
                  <input
                    type="range"
                    id="height"
                    min="4"
                    max="16"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    className="dimension-slider"
                  />
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    className="dimension-input"
                    min="4"
                    max="16"
                  />
                </div>
                <div className="dimension-range">4" - 16"</div>
              </div>
            </div>
          </div>

          <div className="panel-section design-selection">
            <div className="section-header">
              <h3>Mattress Color & Pattern</h3>
              <span className="section-subtitle">Choose your style preference</span>
            </div>
            
            <div className="design-options">
              {designs.map(design => (
                <div
                  key={design.id}
                  className={`design-card ${selectedDesign === design.id ? 'active' : ''}`}
=======
          <h1 className="header-title">Custom Mattress Designer</h1>
          <p className="header-subtitle">Create your perfect sleep experience</p>
        </div>
      </header>

      <div className="creator-main">
        {/* Top Section - 3D Preview and Dimensions */}
        <div className="preview-section">
          <div className="canvas-wrapper">
            <div className="canvas-header">
              <h2>3D Preview</h2>
              <span className="canvas-hint">Drag to rotate • Scroll to zoom</span>
            </div>
            
            <div className="canvas-container">
              {isLoading && <LoadingSpinner />}
              
              <Canvas 
                camera={{ position: [6, 4, 6], fov: 50 }}
                onCreated={handleCanvasCreated}
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true }}
              >
                <Suspense fallback={<Canvas3DLoader />}>
                  <ambientLight intensity={0.6} />
                  <directionalLight 
                    position={[10, 10, 8]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight position={[-8, 6, -8]} intensity={0.4} color="#ffffff" />
                  <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.3} penumbra={1} />
                  
                  <EnhancedMattressModel dimensions={dimensions} />
                  
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={12}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 8}
                  />
                  
                  <Environment preset="studio" />
                  
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                    <planeGeometry args={[25, 25]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.8} />
                  </mesh>
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Dimensions Panel */}
          <div className="dimensions-panel">
            <h3 className="panel-title">Dimensions</h3>
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
                    <div className="dimension-header">
                      <label className="dimension-label">{labels[dim]}</label>
                      <span className="dimension-value">{dimensions[dim]}″</span>
                    </div>
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
            
            <div className="mattress-specs">
              <div className="spec-item">
                <span className="spec-label">Surface Area</span>
                <span className="spec-value">{(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Volume</span>
                <span className="spec-value">{(dimensions.length * dimensions.breadth * dimensions.height / 1728).toFixed(2)} cu ft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Design Options */}
        <div className="options-section">
          {/* Mattress Types */}
          <div className="option-category">
            <h3 className="category-title">
              <span className="title-icon">🛏️</span>
              Mattress Type
            </h3>
            <div className="design-grid">
              {designs.map(design => (
                <div
                  key={design.id}
                  className={`design-card ${selectedDesign === design.id ? 'selected' : ''}`}
>>>>>>> Stashed changes
                  onClick={() => setSelectedDesign(design.id)}
                >
                  <div className="design-icon">{design.icon}</div>
<<<<<<< Updated upstream
                  <div 
                    className="color-preview" 
                    style={{ backgroundColor: design.color }}
                  ></div>
                  <div className="design-info">
                    <h4 className="design-name">{design.name}</h4>
                    <p className="design-desc">{design.description}</p>
                    <ul className="design-features">
=======
                  <div className="design-content">
                    <h4 className="design-name">{design.name}</h4>
                    <p className="design-description">{design.description}</p>
                    <div className="design-features">
>>>>>>> Stashed changes
                      {design.features.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
<<<<<<< Updated upstream
                  <div className="design-selector">
                    <div className="radio-button"></div>
=======
                </div>
              ))}
            </div>
          </div>

          {/* Quilting Patterns */}
          <div className="option-category">
            <h3 className="category-title">
              <span className="title-icon">✨</span>
              Quilting Pattern
            </h3>
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
>>>>>>> Stashed changes
                  </div>
                </div>
              ))}
            </div>
          </div>

<<<<<<< Updated upstream
          <div className="panel-section price-display">
            <div className="price-header">
              <h3>Your Custom Mattress</h3>
              <div className="price-amount">₹{calculatePrice().toLocaleString()}</div>
            </div>
            <div className="price-details">
              <div className="price-breakdown">
                <span>Base Price: ₹{Math.round(dimensions.length * dimensions.breadth * dimensions.height * 0.08).toLocaleString()}</span>
                <span>Pattern Premium: {selectedDesign === 1 ? '20%' : selectedDesign === 2 ? '40%' : selectedDesign === 3 ? '80%' : '10%'}</span>
              </div>
              <p className="price-note">*Includes premium materials, craftsmanship, and 10-year warranty</p>
              
              <button className="add-to-cart-custom" onClick={addToCart}>
                <span className="button-icon">🛒</span>
                Add Custom Mattress to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="preview-panel">
          <div className="panel-header">
            <h3>3D Preview</h3>
            <div className="preview-controls">
              <span className="control-hint">🖱️ Drag to rotate • 🔍 Scroll to zoom</span>
            </div>
          </div>
          
          <div className="canvas-container" style={{ position: 'relative', height: '400px', background: '#f8f9fa' }}>
            {isLoading && (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 10,
                background: '#f8f9fa'
              }}>
                <LoadingSpinner />
              </div>
            )}
            <Canvas 
              camera={{ position: [5, 3, 5], fov: 60 }}
              onCreated={handleCanvasCreated}
              style={{ 
                width: '100%', 
                height: '100%',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
              }}
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
                
                {/* Floor */}
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
            <div className="mattress-info">
              <span className="mattress-type">{designs.find(d => d.id === selectedDesign)?.name}</span>
              <span className="mattress-size">
                {(dimensions.length * dimensions.breadth / 144).toFixed(1)} sq ft
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="specifications">
        <h3>Detailed Specifications</h3>
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
=======
          {/* Price and Action */}
          <div className="purchase-section">
            <div className="price-info">
              <div className="price-breakdown">
                <span className="price-label">Total Price</span>
                <span className="price-value">₹{calculatePrice().toLocaleString()}</span>
              </div>
              <div className="price-details">
                <span className="price-note">Includes 10-year warranty & free delivery</span>
              </div>
            </div>
            <button className="add-to-cart-btn" onClick={addToCart}>
              <span className="btn-icon">🛒</span>
              Add to Cart - ₹{calculatePrice().toLocaleString()}
            </button>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomBedCreator;