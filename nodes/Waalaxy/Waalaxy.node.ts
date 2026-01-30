import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { getCampaigns } from './listSearch/getCampaigns';
import { getProspectLists } from './listSearch/getProspectLists';
import { prospectDescription } from './resources/prospect';

export class Waalaxy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Waalaxy',
		name: 'waalaxy',
		icon: { light: 'file:../../icons/waalien.svg', dark: 'file:../../icons/waalien.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume data from the Waalaxy API',
		defaults: {
			name: 'Waalaxy',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
			baseURL: 'https://waalaxy-staging-om-1dde937.zuplo.app/',
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
