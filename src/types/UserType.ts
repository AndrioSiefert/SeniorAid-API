import UserEntity from '../entities/UserEntity';

type TypeUserReqBody = Omit<UserEntity, 'id'>;
type TypeUserResBody = Pick<UserEntity, 'id' | 'name' | 'email' | 'user_type'>;

export { TypeUserReqBody, TypeUserResBody };
