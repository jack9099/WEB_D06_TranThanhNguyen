function getDataUserFromGitHub(url) {
    const getData = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            resolve(xhr.responseText);
        };
        xhr.onerror = () => {
            reject(xhr.statusText);
        }
        xhr.send();
    })
    return getData;
}

export { getDataUserFromGitHub };