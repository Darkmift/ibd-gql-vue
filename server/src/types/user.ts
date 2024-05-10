// import { type InferSelectModel } from 'drizzle-orm';
// import { users } from '@/common/drizzle/db/schema';

// type UserTableModel = InferSelectModel<typeof users>;

// export interface IUserDTO extends InferSelectModel<typeof users> {}
// export interface IUserCreateDTO
//   extends Pick<UserTableModel, 'username' | 'password'> {}

// export type ITableRowId = UserTableModel['id'];

export default interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUser extends Pick<User, 'username' | 'password'> {}
