import axios from 'axios';

type TConfig = {
  url: string;
  data?: any;
  headers?: Record<string, string>;
};

export default class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_SERVER,
    public fetchingService = axios,
    public apiVersion = 'api'
  ) {}

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): Record<string, string> {
    const token = localStorage.getItem('token');
    if (token === null) return {};
    return {
      Authorization: token
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: TConfig) {
    return configWithoutDataAndUrl;
  }

  private setAuthHeaders(withAuth: boolean, config: TConfig) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
  }

  get(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }

  post(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  put(config: TConfig, withAuth = true) {
 this.setAuthHeaders(withAuth, config);
    return this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}
