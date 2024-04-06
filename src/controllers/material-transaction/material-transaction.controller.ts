import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { MaterialTransactionService } from './material-transaction.service';
import { Resource } from 'src/types/permissions';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateMaterialTransactionDto,
  RevertMaterialTransactionDto,
} from './material-transaction.dto';
import { ProfileService } from '../profile/profile.service';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('MaterialTransaction')
@SetMetadata('resource', Resource.materialTransaction)
@Controller(Resource.materialTransaction)
export class MaterialTransactionController {
  constructor(
    private readonly materialTransactionService: MaterialTransactionService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  findAll(@User() user: UserMeta) {
    return this.materialTransactionService.findAll({
      businessObject: { id: user.objid },
    });
  }

  @Post()
  async create(
    @Body() dto: CreateMaterialTransactionDto,
    @User() user: UserMeta,
  ) {
    const initiator = await this.profileService.findOne({
      where: {
        user: { id: user.sub },
      },
    });
    return this.materialTransactionService.add({
      ...dto,
      initiator,
      businessObject: {
        id: user.objid,
      },
    });
  }

  @Post(':id')
  async remove(
    @Body() dto: RevertMaterialTransactionDto,
    @Param('id') id: number,
    @User() user: UserMeta,
  ) {
    const initiator = await this.profileService.findOne({
      where: {
        user: { id: user.sub },
      },
    });

    return this.materialTransactionService.revert(
      {
        id,
        businessObject: { id: user.objid },
      },
      {
        ...dto,
        initiator,
        businessObject: { id: user.objid },
      },
    );
  }
}
