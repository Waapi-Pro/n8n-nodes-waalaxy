import type {
	IAuthenticate,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WaalaxyApi implements ICredentialType {
	name = 'waalaxyApi';

	displayName = 'Waalaxy API';

	icon: Icon = { light: 'file:../icons/waalien.svg', dark: 'file:../icons/waalien.dark.svg' };

	documentationUrl = 'https://docs.waalaxy.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
				'x-req-integration-origin': 'n8n',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://developers.waalaxy.com/',
			url: 'integrations/test',
			method: 'GET',
		},
	};
}
