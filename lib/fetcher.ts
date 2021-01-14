export default (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());
