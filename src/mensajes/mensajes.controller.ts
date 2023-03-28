import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param} from '@nestjs/common';
import { CreateMensajesDto } from './Dto/create-mensajes-dto/create-mensajes-dto';
import { get } from 'http';
import { MensajesService } from './mensajes.service';
import { mensaje } from './entities/mensajes.entity';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajesService: MensajesService){
        
    }

    @Post()
    create (@Body() createMensajeDto: CreateMensajesDto, @Res() response) {
        this.mensajesService.createMensajes(createMensajeDto).then( mensaje=>{
            response.status(HttpStatus.CREATED).json(mensaje);
        }

        ).catch( ()=> 
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creacion del mensaje'})

        );
    }

    @Get()
    getall(@Res() response) {
        this.mensajesService.getAll().then(mensajesList =>{
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion de mensajes'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajesDto, @Res() response , @Param('id') idMensaje){
        this.mensajesService.updateMensaje(idMensaje,updateMensajeDto).then(mensaje =>{
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la edicion del mensajes'});
        });
        
        
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la eliminacion del mensajes'});
        });
        ;
    }
}


