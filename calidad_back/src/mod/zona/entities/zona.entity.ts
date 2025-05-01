// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Orden } from '@module/mantenimiento/orden/entities/orden.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_zona_social')
export class Zona {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ nullable: false })
    nombre: string;
  
    @Column({ nullable: false })
    descripcion: string;

    @Column()
    ubicacion: string;

    @Column()
    fecha_creacion: number;
  
    @Column({
      nullable: true
    })
    fecha_actualizacion: number;

    @OneToMany(() => Orden, orden => orden.zona_id)
    ordenes: Orden[];

  // @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  // permiso: PermisosModulos
}