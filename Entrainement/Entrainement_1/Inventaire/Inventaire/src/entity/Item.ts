import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  PrimaryGeneratedColumn()
  item_Id: number;

  @Column()
  item_Nom: string;

  @Column()
  item_Description: string;

  @Column()
  item_Quantite: number;

  @Column()
  item_Url_Image: string;
}
