const gameMap = {
  /*
  EXAMPLE: {
    description:'Description that will be shown when entering map tile',
    type: 'type of tile',
      -- start
      -- area
      -- path -> path needs travelTime value = time needed to travel through game part
      -- battle
    optionLabel: 'text that will be shown to pick options',
    options: [
      { label: 'Option copy text', goto: 'identifier of tile to go to when chosen' },
    ],
  },
  */
  START: {
    description: 'You wake up in a strange cabin.',
    type: 'start',
    optionLabel: 'Choose your next move',
    options: [{ label: 'Head out the cabin', goto: 'WOODS' }],
  },
  WOODS: {
    description: 'You enter the woods, a foggy feeling arises...',
    type: 'area',
    optionLabel: 'Where do you want to go',
    options: [
      { label: 'Explore the forest edge', goto: 'FOREST_EDGE' },
      { label: 'Go back to the cabin', goto: 'START' },
    ],
  },
  FOREST_EDGE: {
    description:
      'The cabin door creaks behind you as you step into the forest’s edge, shrouded in mist.',
    type: 'path',
    numberOfEncounters: 2,
    travelTime: 60,
    optionLabel: 'Paths diverge before you:',
    options: [
      { label: 'Take the sunlit path to the north', goto: 'NORTHERN_LIGHT' },
      {
        label: 'Venture into the dense woods to the east',
        goto: 'DENSE_WOODS',
      },
    ],
  },
  NORTHERN_LIGHT: {
    description:
      'Sunlight filters through the canopy, lighting up a clearing with a serene glow.',
    type: 'area',
    optionLabel: 'In the clearing, you find:',
    options: [
      { label: 'A hidden pond', goto: 'HIDDEN_POND' },
      { label: 'An old, forgotten shrine', goto: 'FORGOTTEN_SHRINE' },
      { label: 'Paths back to the forest edge', goto: 'FOREST_EDGE' },
    ],
  },
  DENSE_WOODS: {
    description:
      'The woods close in around you, the path obscured by thick underbrush and darkness.',
    type: 'path',
    numberOfEncounters: 2,
    optionLabel: 'As you navigate the dense woods, you encounter:',
    options: [
      { label: 'A mysterious, ancient tree', goto: 'ANCIENT_TREE' },
      { label: 'A hidden cave behind the thickets', goto: 'HIDDEN_CAVE' },
      { label: 'A way back to the forest edge', goto: 'FOREST_EDGE' },
    ],
  },
  HIDDEN_POND: {
    description:
      'The pond is crystal clear, reflecting the world like a mirror. Something glimmers beneath the surface.',
    type: 'path',
    numberOfEncounters: 2,
    optionLabel: 'Do you:',
    options: [
      { label: 'Investigate the glimmering object', goto: 'GLIMMERING_OBJECT' },
      { label: 'Rest by the pond’s edge', goto: 'POND_REST' },
      { label: 'Return to the northern glight', goto: 'NORTHERN_LIGHT' },
    ],
  },
  FORGOTTEN_SHRINE: {
    description:
      'Moss and vines cover the ancient stones of the shrine, an air of mystery hanging heavy.',
    type: 'exploration',
    optionLabel: 'Among the ruins, you discover:',
    options: [
      { label: 'An inscribed stone tablet', goto: 'STONE_TABLET' },
      { label: 'A pathway leading underground', goto: 'UNDERGROUND_PATHWAY' },
      { label: 'The path back to the clearing', goto: 'NORTHERN_LIGHT' },
    ],
  },
  ANCIENT_TREE: {
    description:
      'The tree’s massive trunk and sprawling roots suggest it has stood here for centuries, if not longer.',
    type: 'path',
    numberOfEncounters: 2,
    optionLabel: 'Beneath the tree, you find:',
    options: [
      { label: 'A carved wooden box', goto: 'WOODEN_BOX' },
      { label: 'An entrance to a tunnel', goto: 'TREE_TUNNEL' },
      {
        label: 'The path leading back to the dense woods',
        goto: 'DENSE_WOODS',
      },
    ],
  },
  HIDDEN_CAVE: {
    description:
      'The cave entrance, hidden by thickets, opens into darkness, a cool breeze emanating from within.',
    type: 'path',
    numberOfEncounters: 2,
    optionLabel: 'Inside the cave, you discover:',
    options: [
      { label: 'Ancient cave paintings', goto: 'CAVE_PAINTINGS' },
      {
        label: 'A narrow passage deeper into the earth',
        goto: 'NARROW_PASSAGE',
      },
      { label: 'The way back to the dense woods', goto: 'DENSE_WOODS' },
    ],
  },

  // Placeholder for further development and connections
  GLIMMERING_OBJECT: {},
  POND_REST: {},
  STONE_TABLET: {},
  UNDERGROUND_PATHWAY: {},
  WOODEN_BOX: {},
  TREE_TUNNEL: {},
  CAVE_PAINTINGS: {},
  NARROW_PASSAGE: {},
};

export { gameMap };
