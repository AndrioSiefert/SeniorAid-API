// import { Request, Response } from 'express';
// import AdmRepository from '../repository/AdmRepository.js';
// import GenericRepository from '../repository/GenericRepository.js';
// import Controllers from './Controllers.js';
// import AdmEntity from '../entities/AdmEntity.js';

// interface LoginCredentials {
//     user: string;
//     password: string;
// }

// class AdmController extends Controllers<AdmRepository> {
//     private admRepository: AdmRepository;
//     constructor(
//         genericADM: GenericRepository<AdmRepository>,
//         admRepo: AdmRepository
//     ) {
//         super(genericADM);
//         this.admRepository = admRepo;
//     }

//     createLogin = async (req: Request, res: Response) => {
//         const { user, password }: LoginCredentials = req.body;

//         try {
//             const adm = await this.repository.findOneByUser(user);
//             if (adm) {
//                 return res
//                     .status(400)
//                     .json({ error: 'Este usuário já existe' });
//             }

//             const newAdm = await this.admRepository.createLoginAdm({
//                 user,
//                 password
//             } as AdmEntity);

//             res.status(200).json(newAdm);
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     };
// }

// export default AdmController;
