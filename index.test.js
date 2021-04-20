const isValid = require("./index");

it("first case", () => {
  expect(
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
    )
  ).toBe(true);
});

it("second case", () => {
  expect(
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
    )
  ).toBe(false);
});

it("third case", () => {
  expect(isValid(
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
  )).toBe(false);
})