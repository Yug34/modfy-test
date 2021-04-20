function isValid(state, latest, transform) {
  // this is the part you write!
  console.log(state);
}

isValid(
  {
    video: [
      { file: '1.mp4', customType: 'video' },
      { file: '2.mp4', customType: 'video' },
      { file: '3.mp4', customType: 'video' }
    ]
  },
  {
    video: [
      { file: '2.mp4', customType: 'video' },
      { file: '1.mp4', customType: 'video' }
    ],
    image: [{ file: '1.png', customType: 'image' }]
  },
  [
    { state: 'Move', position: 0, secondPosition: 2, type: 'video' },
    {
      state: 'Insert',
      fileObj: { file: '1.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Delete',
      position: 0,
      type: 'video'
    }
  ]
) // true

isValid(
  {},
  {
    video: [
      { file: '1.mov', customType: 'video' },
      { file: '2.mov', customType: 'video' }
    ],
    image: [
      { file: '1.png', customType: 'image' },
      { file: '2.png', customType: 'image' },
      { file: '3.png', customType: 'image' }
    ]
  },
  [
    {
      state: 'Insert',
      fileObj: { file: '1.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Insert',
      fileObj: { file: '1.mp3', customType: 'audio' },
      type: 'audio'
    },
    {
      state: 'Insert',
      fileObj: { file: '1.mov', customType: 'video' },
      type: 'video'
    },
    {
      state: 'Delete',
      position: 0,
      type: 'video'
    },
    {
      state: 'Insert',
      fileObj: { file: '2.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Insert',
      fileObj: { file: '3.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Insert',
      fileObj: { file: '2.mov', customType: 'video' },
      type: 'video'
    },
    {
      state: 'Move',
      position: 2,
      secondPosition: 1,
      type: 'video'
    }
  ]
) // false
/***
 * Three reasons why
 * Audio not there
 * Video not deleted
 * Images not moved
 */

isValid(
  {
    video: [
      { file: '1.mp4', customType: 'video' },
      { file: '2.mp4', customType: 'video' },
      { file: '3.mp4', customType: 'video' }
    ],
    image: [{ file: '1.png', customType: 'image' }]
  },
  {
    video: [
      { file: '3.mp4', customType: 'video' },
      { file: '1.mp4', customType: 'video' }
    ],
    image: [
      { file: '1.png', customType: 'image' },
      { file: '2.png', customType: 'image' }
    ]
  },
  [
    { state: 'Move', position: 0, secondPosition: 2, type: 'video' },
    {
      state: 'Insert',
      fileObj: { file: '2.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Delete',
      position: 1,
      type: 'video'
    },
    {
      state: 'Insert',
      fileObj: { file: '3.png', customType: 'image' },
      type: 'image'
    },
    {
      state: 'Delete',
      position: 1,
      type: 'image'
    }
  ]
) // false, wrong image deletion
