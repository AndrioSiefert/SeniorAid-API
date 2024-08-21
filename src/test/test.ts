import { AppDataSource } from '../config/dataSource';
import UserEntity from '../entities/UserEntity';
async function testCreateUser() {
    try {
        // Inicializa a fonte de dados
        await AppDataSource.initialize();
        console.log('Data source initialized.');

        // Cria uma nova instância de UserEntity
        const user = new UserEntity(
            'Test User',
            'tes@example.com',
            'password',
            '12345678901',
            30,
            '123456789',
            '00000-000',
            'Test Neighborhood',
            'Test City',
            'Test State',
            'Test Street',
            123,
            'photo.jpg',
            'senior'
        );

        // Salva o UserEntity
        await user.save();
        console.log('User created successfully!');
    } catch (error) {
        console.error('Error in testCreateUser:', error);
    }
}

testCreateUser().catch((error) =>
    console.error('Error executing testCreateUser:', error)
);
