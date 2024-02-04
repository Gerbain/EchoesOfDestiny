const gameMap = {
    START: {
        description:
        'You wake up in a strange cabin.',
        type: 'start',
        optionLabel: 'Choose your next move',
        options: [
            { label: 'Head out the cabin', goto: 'CABIN' },
            { label: 'Collect your belongins', goto: 'COLLECT_START' },
          ],
    },
    CABIN: {
        description:
        'You leave the cabin...',
        type: 'path',
        optionLabel: 'Choose your next move',
        options: [
            { label: 'Its too cold to stay out', goto: 'START' },
          ],
    },
    COLLECT_START: {
        description:
        'You collect your items',
        type: 'path',
        optionLabel: 'Choose your next move',
        options: [
            { label: 'Head out the cabin', goto: 'CABIN' },
            { label: 'Head out the woods', goto: 'WOODS' },
          ],
    },
    WOODS: {
      description:
        'You are in the dense woods. Paths lead in multiple directions.',
      type: 'area',
      optionLabel: 'Choose your next move',
        options: [
            { label: 'Head out the path 1', goto: 'PATH1' },
            { label: 'Head out the path 2', goto: 'PATH2' },
          ],
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

  export { gameMap };
  