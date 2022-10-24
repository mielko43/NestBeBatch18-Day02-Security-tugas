import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from '../../entities/Locations';
import { Repository } from 'typeorm';

@Controller('api/location/')
@Injectable()
export class LocControll {
  constructor(
    @InjectRepository(Locations) private locRepo: Repository<Locations>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const loc = await this.locRepo.find();
      return loc;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: number) {
    try {
      const loc = await this.locRepo.findOne({
        where: { locationId: id },
      });
      return loc;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const loc = await this.locRepo.save({
        locationId: fields.locationId,
        streetAddress: fields.streetAddress,
        postalCode: fields.postalCode,
        city: fields.city,
        stateProvince: fields.stateProvince,
        country: fields.country,
      });
      return loc;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.locRepo.update(id, {
        streetAddress: fields.streetAddress,
        postalCode: fields.postalCode,
        city: fields.city,
        stateProvince: fields.stateProvince,
        country: fields.country,
      });
      return await this.locRepo.findOne({ where: { locationId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const loc = await this.locRepo.delete(id);
      return 'Delete' + loc.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
