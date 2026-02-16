export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  contact: string;
  status: string;
  role: string;
  fcmToken?: string;
  isOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
  location?: string;
  dob?: string;
  about?: string;
  gender?: string;
  verification?: {
    code: string | null;
    expireDate: string | null;
  };
};
