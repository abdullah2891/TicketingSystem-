import fetch from 'fetch';

export default function ajax() {
  return fetch.apply(undefined, arguments).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw response;
  });
}