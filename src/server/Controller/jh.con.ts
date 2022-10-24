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
import { JobHistory } from '../../entities/JobHistory';
import { Repository } from 'typeorm';

@Controller('api/jhistory/')
@Injectable()
export class JhControll {
  constructor(
    @InjectRepository(JobHistory) private jhRepo: Repository<JobHistory>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const jhistory = await this.jhRepo.find();
      return jhistory;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: number) {
    try {
      const jhistory = await this.jhRepo.findOne({
        where: { employeeId: id },
      });
      return jhistory;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const jhistory = await this.jhRepo.save({
        employeeId: fields.employeeId,
        startDate: fields.startDate,
        endDate: fields.endDate,
        department: fields.department,
        employee: fields.employee,
        job: fields.job,
      });
      return jhistory;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.jhRepo.update(id, {
        startDate: fields.startDate,
        endDate: fields.endDate,
        department: fields.department,
        employee: fields.employee,
        job: fields.job,
      });
      return await this.jhRepo.findOne({ where: { employeeId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const jhistory = await this.jhRepo.delete(id);
      return 'Delete' + jhistory.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
