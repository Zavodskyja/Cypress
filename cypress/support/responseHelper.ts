export class bookingApi {
    static makeRequest(method, url, body = null, headers = {}) {
      return cy.request({
        method: method,
        url: url,
        body: body,
        headers: headers,
      });
    }
  
    static get(url, headers = {}) {
      return this.makeRequest('GET', url, null, headers);
    }
  
    static post(url, body, headers = {}) {
      return this.makeRequest('POST', url, body, headers);
    }
  
    static put(url, body, headers = {}) {
      return this.makeRequest('PUT', url, body, headers);
    }
  
    static delete(url, headers = {}) {
      return this.makeRequest('DELETE', url, null, headers);
    }
  }
  
  export default bookingApi;