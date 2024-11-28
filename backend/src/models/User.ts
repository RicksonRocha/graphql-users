import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // Define como um tipo GraphQL
@Entity() // Define como uma tabela no banco de dados
export class User {
  @Field(() => ID) // Campo GraphQL
  @PrimaryGeneratedColumn()
  id: string;

  @Field() // Campo GraphQL
  @Column()
  name: string;
}
