import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const ComponentsContext = createContext();

// Provider Component
export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load components - using localStorage in this example
  useEffect(() => {
    try {
      // Try to load components from localStorage
      const storedComponents = localStorage.getItem('components');
      if (storedComponents) {
        setComponents(JSON.parse(storedComponents));
      } else {
        // If no components exist yet, initialize with empty array
        localStorage.setItem('components', JSON.stringify([]));
      }
    } catch (err) {
      console.error('Error loading components:', err);
      setError('Failed to load components');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save components to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('components', JSON.stringify(components));
      } catch (err) {
        console.error('Error saving components:', err);
      }
    }
  }, [components, loading]);

  // Add a component
  const addComponent = (component) => {
    setComponents(prevComponents => [...prevComponents, component]);
  };

  // Update a component
  const updateComponent = (updatedComponent) => {
    setComponents(prevComponents => 
      prevComponents.map(component => 
        component.id === updatedComponent.id ? updatedComponent : component
      )
    );
  };

  // Delete a component
  const deleteComponent = (componentId) => {
    setComponents(prevComponents => 
      prevComponents.filter(component => component.id !== componentId)
    );
  };

  // Add demo data for testing if components array is empty
  const addDemoData = () => {
    const demoComponents = [
      { 
        id: 'c1', 
        name: 'Engine', 
        shipId: 's1746867190540',
        type: 'Propulsion', 
        status: 'Operational'
      },
      { 
        id: 'c2', 
        name: 'Navigation System', 
        shipId: 's1746867190540',
        type: 'Electronics', 
        status: 'Maintenance Required'
      },
      { 
        id: 'c3', 
        name: 'Hull', 
        shipId: 's1746867190540',
        type: 'Structure', 
        status: 'Operational'
      },
      { 
        id: 'c4', 
        name: 'Radar', 
        shipId: 'ship-2',
        type: 'Electronics', 
        status: 'Operational'
      }
    ];
    
    setComponents(demoComponents);
  };

  // Debug function to check context state
  const debugComponents = () => {
    console.log('Current components state:', components);
    console.log('Loading:', loading);
    console.log('Error:', error);
    return { components, loading, error };
  };

  return (
    <ComponentsContext.Provider 
      value={{ 
        components, 
        loading, 
        error, 
        addComponent, 
        updateComponent, 
        deleteComponent,
        addDemoData,
        debugComponents
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

// Custom hook to use the Components context
export const useComponents = () => {
  const context = useContext(ComponentsContext);
  if (!context) {
    throw new Error('useComponents must be used within a ComponentsProvider');
  }
  return context;
};

export default ComponentsContext;