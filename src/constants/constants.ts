export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const dbConstants = {
  DATABASE_TYPE: `${process.env.DATABASE_TYPE}`,
  DATABASE_HOST: `${process.env.DATABASE_HOST}`,
  DATABASE_PORT: Number(`${process.env.DATABASE_PORT}`),
  DATABASE_USER: `${process.env.DATABASE_USER}`,
  DATABASE_PASSWORD: `${process.env.DATABASE_PASSWORD}`,
  DATABASE_NAME: process.env.DATABASE_NAME,
};

export const AddressType = {
  SHIPPING: 'S',
  BILLING: 'B'
};