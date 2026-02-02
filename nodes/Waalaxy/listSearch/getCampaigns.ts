import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { waalaxyApiRequest } from '../shared/transport';

type CampaignSearchResponseItem = {
	_id: string;
	name: string;
};

type CampaignSearchResponse = {
	total: number;
	campaigns: CampaignSearchResponseItem[];
};

type CampaignSearchItem = {
	value: string;
	name: string;
};

type CampaignSearchOptions = {
	items: CampaignSearchItem[];
	total_count: number;
};

export async function getCampaigns(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	let response: CampaignSearchResponse = {
		total: 0,
		campaigns: [],
	};
	const responseData: CampaignSearchOptions = {
		items: [],
		total_count: 0,
	};

	try {
		response = await waalaxyApiRequest.call(this, 'GET', 'campaigns/getAll', {});
	} catch {
		// do nothing
	}
	responseData.total_count = response.total;
	response.campaigns.forEach((item: CampaignSearchResponseItem) => {
		responseData.items.push({
			name: item.name,
			value: item._id,
		});
	});

	return { results: responseData.items };
}
