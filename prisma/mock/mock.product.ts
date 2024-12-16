import { Product } from '@prisma/client';

const PRODUCTS: Product[] = [
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o1q',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: 'e8394ccc-7359-4c16-ab37-4ed9671146a4', // testNickName1
    title: 'testTitle1',
    images: ['image1_url'],
    tags: ['tag1'],
    price: 10000,
    description: 'Product description for testNickName1',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o2r',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: 'c19d6446-2c05-48d7-99d2-9c12d2baa868', // testNickName2
    title: 'testTitle2',
    images: ['image2_url'],
    tags: ['tag2'],
    price: 20000,
    description: 'Product description for testNickName2',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o3s',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: '0081e090-abfa-4e86-a13d-3cba9539a06c', // testNickName3
    title: 'testTitle3',
    images: ['image3_url'],
    tags: ['tag3'],
    price: 30000,
    description: 'Product description for testNickName3',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o4t',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: '5f72c907-e528-4e38-8b4e-c602417ae8af', // testNickName4
    title: 'testTitle4',
    images: ['image4_url'],
    tags: ['tag4'],
    price: 40000,
    description: 'Product description for testNickName4',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o5u',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: '143c6a80-3522-41e9-a2ed-c57cbdb18f75', // testNickName5
    title: 'testTitle5',
    images: ['image5_url'],
    tags: ['tag5'],
    price: 50000,
    description: 'Product description for testNickName5',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6v',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: 'bb92be3c-8771-4fe1-aa33-dfeef8061ebe', // testNickName6
    title: 'testTitle6',
    images: ['image6_url'],
    tags: ['tag6'],
    price: 60000,
    description: 'Product description for testNickName6',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o7w',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: '590602e9-3796-4287-bca1-de9969139fbc', // testNickName7
    title: 'testTitle7',
    images: ['image7_url'],
    tags: ['tag7'],
    price: 70000,
    description: 'Product description for testNickName7',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o8x',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: 'a37fec0c-d754-44d4-b758-1c9d5c76774f', // testNickName8
    title: 'testTitle8',
    images: ['image8_url'],
    tags: ['tag8'],
    price: 80000,
    description: 'Product description for testNickName8',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o9y',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: '78dd77e8-36e4-4cbd-bd7b-27e7fcaae6f9', // testNickName9
    title: 'testTitle9',
    images: ['image9_url'],
    tags: ['tag9'],
    price: 90000,
    description: 'Product description for testNickName9',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o0z',
    createdAt: new Date('2024-11-16T07:11:43.704559'),
    updatedAt: new Date('2024-11-16T07:11:43.704559'),
    favoriteCount: 0,
    ownerId: 'a666a76c-46a1-4aa2-9741-bdbb20785fc4', // testNickName10
    title: 'testTitle10',
    images: ['image10_url'],
    tags: ['tag10'],
    price: 100000,
    description: 'Product description for testNickName10',
  },
];

export default PRODUCTS;
