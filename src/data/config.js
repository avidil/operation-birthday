// Central configuration for Operation Birthday.
// Replace placeholders before sharing the public link.
export const CONFIG = {
  birthdayName: 'DINETH',
  candidates: ['Dase','Isumi Damdini','UC',''],
  puzzle: {
    // The clue image is the puzzle; no separate brain-teaser is required.
    question: 'study the four sections in the clue image. each section gives four characters. one section is made of letters; the other three are made of numbers. put the four groups together in the order a reader naturally follows.',
    // Replace this only after confirming the 16-character password from the image.
    password: '200117235273COCO',
    hints: [
      'there are four separate groups, and every group contributes exactly four characters.',
      'three groups are numbers. only one group is made of letters.',
      'your eyes already know where a reader naturally begins. keep following that familiar path.'
    ],
    clueImage: '/assets/password-clue.jpg'
  },
  securityQuestions: [
    { question: 'What is your favourite city?', answer: 'KANDY' },
    { question: 'What is your favourite animal?', answer: 'DOG' },
    { question: 'Where did you do your first job?', answer: 'RDB' },
    { question: 'What is your favourite colour?', answer: 'PURPLE' },
    { question: 'In which city does your best friend live?', answer: 'KURUNEGALA' }
  ],
  googleDriveUrl: 'https://drive.google.com/drive/folders/1Wpd5Y93fm9WVFVGhhpoK-PC-H8sJllEa?usp=drive_link',
  gifts: {
    spectacles: '/assets/transparent-spectacles.png',
    calculator: '/assets/scientific-calculator.png',
    tickets: '/assets/ampara-tickets.png'
  },
  music: '/assets/birthday-music.mp3',
  birthdayPhotos: [
    '/assets/dineth-01.jpg', '/assets/dineth-02.jpg', '/assets/dineth-03.jpg',
    '/assets/dineth-04.jpg', '/assets/dineth-05.jpg', '/assets/dineth-06.jpg',
    '/assets/dineth-childhood.png', '/assets/dineth-08.jpg'
  ]
};
