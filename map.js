const gameMap = {
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
      { label: 'Venture deeper into the woods', goto: 'DEEP_WOODS' },
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
  HIDDEN_POND: {
    description:
      'A tranquil pond lies hidden among the trees, its waters crystal clear.',
    type: 'area',
    optionLabel: 'What do you do at the pond?',
    options: [
      { label: 'Rest and recover', goto: 'NORTHERN_LIGHT' },
      { label: 'Search the surrounding area', goto: 'SECRET_GROVE' },
    ],
  },
  FORGOTTEN_SHRINE: {
    description:
      'An ancient shrine stands quietly, covered in moss and vines.',
    type: 'path',
    numberOfEncounters: 1,
    travelTime: 30,
    optionLabel: 'Explore the shrine or return:',
    options: [
      { label: 'Investigate the shrine', goto: 'SHRINE_INTERIOR' },
      { label: 'Go back to the clearing', goto: 'NORTHERN_LIGHT' },
    ],
  },
  SHRINE_INTERIOR: {
    description:
      'Inside the shrine, the air is thick with mystery and ancient magic.',
    type: 'area',
    optionLabel: 'Within the shrine, you discover:',
    options: [
      { label: 'A mysterious artifact', goto: 'ARTIFACT_ROOM' },
      { label: 'An exit back to the shrine entrance', goto: 'FORGOTTEN_SHRINE' },
    ],
  },
  ARTIFACT_ROOM: {
    description:
      'A small chamber holds a pedestal, upon which a glowing artifact rests.',
    type: 'area',
    optionLabel: 'Do you take the artifact?',
    options: [
      { label: 'Yes, take the artifact', goto: 'ARTIFACT_TAKEN' },
      { label: 'No, leave it be', goto: 'SHRINE_INTERIOR' },
    ],
  },
  DENSE_WOODS: {
    description:
      'The woods grow denser and the light dims, shadows dance between the trees.',
    type: 'path',
    numberOfEncounters: 3,
    travelTime: 90,
    optionLabel: 'The path splits again:',
    options: [
      { label: 'Head towards a faint light', goto: 'MYSTICAL_GLADE' },
      { label: 'Follow the sound of running water', goto: 'RIVERBANK' },
      { label: 'Turn back towards the forest edge', goto: 'FOREST_EDGE' },
    ],
  },
  MYSTICAL_GLADE: {
    description:
      'You stumble upon a glade, bathed in a mysterious, ethereal light.',
    type: 'area',
    optionLabel: 'In the glade, you find:',
    options: [
      { label: 'A circle of stones', goto: 'STONE_CIRCLE' },
      { label: 'A path leading out of the glade', goto: 'DENSE_WOODS' },
    ],
  },
  RIVERBANK: {
    description:
      'A peaceful river flows through, its banks teeming with life.',
    type: 'area',
    optionLabel: 'Actions available:',
    options: [
      { label: 'Follow the river downstream', goto: 'WATERFALL' },
      { label: 'Cross the river', goto: 'CROSS_RIVER' },
      { label: 'Go back to the dense woods', goto: 'DENSE_WOODS' },
    ],
  },
  WATERFALL: {
    description:
      'The river leads to a magnificent waterfall, roaring as it cascades down.',
    type: 'area',
    optionLabel: 'At the waterfall, you can:',
    options: [
      { label: 'Explore behind the waterfall', goto: 'HIDDEN_CAVE' },
      { label: 'Rest and enjoy the view', goto: 'RIVERBANK' },
    ],
  },
  HIDDEN_CAVE: {
    description:
      'A hidden cave behind the waterfall contains untold treasures.',
    type: 'path',
    numberOfEncounters: 2,
    travelTime: 45,
    optionLabel: 'In the cave, you find:',
    options: [
      { label: 'A chest filled with gold', goto: 'TREASURE_ROOM' },
      { label: 'An exit back to the waterfall', goto: 'WATERFALL' },
    ],
  },
  DEEP_WOODS: {
    description: 'The heart of the woods is dark and foreboding.',
    type: 'path',
    numberOfEncounters: 4,
    travelTime: 120,
    optionLabel: 'Deep within, you can:',
    options: [
      { label: 'Seek out the ancient tree', goto: 'ANCIENT_TREE' },
      { label: 'Try to find your way back', goto: 'WOODS' },
    ],
  },
  ANCIENT_TREE: {
    description:
      'An enormous, ancient tree stands here, its presence awe-inspiring.',
    type: 'area',
    optionLabel: 'At the base of the tree, you find:',
    options: [
      { label: 'A door in the tree', goto: 'TREE_INTERIOR' },
      { label: 'Paths leading away from the tree', goto: 'DEEP_WOODS' },
    ],
  },
  TREE_INTERIOR: {
    description: 'Inside the ancient tree, the air is alive with magic.',
    type: 'area',
    optionLabel: 'Within the tree, paths lead to:',
    options: [
      { label: 'A glowing chamber', goto: 'GLIMMERING_CHAMBER' },
      { label: 'Exit back to the base of the tree', goto: 'ANCIENT_TREE' },
    ],
  },
  GLIMMERING_CHAMBER: {
    description: 'A chamber filled with light and ancient inscriptions.',
    type: 'area',
    optionLabel: 'In the chamber, you find:',
    options: [
      { label: 'Study the inscriptions', goto: 'INSCRIPTIONS_REVEAL' },
      { label: 'Return to the interior of the tree', goto: 'TREE_INTERIOR' },
    ],
  },
  INSCRIPTIONS_REVEAL: {
    description: 'The inscriptions tell the story of an ancient civilization and hint at hidden locations.',
    type: 'area',
    optionLabel: 'With the knowledge gained, you can:',
    options: [
      { label: 'Search for the hidden locations', goto: 'SECRET_LOCATIONS' },
      { label: 'Go back to the glimmering chamber', goto: 'GLIMMERING_CHAMBER' },
    ],
  },
  SECRET_LOCATIONS: {
    description: 'Following the inscriptions, you discover hidden paths leading to unknown places.',
    type: 'path',
    numberOfEncounters: 3,
    travelTime: 100,
    optionLabel: 'The hidden paths lead to:',
    options: [
      { label: 'A forgotten city', goto: 'FORGOTTEN_CITY' },
      { label: 'An underground river', goto: 'UNDERGROUND_RIVER' },
    ],
  },
  FORGOTTEN_CITY: {
    description: 'The ruins of a city, lost to time.',
    type: 'area',
    optionLabel: 'Explore the ruins or return:',
    options: [
      { label: 'Enter the palace', goto: 'ANCIENT_PALACE' },
      { label: 'Go back to the secret locations', goto: 'SECRET_LOCATIONS' },
    ],
  },
  ANCIENT_PALACE: {
    description: 'The palace stands tall, its halls whispering of past glory.',
    type: 'path',
    numberOfEncounters: 2,
    travelTime: 50,
    optionLabel: 'In the palace, you find:',
    options: [
      { label: 'The throne room', goto: 'THRONE_ROOM' },
      { label: 'A hidden passage', goto: 'HIDDEN_PASSAGE' },
    ],
  },
  THRONE_ROOM: {
    description: 'A majestic room, with a throne at its center.',
    type: 'area',
    optionLabel: 'At the throne, you can:',
    options: [
      { label: 'Search the throne', goto: 'THRONE_SECRET' },
      { label: 'Leave the throne room', goto: 'ANCIENT_PALACE' },
    ],
  },
  HIDDEN_PASSAGE: {
    description: 'A secret passage leading to unknown parts of the palace.',
    type: 'path',
    numberOfEncounters: 1,
    travelTime: 30,
    optionLabel: 'The passage leads to:',
    options: [
      { label: 'A secret library', goto: 'SECRET_LIBRARY' },
      { label: 'Back to the palace halls', goto: 'ANCIENT_PALACE' },
    ],
  },
  SECRET_LIBRARY: {
    description: 'A library filled with ancient texts and knowledge.',
    type: 'area',
    optionLabel: 'In the library, you can:',
    options: [
      { label: 'Study ancient texts', goto: 'ANCIENT_TEXTS' },
      { label: 'Return to the hidden passage', goto: 'HIDDEN_PASSAGE' },
    ],
  },
  // Placeholder for SECRET_GROVE and TREASURE_ROOM
  SECRET_GROVE: {
    description: 'A serene grove, untouched by time, hidden deep within the woods.',
    type: 'area',
    optionLabel: 'In the grove, you discover:',
    options: [
      { label: 'A mystical flower', goto: 'MYSTICAL_FLOWER' },
      { label: 'Paths leading back to the woods', goto: 'DENSE_WOODS' },
    ],
  },
  TREASURE_ROOM: {
    description: 'A room glittering with gold and jewels, a testament to adventures past.',
    type: 'area',
    optionLabel: 'Do you take the treasure?',
    options: [
      { label: 'Yes, gather as much as you can carry', goto: 'LOADED_WITH_TREASURE' },
      { label: 'No, leave it untouched for now', goto: 'HIDDEN_CAVE' },
    ],
  },
  // Additional narrative elements for MYSTICAL_FLOWER and LOADED_WITH_TREASURE
  MYSTICAL_FLOWER: {
    description: 'The flower radiates a soft, enchanting light, with powers unknown.',
    type: 'area',
    optionLabel: 'With the flower in hand, you can:',
    options: [
      { label: 'Use its light to explore dark places', goto: 'DARK_PLACES' },
      { label: 'Keep it safe as a talisman', goto: 'SECRET_GROVE' },
    ],
  },
  LOADED_WITH_TREASURE: {
    description: 'Burdened with treasure, you ponder your next move.',
    type: 'path',
    numberOfEncounters: 1,
    travelTime: 20,
    optionLabel: 'With your riches, you decide to:',
    options: [
      { label: 'Return to the cabin to secure your wealth', goto: 'START' },
      { label: 'Continue adventuring, wealth in tow', goto: 'ADVENTURE_AHEAD' },
    ],
  },
  // Placeholder for further adventures beyond the treasure room
  ADVENTURE_AHEAD: {
    description: 'Wealthy but not yet satisfied, the quest for adventure continues.',
    type: 'area',
    optionLabel: 'Ahead, the world is yours to explore:',
    options: [
      // Placeholder options for further expansion of the map
      { label: 'Seek new lands beyond the forest', goto: 'NEW_LANDS' },
      { label: 'Return to familiar paths', goto: 'WOODS' },
    ],
  },
  // Placeholder for NEW_LANDS to encourage map expansion
  NEW_LANDS: {
    description: 'Beyond the forest lie lands unknown and adventures untold.',
    type: 'path',
    numberOfEncounters: 5,
    travelTime: 150,
    optionLabel: 'In new lands, you find:',
    options: [
      // Placeholder options for further exploration
      { label: 'A bustling city', goto: 'BUSTLING_CITY' },
      { label: 'Mysterious ruins', goto: 'MYSTERIOUS_RUINS' },
    ],
    // More locations can be added here
  }
  
};

export{gameMap}