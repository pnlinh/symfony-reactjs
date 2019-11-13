/**
 * Return a Promise object with the rep logs data
 * @returns {Promise<Response>}
 */
export function getRepLogs() {
    return fetch('/reps', {
        credentials: 'same-origin'
    })
        .then(res => res.json().then(data => data.items));
}
