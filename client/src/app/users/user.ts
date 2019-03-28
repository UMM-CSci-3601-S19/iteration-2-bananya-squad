export interface User {
  _id?: object;
  name: string;
  email: {
    type: string,
    required: true,
  },
  phoneNumber: string;
}
