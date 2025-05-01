import { Orden } from '@module/mantenimiento/orden/entities/orden.entity';
import { Proveedor } from '@module/proveedor/entities/proveedor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity('mod_mantenimiento_historico')
export class Historico {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    observacion: string;

    @Column()
    precio: number;
  
    @Column()
    recomendacion: string;

    @ManyToOne(() => Orden, (orden) => orden.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orden_id' })
    orden: Orden;

    @Column({ name: 'orden_id', nullable: true }) 
    orden_id: number;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.id)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor: Proveedor;

    @Column({ name: 'proveedor_id', nullable: true }) 
    proveedor_id: number;

    @Column()
    fecha_creacion: number;
}