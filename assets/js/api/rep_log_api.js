function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(res => res.json());
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
