import { EntityRepository, Repository } from "typeorm";
import { Tutorial } from "../entities/tutorial.entity";

export interface TutorialRepository extends Repository<Tutorial> {
    paginatedTutorials(page: number, limit: number, titulo?: string, dataInicio?: string, dataFim?: string): Promise<[Tutorial[], number]>;
}

export const customTutorialRepositoryMethods = {
    async paginatedTutorials(
        this: Repository<Tutorial>,
        page: number = 1,
        limit: number = 10,
        titulo?: string,
        dataInicio?: string,
        dataFim?: string,
    ): Promise<[Tutorial[], number]> {
        const query = this.createQueryBuilder('tutorial');

        if (titulo) {
            query.andWhere('tutorial.titulo LIKE :titulo', { titulo: `%${titulo}%` });
        }

        if (dataInicio) {
            query.andWhere('tutorial.createdAt >= :dataInicio', { dataInicio });
        }

        if (dataFim) {
            query.andWhere('tutorial.createdAt <= :dataFim', { dataFim });
        }

        query.skip((page - 1) * limit).take(limit);

        return query.getManyAndCount();
    }
}
