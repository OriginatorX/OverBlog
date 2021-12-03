// For server requests
export function request(URL, method = 'GET', body = null, headers = {}) {
    return new Promise((resolve, reject) => {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }
        fetch(URL, {method, body, headers})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Response is non-valid');
                }
                response.json()
                    .then(data => 
                        resolve(data)
                    );
            })
            .catch(error => reject(error)); 
    });
}
