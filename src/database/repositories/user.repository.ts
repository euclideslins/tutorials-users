import { EntityRepository, Repository } from "typeorm";
import { Tutorial } from "../entities/tutorial.entity";
import { Usuario } from "../entities/usuario.entity";


export interface UserRepository extends Repository<Usuario> {
    this: Repository<Usuario>;
}


export const customUsuariolRepositoryMethods = {
}