const _ = require("lodash");

function isValid(state, latest, transform) {
  for (const action of transform) {
    if (action.state === "Move") {
      let temp = state[action.type][action.position];
      state[action.type][action.position] =
        state[action.type][action.secondPosition];
      state[action.type][action.secondPosition] = temp;
    } else if (action.state === "Insert") {
      if (!state[action.type]) {
        state[action.type] = [];
      }

      state[action.type].push(action.fileObj);
    } else if (action.state === "Delete") {
      state[action.type].splice(action.position, 1);
    }
  }

  console.log(_.isEqual(state, latest));
  return _.isEqual(state, latest);
}

isValid(
  {
    video: [
      { file: "1.mp4", customType: "video" },
      { file: "2.mp4", customType: "video" },
      { file: "3.mp4", customType: "video" },
    ],
  },
  {
    video: [
      { file: "2.mp4", customType: "video" },
      { file: "1.mp4", customType: "video" },
    ],
    image: [{ file: "1.png", customType: "image" }],
  },
  [
    { state: "Move", position: 0, secondPosition: 2, type: "video" },
    {
      state: "Insert",
      fileObj: { file: "1.png", customType: "image" },
      type: "image",
    },
    {
      state: "Delete",
      position: 0,
      type: "video",
    },
  ]
); // true

isValid(
  {},
  {
    video: [
      { file: "1.mov", customType: "video" },
      { file: "2.mov", customType: "video" },
    ],
    image: [
      { file: "1.png", customType: "image" },
      { file: "2.png", customType: "image" },
      { file: "3.png", customType: "image" },
    ],
  },
  [
    {
      state: "Insert",
      fileObj: { file: "1.png", customType: "image" },
      type: "image",
    },
    {
      state: "Insert",
      fileObj: { file: "1.mp3", customType: "audio" },
      type: "audio",
    },
    {
      state: "Insert",
      fileObj: { file: "1.mov", customType: "video" },
      type: "video",
    },
    {
      state: "Delete",
      position: 0,
      type: "video",
    },
    {
      state: "Insert",
      fileObj: { file: "2.png", customType: "image" },
      type: "image",
    },
    {
      state: "Insert",
      fileObj: { file: "3.png", customType: "image" },
      type: "image",
    },
    {
      state: "Insert",
      fileObj: { file: "2.mov", customType: "video" },
      type: "video",
    },
    {
      state: "Move",
      position: 2,
      secondPosition: 1,
      type: "video",
    },
  ]
); // false
/***
 * Three reasons why
 * Audio not there
 * Video not deleted
 * Images not moved
 */

isValid(
  {
    video: [
      { file: "1.mp4", customType: "video" },
      { file: "2.mp4", customType: "video" },
      { file: "3.mp4", customType: "video" },
    ],
    image: [{ file: "1.png", customType: "image" }],
  },
  {
    video: [
      { file: "3.mp4", customType: "video" },
      { file: "1.mp4", customType: "video" },
    ],
    image: [
      { file: "1.png", customType: "image" },
      { file: "2.png", customType: "image" },
    ],
  },
  [
    { state: "Move", position: 0, secondPosition: 2, type: "video" },
    {
      state: "Insert",
      fileObj: { file: "2.png", customType: "image" },
      type: "image",
    },
    {
      state: "Delete",
      position: 1,
      type: "video",
    },
    {
      state: "Insert",
      fileObj: { file: "3.png", customType: "image" },
      type: "image",
    },
    {
      state: "Delete",
      position: 1,
      type: "image",
    },
  ]
); // false, wrong image deletion

module.exports = isValid;
