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
import { Departments } from '../../entities/Departments';
import { Repository } from 'typeorm';

@Controller('api/department/')
@Injectable()
export class DepControll {
  constructor(
    @InjectRepository(Departments) private depRepo: Repository<Departments>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const department = await this.depRepo.find();
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: number) {
    try {
      const department = await this.depRepo.findOne({
        where: { departmentId: id },
      });
      return department;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const department = await this.depRepo.save({
        departmentId: fields.departmentId,
        departmentName: fields.departmentName,
        location: fields.location,
        manager: fields.manager,
      });
      return department;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.depRepo.update(id, {
        departmentName: fields.departmentName,
        location: fields.location,
        manager: fields.manager,
      });
      return await this.depRepo.findOne({ where: { departmentId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const department = await this.depRepo.delete(id);
      return 'Delete' + department.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
