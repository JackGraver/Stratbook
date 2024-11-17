"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StratItem from '@/components/StratItem';

type Strat = {
  s_id: number;
  m_id: number;
  s_name: string;
  m_name: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
};

const HomePage = () => {
  const [stratData, setStratData] = useState<Strat[]>([]);
  const [error, setError] = useState<string | null>(null);  // For error handling
  const searchParams = useSearchParams();
  const map = searchParams.get('map');


  useEffect(() => {
    const fetchStratData = async () => {
      try {
        const res = await fetch(`/api/strat?map=${map}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setStratData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };
    if(map) {
        fetchStratData();
    }
    
  }, [map]);

    // Form state
    const [formData, setFormData] = useState({
        s_name: '',
        map: '',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
      });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Post form data to the server
    const res = await fetch('/api/strat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newStrat = await res.json();
      setStratData([...stratData, newStrat]);  // Update the displayed strat data
    } else {
      setError('Failed to submit form');
    }
    setFormData({
        s_name: '',
        map: '',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: ''
      });
  };

  return (
    <div>
      <h1>Strat Data</h1>
      {error && <p>{error}</p>} {/* Display error if there's any */}
      <div className="strat-list">
        {stratData.map((strat) => (
          <StratItem key={strat.s_id} strat={strat} />  // Render StratItem for each strat
        ))}
      </div>

      <div className="form-container">
      <h1>Create Strat</h1>
      <form onSubmit={handleSubmit} className="strat-form">
        {/* Strat Name Input */}
        <div className="form-group">
          <label htmlFor="s_name">Strat Name:</label>
          <input
            id="s_name"
            name="s_name"
            type="text"
            value={formData.s_name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </div>

        {/* Map Dropdown */}
        <div className="form-group">
          <label htmlFor="map">Choose a Map:</label>
          <select
            id="map"
            name="map"
            value={formData.map}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a Map
            </option>
            <option value="1">Anubis</option>
            <option value="2">Ancient</option>
            <option value="3">Dust</option>
            <option value="4">Inferno</option>
            <option value="5">Mirage</option>
            <option value="6">Nuke</option>
            <option value="7">Vertigo</option>
          </select>
        </div>

        {/* Player Inputs */}
        <div className="form-group">
          <label htmlFor="p1">Player 1:</label>
          <input
            id="p1"
            name="p1"
            type="text"
            value={formData.p1}
            onChange={handleInputChange}
            placeholder="Enter first player"
          />
        </div>

        <div className="form-group">
          <label htmlFor="p2">Player 2:</label>
          <input
            id="p2"
            name="p2"
            type="text"
            value={formData.p2}
            onChange={handleInputChange}
            placeholder="Enter second player"
          />
        </div>

        <div className="form-group">
          <label htmlFor="p3">Player 3:</label>
          <input
            id="p3"
            name="p3"
            type="text"
            value={formData.p3}
            onChange={handleInputChange}
            placeholder="Enter third player"
          />
        </div>

        <div className="form-group">
          <label htmlFor="p4">Player 4:</label>
          <input
            id="p4"
            name="p4"
            type="text"
            value={formData.p4}
            onChange={handleInputChange}
            placeholder="Enter fourth player"
          />
        </div>

        <div className="form-group">
          <label htmlFor="p5">Player 5:</label>
          <input
            id="p5"
            name="p5"
            type="text"
            value={formData.p5}
            onChange={handleInputChange}
            placeholder="Enter fifth player"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default HomePage;
