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
import { Countries } from '../../entities/Countries';
import { Repository } from 'typeorm';

@Controller('api/country/')
@Injectable()
export class CounControll {
  constructor(
    @InjectRepository(Countries) private counRepo: Repository<Countries>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const country = await this.counRepo.find();
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: string) {
    try {
      const country = await this.counRepo.findOne({
        where: { countryId: id },
      });
      return country;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const country = await this.counRepo.save({
        countryId: fields.countryId,
        countryName: fields.countryName,
        region: fields.region,
      });
      return country;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: string) {
    try {
      await this.counRepo.update(id, {
        countryName: fields.countryName,
        region: fields.region,
      });
      return await this.counRepo.findOne({ where: { countryId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: string) {
    try {
      const country = await this.counRepo.delete(id);
      return 'Delete' + country.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
