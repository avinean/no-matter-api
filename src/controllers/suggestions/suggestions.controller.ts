import { Controller, Get } from '@nestjs/common';
import {
  ContactType,
  MaterialTransactionType,
  Role,
  Sex,
  ProfileRelationshipType,
} from 'src/types/enums';

@Controller('suggestions')
export class SuggestionsController {
  @Get('contact-types')
  getContactTypesSuggestions() {
    return this.getSuggestionsFromEnum(ContactType);
  }

  @Get('material-transaction-types')
  getMaterialTransactionTypesSuggestions() {
    return this.getSuggestionsFromEnum(MaterialTransactionType);
  }

  @Get('roles')
  getRolesSuggestions() {
    return this.getSuggestionsFromEnum(Role);
  }

  @Get('sexes')
  getSexesSuggestions() {
    return this.getSuggestionsFromEnum(Sex);
  }

  @Get('profile-connection-types')
  getProfileRelationshipType() {
    return this.getSuggestionsFromEnum(ProfileRelationshipType);
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
