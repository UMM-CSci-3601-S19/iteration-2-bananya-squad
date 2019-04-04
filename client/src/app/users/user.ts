export interface User {
  _id?: object;
  userId: string;
  email: {
    type: string,
    required: true,
  },
  fullName: string;
  pictureUrl: string;
  lastName: string;
  firstName: string;
  phoneNumber?: string;
  description?: string;
}
