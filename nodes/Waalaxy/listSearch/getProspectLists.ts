import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { waalaxyApiRequest } from '../shared/transport';

type ProspectListSearchItem = {
	value: string;
	name: string;
};

type ProspectListSearchResponseItem = {
	_id: string;
	name: string;
};

type ProspectListSearchResponse = ProspectListSearchResponseItem[];

type ProspectListSearch = {
	items: ProspectListSearchItem[];
	total_count: number;
};

export async function getProspectLists(
	this: ILoadOptionsFunctions,
): Promise<INodeListSearchResult> {
	const responseData: ProspectListSearch = {
		items: [],
		total_count: 0,
	};

	let result: ProspectListSearchResponse = [];

	result = await waalaxyApiRequest.call(this, 'GET', 'prospectLists/getProspectLists', {});

	responseData.total_count = result.length;
	result.forEach((item: ProspectListSearchResponseItem) => {
		responseData.items.push({
			name: item.name,
			value: item._id,
		});
	});

	return { results: responseData.items };
}
