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
import { Employees } from '../../entities/Employees';
import { Repository } from 'typeorm';

@Controller('api/employee/')
@Injectable()
export class EmpControll {
  constructor(
    @InjectRepository(Employees) private empRepo: Repository<Employees>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const employee = await this.empRepo.find();
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  public async GetById(@Param('id') id: number) {
    try {
      const employee = await this.empRepo.findOne({
        where: { employeeId: id },
      });
      return employee;
    } catch (error) {
      return error.massage;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const employee = await this.empRepo.save({
        employeeId: fields.employeeId,
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        job: fields.job,
        salary: fields.salary,
        commissionPct: fields.commissionPct,
        manager: fields.manager,
        department: fields.department,
        xempId: fields.xempId,
      });
      return employee;
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.empRepo.update(id, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        job: fields.job,
        salary: fields.salary,
        commissionPct: fields.commissionPct,
        manager: fields.manager,
        department: fields.department,
        xempId: fields.xempId,
      });
      return await this.empRepo.findOne({ where: { employeeId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const employee = await this.empRepo.delete(id);
      return 'Delete' + employee.affected + 'rows';
    } catch (error) {
      return error.massage;
    }
  }
}
