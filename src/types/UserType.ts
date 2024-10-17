import UserEntity from '../entities/UserEntity';

type TypeRequestUser = Omit<UserEntity, 'id'> & {
    password_confirmation: string;
    user_type: string;
};

type TypeResponseUser = {
    dados?: Partial<UserEntity>;
    error?: unknown;
    entity?: UserEntity;
    token?: string;
    userType?: string;
    message?: unknown;
};

export { TypeRequestUser, TypeResponseUser };
