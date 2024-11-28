import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { AppDataSource } from "../database/datasource";

@Resolver()
export class UserResolver {
  private readonly userRepository = AppDataSource.getRepository(User);

  @Query(() => [User])
  async users() {
    return await this.userRepository.find(); // Busca todos os usuários
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = this.userRepository.create({ name }); // Cria o usuário na memória
    return await this.userRepository.save(user); // Salva no banco de dados
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(@Arg("id", () => ID) id: string, @Arg("name") name: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    user.name = name;
    return await this.userRepository.save(user); // Atualiza o usuário
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => ID) id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new Error("Usuário não encontrado");
    }

    return true;
  }
}
