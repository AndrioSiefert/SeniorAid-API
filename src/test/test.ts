// import { AppDataSource } from '../config/dataSource';
// import UserEntity from '../entities/UserEntity';
// async function testCreateUser() {
//     try {
//         // Inicializa a fonte de dados
//         await AppDataSource.initialize();
//         console.log('Data source initialized.');

//         // Cria uma nova instância de UserEntity
//         const user = new UserEntity(
//             'John', // name
//             'Doe', // surname
//             'john.doe@example.com', // email
//             'password123', // password
//             1100,
//             'man',
//             '1234567890', // phoneNumber
//             '123 Main St', // address
//             'City', // city
//             'State', // state
//             'Country', // country
//             '12345', // postalCode
//             11, // isActive
//             'photo', // photo
//             'senior', // userType
//         );

//         // Salva o UserEntity
//         await user.save();
//         console.log('User created successfully!');
//     } catch (error) {
//         console.error('Error in testCreateUser:', error);
//     }
// }

// testCreateUser().catch(error => console.error('Error executing testCreateUser:', error));
