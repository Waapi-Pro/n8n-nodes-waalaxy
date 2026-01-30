import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { waalaxyApiRequest } from '../shared/transport';

type CampaignSearchItem = {
	value: string;
	name: string;
};

type CampaignSearchResponseItem = {
	_id: string;
	name: string;
};

type CampaignSearchResponse = {
	total: number;
	campaigns: CampaignSearchResponseItem[];
};

type RepositorySearchResponse = {
	items: CampaignSearchItem[];
	total_count: number;
};

export async function getCampaigns(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	let response: CampaignSearchResponse = {
		total: 0,
		campaigns: [],
	};
	const responseData: RepositorySearchResponse = {
		items: [],
		total_count: 0,
	};

	try {
		response = await waalaxyApiRequest.call(this, 'GET', 'campaigns/getAll', {});
	} catch {
		// will fail if the owner does not have any repositories
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
