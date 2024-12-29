// types.ts
export interface Reactions {
    likes: number;
    dislikes: number;
  }


  export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: { likes: number; dislikes: number };
    views: number;
    userId: number;
  }

  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string; // Date as string, could be a Date type if needed
    image: string; // This could be a URL or path to the image
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    ip: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      department: string;
      name: string;
      title: string;
      address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        country: string;
      };
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
      coin: string;
      wallet: string;
      network: string;
    };
    role: 'admin' | 'moderator' | 'user'; // Role can be one of these
  }
  
  