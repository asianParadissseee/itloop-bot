const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://loop-school.vercel.app/'
  ],
  credentials: true,
};

export default corsOptions;