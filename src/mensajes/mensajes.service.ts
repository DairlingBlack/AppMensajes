import { Injectable } from '@nestjs/common';
import { mensaje } from './entities/mensajes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateMensajesDto } from './Dto/create-mensajes-dto/create-mensajes-dto';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(mensaje)
        private readonly mensajeRepository: Repository<mensaje>,
    ){}

    async getAll(): Promise<mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async createMensajes(mensajeNuevo: CreateMensajesDto): Promise<mensaje>{
        const nuevo = new mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRepository.save(nuevo)

    }

    async updateMensaje(idMensaje:any , mensajeActualizar:CreateMensajesDto):Promise<mensaje>{
        const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return this.mensajeRepository.save(mensajeUpdate)
    }

    async deleteMensaje(idMensaje:number): Promise<any>{
        return await this.mensajeRepository.delete(idMensaje)
    }

}
