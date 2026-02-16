export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  image: string;
  email: string;
  contact: string;
  location: string;
  dob: string;
  status: string;
  role: string;
  fcmToken: string;
  isOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  verification: {
    code: string | null;
    expireDate: string | null;
  };
}

export interface AdminResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Admin;
}
