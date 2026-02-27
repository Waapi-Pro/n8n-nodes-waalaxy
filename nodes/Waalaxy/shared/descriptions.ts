import type { INodeProperties } from 'n8n-workflow';

export const campaignSelect: INodeProperties = {
	displayName: 'Add to Existing Campaign',
	name: 'campaign',
	description: 'If a campaign is selected, imported prospects will automatically be added to it.',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	modes: [
		{
			displayName: 'Campaign',
			name: 'list',
			type: 'list',
			placeholder: 'Select a campaign...',
			typeOptions: {
				searchListMethod: 'getCampaigns',
				searchable: false,
				searchFilterRequired: false,
			},
		},
	],
};

export const prospectListSelect: INodeProperties = {
	displayName: 'Prospect List',
	name: 'prospectList',
	description: 'Select the Waalaxy list where your new prospects will be added',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Prospect List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a prospect list...',
			typeOptions: {
				searchListMethod: 'getProspectLists',
				searchable: false,
				searchFilterRequired: false,
			},
		},
	],
};
