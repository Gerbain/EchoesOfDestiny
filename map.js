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
            { label: 'Head out the woods', goto: 'FOREST_EDGE' },
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

        FOREST_EDGE: {
          description: 'The cabin door creaks behind you as you step into the forest’s edge, shrouded in mist.',
          type: 'path',
          optionLabel: 'Paths diverge before you:',
          options: [
            { label: 'Take the sunlit path to the north', goto: 'NORTHERN_GLIGHT' },
            { label: 'Venture into the dense woods to the east', goto: 'DENSE_WOODS' },
          ],
        },
        NORTHERN_GLIGHT: {
          description: 'Sunlight filters through the canopy, lighting up a clearing with a serene glow.',
          type: 'area',
          optionLabel: 'In the clearing, you find:',
          options: [
            { label: 'A hidden pond', goto: 'HIDDEN_POND' },
            { label: 'An old, forgotten shrine', goto: 'FORGOTTEN_SHRINE' },
            { label: 'Paths back to the forest edge', goto: 'FOREST_EDGE' },
          ],
        },
        DENSE_WOODS: {
          description: 'The woods close in around you, the path obscured by thick underbrush and darkness.',
          type: 'path',
          optionLabel: 'As you navigate the dense woods, you encounter:',
          options: [
            { label: 'A mysterious, ancient tree', goto: 'ANCIENT_TREE' },
            { label: 'A hidden cave behind the thickets', goto: 'HIDDEN_CAVE' },
            { label: 'A way back to the forest edge', goto: 'FOREST_EDGE' },
          ],
        },
        HIDDEN_POND: {
          description: 'The pond is crystal clear, reflecting the world like a mirror. Something glimmers beneath the surface.',
          type: 'event',
          optionLabel: 'Do you:',
          options: [
            { label: 'Investigate the glimmering object', goto: 'GLIMMERING_OBJECT' },
            { label: 'Rest by the pond’s edge', goto: 'POND_REST' },
            { label: 'Return to the northern glight', goto: 'NORTHERN_GLIGHT' },
          ],
        },
        FORGOTTEN_SHRINE: {
          description: 'Moss and vines cover the ancient stones of the shrine, an air of mystery hanging heavy.',
          type: 'exploration',
          optionLabel: 'Among the ruins, you discover:',
          options: [
            { label: 'An inscribed stone tablet', goto: 'STONE_TABLET' },
            { label: 'A pathway leading underground', goto: 'UNDERGROUND_PATHWAY' },
            { label: 'The path back to the clearing', goto: 'NORTHERN_GLIGHT' },
          ],
        },
        ANCIENT_TREE: {
          description: 'The tree’s massive trunk and sprawling roots suggest it has stood here for centuries, if not longer.',
          type: 'event',
          optionLabel: 'Beneath the tree, you find:',
          options: [
            { label: 'A carved wooden box', goto: 'WOODEN_BOX' },
            { label: 'An entrance to a tunnel', goto: 'TREE_TUNNEL' },
            { label: 'The path leading back to the dense woods', goto: 'DENSE_WOODS' },
          ],
        },
        HIDDEN_CAVE: {
          description: 'The cave entrance, hidden by thickets, opens into darkness, a cool breeze emanating from within.',
          type: 'exploration',
          optionLabel: 'Inside the cave, you discover:',
          options: [
            { label: 'Ancient cave paintings', goto: 'CAVE_PAINTINGS' },
            { label: 'A narrow passage deeper into the earth', goto: 'NARROW_PASSAGE' },
            { label: 'The way back to the dense woods', goto: 'DENSE_WOODS' },
          ],
        },
        // Placeholder for further development and connections
        GLIMMERING_OBJECT: { /* Further description and options */ },
        POND_REST: { /* Further description and options */ },
        STONE_TABLET: { /* Further description and options */ },
        UNDERGROUND_PATHWAY: { /* Further description and options */ },
        WOODEN_BOX: { /* Further description and options */ },
        TREE_TUNNEL: { /* Further description and options */ },
        CAVE_PAINTINGS: { /* Further description and options */ },
        NARROW_PASSAGE: { /* Further description and options */ },
      
  };

  export { gameMap };
  