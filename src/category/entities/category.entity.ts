import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity({name: 'category'})
export class categoryEntity extends BaseEntity {
    @Column()
    productName!: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[]
}