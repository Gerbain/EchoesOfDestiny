const gameMap = {
    WOODS: {
      description:
        'You are in the dense woods. Paths lead in multiple directions.',
      type: 'area',
      PATH1: {
        description: 'A narrow path that winds through the trees to the east.',
        type: 'path',
        uniqueID: 'path101',
        travelTime: 5,
        goto: 'LAKE',
      },
      LAKE: {
        description: 'A foggy lake that smells like mysteries',
        type: 'path',
        uniqueID: 'lake101',
        travelTime: 800,
        goto: 'PATH2',
      },
      PATH2: {
        description: 'A mossy path leading west, deeper into the forest.',
        type: 'path',
        uniqueID: 'path102',
        travelTime: 800,
        options: [
          { label: 'Investigate the clearing', goto: 'CLEARING' },
          { label: 'Continue on the path', goto: 'RIVER' },
        ],
      },
    },
  };
  console.log('Map Loaded');
  export { gameMap };
  