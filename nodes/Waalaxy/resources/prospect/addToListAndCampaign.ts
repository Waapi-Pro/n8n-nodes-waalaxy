import type { INodeProperties } from 'n8n-workflow';
import { campaignSelect, prospectListSelect } from '../../shared/descriptions';

const showOnlyForAddToListAndCampaign = {
	operation: ['addToListAndCampaign'],
	resource: ['prospect'],
};

export const addToListAndCampaignDescription: INodeProperties[] = [
	{
		...prospectListSelect,
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
	{
		...campaignSelect,
		required: false,
		description: 'Optional campaign to add the prospects to',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
	{
		displayName: 'Prospects',
		name: 'prospects',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		required: true,
		description: 'List of prospects to add',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
		options: [
			{
				name: 'prospectValues',
				displayName: 'Prospect',
				values: [
					{
						displayName: 'LinkedIn URL',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'LinkedIn profile URL of the prospect',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'First name of the prospect (optional)',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
						description: 'Last name of the prospect (optional)',
					},
				],
			},
		],
	},
	{
		displayName: 'Move Duplicates to Other List',
		name: 'moveDuplicatesToOtherList',
		type: 'boolean',
		default: false,
		description: 'Whether to move duplicates to the other list',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
	{
		displayName: 'Can Create Duplicates',
		name: 'canCreateDuplicates',
		type: 'boolean',
		default: false,
		description: 'Whether to allow creating duplicate prospects',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
];
