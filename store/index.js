import { createGlobalState } from 'react-hooks-global-state'

const stories = [
  {
    id: 1,
    fullname: 'Jamal LaBastida',
    avatar:
      'https://media.istockphoto.com/photos/portrait-of-successful-black-male-modern-day-student-holding-picture-id1311634222?k=20&m=1311634222&s=612x612&w=0&h=1a0XDWnZNPjk_5n7maZdzowaDfBcBohwoiZZF69qS9A=',
  },
  {
    id: 2,
    fullname: 'Fabio Petris',
    avatar:
      'https://media.istockphoto.com/photos/pleasant-young-indian-woman-freelancer-consult-client-via-video-call-picture-id1300972573?b=1&k=20&m=1300972573&s=612x612&w=0&h=sPspvSassHvi2mZTD4NSNQrUdb4zX6ZQc3jRhy1VuP8=',
  },
  {
    id: 3,
    fullname: 'Hogan Muirden',
    avatar:
      'https://media.istockphoto.com/photos/headshot-portrait-of-smiling-ethnic-businessman-in-office-picture-id1300512215?b=1&k=20&m=1300512215&s=612x612&w=0&h=pP5ksvhx-gIHFVAyZTn31H_oJuhB0nX4HnLLUN2kVAg=',
  },
  {
    id: 4,
    fullname: 'Pascale Ayce',
    avatar:
      'https://media.istockphoto.com/photos/one-beautiful-woman-looking-at-the-camera-in-profile-picture-id1303539316?b=1&k=20&m=1303539316&s=612x612&w=0&h=_5yVedxPAg1cQuzzR6W-YNEJfpTQjsrQaKv2URojwj0=',
  },
  {
    id: 5,
    fullname: 'Justinn Ogger',
    avatar:
      'https://media.istockphoto.com/photos/portrait-of-a-black-man-with-braids-picture-id1308469855?b=1&k=20&m=1308469855&s=612x612&w=0&h=Ub2yWzgDCwxzjC2wlDDuNvO3IFwYItmXxdiUSu1zRU8=',
  },
  {
    id: 6,
    fullname: 'Maribel Minchella',
    avatar:
      'https://media.istockphoto.com/photos/portrait-of-a-girl-picture-id938709362?k=20&m=938709362&s=612x612&w=0&h=dzgBAFc9ciOHoBAefqcczwfycLCx3fWwJNChQ1fpsqM=',
  },
  {
    id: 7,
    fullname: 'Tiffy Font',
    avatar:
      'https://media.istockphoto.com/photos/beauty-portrait-of-young-asian-woman-on-the-light-and-shadow-picture-id1286272331?k=20&m=1286272331&s=612x612&w=0&h=ROqtc1rmOsfC65sasjRtV0nL8tRfPz1TxrvbFZrKQAk=',
  },
  {
    id: 8,
    fullname: 'Katti Boylund',
    avatar:
      'https://media.istockphoto.com/photos/headshot-studio-portrait-of-a-woman-in-profile-looking-at-the-camera-picture-id1305462732?k=20&m=1305462732&s=612x612&w=0&h=PSb7E99OQKJZ1XVr4BD_708517mNagc0adFFX_FfFGc=',
  },
  {
    id: 9,
    fullname: 'Desiree Elleton',
    avatar:
      'https://media.istockphoto.com/photos/lovely-woman-picture-id1139926360?k=20&m=1139926360&s=612x612&w=0&h=XDhq5yqrIDCdweOAGTMew5IH1DFG1txKP_Z2jqcm320=',
  },
  {
    id: 10,
    fullname: 'Stanly Philipard',
    avatar:
      'https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?k=20&m=1309328823&s=612x612&w=0&h=RqA2lYygvOxisNPp6UwFjz7bCw_rYITJMqFTMSrhpis=',
  },
  {
    id: 11,
    fullname: 'Constantin Lovick',
    avatar:
      'https://media.istockphoto.com/photos/portrait-of-a-young-african-man-at-studio-high-fashion-male-model-in-picture-id1325359218?k=20&m=1325359218&s=612x612&w=0&h=OfTr0Gbmgb1NPVX8MRnDDcDKB-y9LfHcpZymhGfyA6M=',
  },
  {
    id: 12,
    fullname: 'Daveen Wogden',
    avatar:
      'https://media.istockphoto.com/photos/profile-portrait-extremely-happy-african-man-with-dreadlocks-looking-picture-id1278744283?k=20&m=1278744283&s=612x612&w=0&h=tNyxH0KlCKDdGe6rc4Ei_qOvdQFjgL2ahOKJYfVH9Ws=',
  },
]

const { setGlobalState, useGlobalState } = createGlobalState({
  isLoggedIn: false,
  currentUser: null,
  stories,
  showUsers: false,
})

export { useGlobalState, setGlobalState }