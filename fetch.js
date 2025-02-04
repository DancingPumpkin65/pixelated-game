async function getLevelData(level) {
    try {
      const response = await fetch(`http://localhost:8080/level/${level}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Level Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching level data:', error);
    }
  }
  
  // Usage
  getLevelData(5).then(levelData => {
    // Do something with levelData
  });  