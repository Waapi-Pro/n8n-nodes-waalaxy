import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { getCampaigns } from './listSearch/getCampaigns';
import { getProspectLists } from './listSearch/getProspectLists';
import { prospectDescription } from './resources/prospect';

export class Waalaxy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Waalaxy',
		name: 'waalaxy',
		icon: {
			light: 'file:../../icons/logo-api-gradient.svg',
			dark: 'file:../../icons/logo-api-gradient-dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume data from the Waalaxy API',
		defaults: {
			name: 'Waalaxy',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'waalaxyApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://developers.waalaxy.com/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
				],
				default: 'accessToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prospect',
						value: 'prospect',
					},
				],
				default: 'prospect',
			},
			...prospectDescription,
		],
	};

	methods = {
		listSearch: {
			getCampaigns,
			getProspectLists,
		},
	};
}
