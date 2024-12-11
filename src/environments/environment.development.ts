interface Environment {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  production: boolean;
  cloudinary: {
    cloudName: string;
    uploadPreset: string;
  };
}

export const environment: Environment = {
  firebaseConfig: {
    apiKey: 'AIzaSyCDzpWgmqohV01C12JoiSxEz9Lle59tDEE',
    authDomain: 'matchup-d09b5.firebaseapp.com',
    projectId: 'matchup-d09b5',
    storageBucket: 'matchup-d09b5.appspot.com',
    messagingSenderId: '445740416048',
    appId: '1:445740416048:web:6beb01263ecb7b51c741f5'
  },
  production: false,
  cloudinary: {
    cloudName: 'dziphyjjx',
    uploadPreset: 'MatchUp'
  }
};
