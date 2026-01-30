import type { INodeProperties } from 'n8n-workflow';
import { addToListAndCampaignDescription } from './addToListAndCampaign';

const showOnlyForProspect = {
	resource: ['prospect'],
};

export const prospectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProspect,
		},
		options: [
			{
				name: 'Add to List and Campaign',
				value: 'addToListAndCampaign',
				action: 'Add prospects to list and campaign',
				description: 'Add prospects to a prospect list and optionally to a campaign',
				routing: {
					request: {
						method: 'POST',
						url: 'prospects/addProspectFromIntegration',
					},
					send: {
						type: 'body',
						preSend: [
							async function (this, requestOptions) {
								const prospectList = this.getNodeParameter('prospectList') as { value: string };
								const campaign = this.getNodeParameter('campaign') as { value: string } | undefined;
								const moveDuplicatesToOtherList = this.getNodeParameter(
									'moveDuplicatesToOtherList',
								) as boolean;
								const canCreateDuplicates = this.getNodeParameter('canCreateDuplicates') as boolean;
								const prospectsParam = this.getNodeParameter('prospects') as {
									prospectValues?: Array<{
										url: string;
										firstName?: string;
										lastName?: string;
									}>;
								};

								const prospects = (prospectsParam.prospectValues || []).map((p) => {
									const prospect: {
										url: string;
										customProfile?: { firstName?: string; lastName?: string };
									} = {
										url: p.url,
									};

									if (p.firstName || p.lastName) {
										prospect.customProfile = {
											...(p.firstName && { firstName: p.firstName }),
											...(p.lastName && { lastName: p.lastName }),
										};
									}

									return prospect;
								});

								requestOptions.body = {
									prospects,
									prospectListId: prospectList.value,
									...(campaign?.value && { campaignId: campaign.value }),
									moveDuplicatesToOtherList,
									canCreateDuplicates,
									origin: { name: 'n8n' },
								};

								return requestOptions;
							},
						],
					},
				},
			},
		],
		default: 'addToListAndCampaign',
	},
	...addToListAndCampaignDescription,
];
