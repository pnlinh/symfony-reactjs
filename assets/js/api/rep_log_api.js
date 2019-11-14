function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(res => {
            return res.text()
                .then(text => text ? JSON.parse(text) : '');
        });
}

/**
 * Return a Promise object with the rep logs data
 * @returns {Promise<Response>}
 */
export function getRepLogs() {
    return fetchJson('reps')
        .then(data => data.items);
}

export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {method: 'DELETE'});
}

export function createRepLog(repLog) {
    return fetchJson('reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
