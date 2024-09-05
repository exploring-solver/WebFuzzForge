import { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const useFuzzer = (initialInputs, fuzzerName) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  const token =  localStorage.getItem('token');
  const runFuzzer = async (additionalParams = {}) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/${fuzzerName.replace(/([A-Z])/g, '-$1').toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...additionalParams, inputs }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(`Error in ${fuzzerName}:`, error);
      setResults(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return {
    inputs,
    results,
    loading,
    handleInputChange,
    handleAddInput,
    handleRemoveInput,
    runFuzzer,
  };
};

export default useFuzzer;