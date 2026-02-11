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
		description: `We make LinkedIn outreach f*cking easy. Reach 800+ prospects on LinkedIn every month. Auto-follow up until they reply. No complex setup. 150,000+ professionals (sales reps, founders, recruiters) use Waalaxy to get replies and sign new clients.`,
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
				'x-req-integration-origin': 'n8n',
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
