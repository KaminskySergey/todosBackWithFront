export interface IStudentAuth {
  wallet: string;
  name?: string;
  email?: string;
  profileImage?: string;
  typeOfLogin?: string;
}
export interface ITodo {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
  createdAt: string;
}

export interface PaginationInfo {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface TodoState {
  data: ITodo[];
  pagination: PaginationInfo;
}

export interface UserState {
  email: string;
  id: string;
  isVerify: boolean;
  name: string;
  password: string;
  token: string;
  verifyToken: null;
}

export interface IFilterGet {
  search?: string;
  status?: string;
  currentPage?: number;
  limit?: number;
}

export interface IBasikPagination {
    handleChange: (page: number) => void;
  pagination: PaginationInfo;
}
