import {Provider} from '@angular/core';
import {HttpGarageRepository} from '../../domain/repositories/http-garage.repository';
import {ApiGarageRepository} from '../repositories/api-garage.repository';
import {HttpConditionRepository} from '../../domain/repositories/http-condition.repository';
import {ApiConditionRepository} from '../repositories/api-condition.repository';

export const infrastructureProviders: Provider[] = [
	{ provide: HttpGarageRepository, useClass: ApiGarageRepository },
	{ provide: HttpConditionRepository, useClass: ApiConditionRepository }
];
