import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ContactType,
  MaterialTransactionType,
  Sex,
  ProfileRelationshipType,
} from 'src/types/enums';
import { Action, Resource } from 'src/types/permissions';
import { Role } from 'src/types/roles';

@ApiTags('Suggestion')
@Controller('suggestion')
export class SuggestionsController {
  @Get('contact-types')
  getContactTypesSuggestions() {
    return this.getSuggestionsFromEnum(ContactType);
  }

  @Get('material-transaction-types')
  getMaterialTransactionTypesSuggestions() {
    return this.getSuggestionsFromEnum(MaterialTransactionType);
  }

  @Get('sexes')
  getSexesSuggestions() {
    return this.getSuggestionsFromEnum(Sex);
  }

  @Get('profile-connection-types')
  getProfileRelationshipType() {
    return this.getSuggestionsFromEnum(ProfileRelationshipType);
  }

  @Get('roles')
  getRolesSuggestions() {
    return this.getSuggestionsFromEnum(Role);
  }

  @Get('resources')
  getResourceSuggestions() {
    return this.getSuggestionsFromEnum(Resource);
  }

  @Get('actions')
  getActionSuggestions() {
    return this.getSuggestionsFromEnum(Action);
  }

  private getSuggestionsFromEnum(enumObject: any): any[] {
    const suggestions = [];
    for (const label in enumObject) {
      if (isNaN(parseInt(label, 10))) {
        suggestions.push({ label, value: enumObject[label] });
      }
    }
    return suggestions;
  }
}
