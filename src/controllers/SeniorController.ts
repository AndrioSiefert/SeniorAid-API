import SeniorRepository from '../repository/SeniorRepository';
import Controllers from './Controllers';

class SeniorController extends Controllers<SeniorRepository> {
    constructor(repository: SeniorRepository) {
        super(repository);
    }
}

export default SeniorController;
