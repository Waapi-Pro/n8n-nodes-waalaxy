import type { INodeProperties } from 'n8n-workflow';
import { campaignSelect, prospectListSelect } from '../../shared/descriptions';

const showOnlyForAddToListAndCampaign = {
	operation: ['importProspect'],
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
						displayName: 'Birthday Day',
						name: 'birthdayDay',
						type: 'number',
						default: '',
						description: "The day of the month of the prospect's birthday (1-31)",
					},
					{
						displayName: 'Birthday Month',
						name: 'birthdayMonth',
						type: 'number',
						default: '',
						description: "The month of the prospect's birthday (1-12)",
					},
					{
						displayName: 'Company LinkedIn URL',
						name: 'companyLinkedinUrl',
						type: 'string',
						default: '',
						description: "The LinkedIn URL of the prospect's company",
					},
					{
						displayName: 'Company Name',
						name: 'companyName',
						type: 'string',
						default: '',
						description: "The name of the prospect's company",
					},
					{
						displayName: 'Company Website',
						name: 'companyWebsite',
						type: 'string',
						default: '',
						description: "The website of the prospect's company",
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'The email address of the prospect',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'The first name of the prospect you want to import into Waalaxy',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
						description: 'The last name of the prospect you want to import into Waalaxy',
					},
					{
						displayName: 'LinkedIn Url',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'The LinkedIn URL of the prospect you want to import in Waalaxy',
					},
					{
						displayName: 'Occupation',
						name: 'occupation',
						type: 'string',
						default: '',
						description: 'The occupation of the prospect',
					},
					{
						displayName: 'Phone Numbers',
						name: 'phoneNumbers',
						type: 'fixedCollection',
						default: {},
						description: 'Phone numbers of the prospect',
						options: [
							{
								name: 'phoneNumberValues',
								displayName: 'Phone Number',
								values: [
									{
										displayName: 'Number',
										name: 'number',
										type: 'string',
										default: '',
										description: 'The phone number',
									},
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{
												name: 'Mobile',
												value: 'mobile',
											},
											{
												name: 'Work',
												value: 'work',
											},
											{
												name: 'Home',
												value: 'home',
											},
											{
												name: 'Other',
												value: 'other',
											},
										],
										default: 'mobile',
										description: 'The type of phone number',
									},
								],
							},
						],
					},
					{
						displayName: 'Region',
						name: 'region',
						type: 'string',
						default: '',
						description: 'The region/location of the prospect',
					},
				],
			},
		],
	},
	{
		displayName: 'Move Duplicates',
		name: 'moveDuplicatesToOtherList',
		type: 'boolean',
		default: false,
		description:
			'Whether to move duplicates to this list. If the imported prospect already exists in your CRM in another list, enabling this option will move the prospect to the selected list.',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
	{
		displayName: 'Allow Team Duplicates',
		name: 'canCreateDuplicates',
		type: 'boolean',
		default: false,
		description:
			'Whether to allow creating duplicate prospects. If true, even if a member of your team has the same prospect, then the prospect will still be imported.',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
	{
		displayName: 'Add Existing Prospects To Campaign',
		name: 'addDuplicateProspectsToCampaign',
		type: 'boolean',
		default: false,
		description:
			'Whether to add existing prospects to the selected campaign. If enabled, any already existing prospects found in your Waalaxy CRM will also be added to the selected campaign.',
		displayOptions: { show: showOnlyForAddToListAndCampaign },
	},
];
