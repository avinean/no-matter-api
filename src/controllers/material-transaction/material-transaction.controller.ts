import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
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

@ApiTags('MaterialTransaction')
@SetMetadata('resource', Resource.materialTransaction)
@Controller(Resource.materialTransaction)
export class MaterialTransactionController {
  constructor(
    private readonly materialTransactionService: MaterialTransactionService,
    private readonly profileService: ProfileService,
  ) {}

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.materialTransactionService.findAll({
      businessObject: { id: businessObjectId },
    });
  }

  @Post(':businessObjectId')
  async create(
    @Body() dto: CreateMaterialTransactionDto,
    @Param('businessObjectId') businessObjectId: number,
    @Req() req,
  ) {
    const initiator = await this.profileService.findOne({
      where: {
        user: { id: req.user.sub },
      },
    });
    return this.materialTransactionService.add({
      ...dto,
      initiator,
      businessObject: {
        id: +businessObjectId,
      },
    });
  }

  @Post(':businessObjectId/:id')
  async remove(
    @Body() dto: RevertMaterialTransactionDto,
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Req() req,
  ) {
    const initiator = await this.profileService.findOne({
      where: {
        user: { id: req.user.sub },
      },
    });

    return this.materialTransactionService.revert(
      {
        id,
        businessObject: { id: businessObjectId },
      },
      {
        ...dto,
        initiator,
        businessObject: { id: businessObjectId },
      },
    );
  }
}
