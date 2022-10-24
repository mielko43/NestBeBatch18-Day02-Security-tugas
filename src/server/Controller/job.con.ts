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
import { Jobs } from '../../entities/Jobs';
import { Repository } from 'typeorm';

@Controller('api/job/')
@Injectable()
export class JobControll {
  constructor(@InjectRepository(Jobs) private jobRepo: Repository<Jobs>) {}

  @Get()
  public async GetAll() {
    try {
      const job = await this.jobRepo.find();
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: string) {
    try {
      const job = await this.jobRepo.findOne({
        where: { jobId: id },
      });
      return job;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const job = await this.jobRepo.save({
        jobId: fields.jobId,
        jobTitle: fields.jobTitle,
        minSalary: fields.minSalary,
        maxSalary: fields.maxSalary,
      });
      return job;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: string) {
    try {
      await this.jobRepo.update(id, {
        jobTitle: fields.jobTitle,
        minSalary: fields.minSalary,
        maxSalary: fields.maxSalary,
      });
      return await this.jobRepo.findOne({ where: { jobTitle: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: string) {
    try {
      const job = await this.jobRepo.delete(id);
      return 'Delete' + job.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
