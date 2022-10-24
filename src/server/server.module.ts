import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';
import { ConfigMulter } from './Middleware/multer.conf';
import { Users } from '../entities/Users';
import { CounControll } from './Controller/coun.con';
import { DepControll } from './Controller/dep.con';
import { EmpControll } from './Controller/emp.con';
import { Departments } from '../entities/Departments';
import { Employees } from '../entities/Employees';
import { JobHistory } from '../entities/JobHistory';
import { Jobs } from '../entities/Jobs';
import { Locations } from '../entities/Locations';
import { JhControll } from './Controller/jh.con';
import { JobControll } from './Controller/job.con';
import { LocControll } from './Controller/loc.con';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Regions,
      Countries,
      Departments,
      Employees,
      JobHistory,
      Jobs,
      Locations,
      Users,
    ]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [],
  controllers: [
    RegControll,
    CounControll,
    DepControll,
    EmpControll,
    JhControll,
    JobControll,
    LocControll,
  ],
})
export class ServerModule {}
