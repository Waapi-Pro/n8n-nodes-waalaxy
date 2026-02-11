import { JsonObject, NodeApiError, type INodeProperties } from 'n8n-workflow';
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
				name: 'Import',
				value: 'importProspect',
				action: 'Import',
				description: 'Import a prospect in the Waalaxy CRM',
				routing: {
					request: {
						method: 'POST',
						url: 'prospects/addProspectFromIntegration',
						ignoreHttpStatusErrors: true, // Permet d'intercepter les erreurs dans postReceive
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
										gender?: 'male' | 'female' | 'undetermined';
										headline?: string;
										occupation?: string;
										email?: string;
										phoneNumbers?: {
											phoneNumberValues?: Array<{
												number?: string;
												type?: string;
											}>;
										};
										region?: string;
										birthdayDay?: number;
										birthdayMonth?: number;
										companyName?: string;
										companyLinkedinUrl?: string;
										companyWebsite?: string;
									}>;
								};

								const prospects = (prospectsParam.prospectValues || []).map((p) => {
									const prospect: {
										url: string;
										customProfile?: {
											firstName?: string;
											lastName?: string;
											gender?: 'male' | 'female' | 'undetermined';
											headline?: string;
											occupation?: string;
											email?: string;
											phoneNumbers?: Array<{ number?: string; type?: string }>;
											region?: string;
											birthday?: { day?: number; month?: number };
											company?: { name?: string; linkedinUrl?: string; website?: string };
										};
									} = {
										url: p.url,
									};

									const customProfile: typeof prospect.customProfile = {};

									if (p.firstName) customProfile.firstName = p.firstName;
									if (p.lastName) customProfile.lastName = p.lastName;
									if (p.gender) customProfile.gender = p.gender;
									if (p.headline) customProfile.headline = p.headline;
									if (p.occupation) customProfile.occupation = p.occupation;
									if (p.email) customProfile.email = p.email;
									if (p.region) customProfile.region = p.region;

									// Handle phone numbers
									const phoneNumberValues = p.phoneNumbers?.phoneNumberValues;
									if (phoneNumberValues && phoneNumberValues.length > 0) {
										customProfile.phoneNumbers = phoneNumberValues
											.filter((pn) => pn.number)
											.map((pn) => ({ number: pn.number, type: pn.type }));
									}

									// Handle birthday
									if (p.birthdayDay || p.birthdayMonth) {
										customProfile.birthday = {
											...(p.birthdayDay && { day: p.birthdayDay }),
											...(p.birthdayMonth && { month: p.birthdayMonth }),
										};
									}

									// Handle company
									if (p.companyName || p.companyLinkedinUrl || p.companyWebsite) {
										customProfile.company = {
											...(p.companyName && { name: p.companyName }),
											...(p.companyLinkedinUrl && { linkedinUrl: p.companyLinkedinUrl }),
											...(p.companyWebsite && { website: p.companyWebsite }),
										};
									}

									if (Object.keys(customProfile).length > 0) {
										prospect.customProfile = customProfile;
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
					output: {
						postReceive: [
							async function (this, items, responseData) {
								const statusCode = responseData.statusCode;

								if (statusCode >= 400) {
									const errorBody = (items[0]?.json || {}) as JsonObject;

									let message =
										'title' in errorBody
											? (errorBody.title as string)
											: (errorBody.message as string);

									if ('code' in errorBody && errorBody.code === 'M000401-001') {
										message = "User doesn't have permissions. Should upgrade plan.";
									}
									if ('code' in errorBody && errorBody.code === 'R000404-002') {
										message = 'Prospect List could not be found.';
									}

									throw new NodeApiError(this.getNode(), errorBody, {
										message: message,
										httpCode: String(statusCode),
									});
								}

								return items;
							},
						],
					},
				},
			},
		],
		default: 'importProspect',
	},
	...addToListAndCampaignDescription,
];
