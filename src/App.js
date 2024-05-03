import React, { useState } from 'react';
import './App.css';
import { Slider, Button, Spin, Select } from 'antd';
import Ranking from './Ranking';

const LoadingScreen = () => <Spin />;

function App() {
  const [followers, setFollowers] = useState([0,100]);
  const [trustworthiness, setTrustworthiness] = useState([0,100]);
  const [attractiveness, setAttractiveness] =  useState([0,100]);
  const [contentRelevancy, setContentRelevancy] =  useState([0,100]);
  const [loading, setLoading] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('music'); // Default niche is 'music'

  const handleSliderChange = (value, setter) => {
    setter(value);
  };

  const handleNicheChange = (value) => {
    setSelectedNiche(value);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call or any asynchronous operation
    setTimeout(() => {
      setLoading(false);
      setShowRanking(true);
    }, 2000); // Simulating a 2-second loading time
  };

  return (
    <div className="App">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="slider-container">
          {!showRanking && (
            <>
              <div className="slider">
                <p>Followers</p>
                <Slider
                  range
                  step={10}
                  defaultValue={followers}
                  onChange={(value) => handleSliderChange(value, setFollowers)}
                />
              </div>
              <div className="slider">
                <p>Trustworthiness</p>
                <Slider
                  range
                  step={10}
                  defaultValue={trustworthiness}
                  onChange={(value) => handleSliderChange(value, setTrustworthiness)}
                />
              </div>
              <div className="slider">
                <p>Attractiveness</p>
                <Slider
                  range
                  step={10}
                  defaultValue={attractiveness}
                  onChange={(value) => handleSliderChange(value, setAttractiveness)}
                />
              </div>
              <div className="slider">
                <p>Content Relevancy</p>
                <Slider
                  range
                  step={10}
                  defaultValue={contentRelevancy}
                  onChange={(value) => handleSliderChange(value, setContentRelevancy)}
                />
              </div>
              <div className="niche-select">
                <p>Select Niche</p>
                <Select
                  defaultValue={selectedNiche}
                  style={{ width: 200 }}
                  onChange={handleNicheChange}
                  options={[
                    'art',
                    'fitness',
                    'photography',
                    'beauty',
                    'music',
                    'dance',
                    'entertainment',
                    'travel',
                  ].map((niche) => ({ label: niche, value: niche }))}
                />
              </div>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
          {showRanking && (
            <Ranking
              followers={followers}
              trustworthiness={trustworthiness}
              attractiveness={attractiveness}
              contentRelevancy={contentRelevancy}
              niche={selectedNiche}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
