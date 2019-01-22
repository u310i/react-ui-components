const list = [
  {
    name: 'envelope',
    viewBox: [0, 0, 40, 26],
    path:
      'M 22.8196 15.7456C 22.0005 16.5862 20.9038 17.0508 19.7317 17.0542C 18.5632 17.0444 17.46 16.5994 16.6362 15.7646L 1.09009 0L 38.1626 0L 22.8196 15.7456ZM 0 1.06567L 11.2952 12.5818L 0 24.1392L 0 1.06567ZM 27.9519 12.623L 39.2878 24.1233L 39.2878 1.06567L 27.9519 12.623ZM 23.7844 16.9265L 27.0105 13.6885L 38.1833 25.082L 1.10547 25.082L 12.4006 13.6885L 15.6772 16.9512C 16.7539 18.0415 18.1877 18.6418 19.7185 18.6418L 19.7363 18.6418C 21.2734 18.6375 22.7109 18.0281 23.7844 16.9265Z',
    tag: null
  },
  {
    name: 'message',
    viewBox: [0, 0, 38, 34],
    path:
      'M19.0675 0C8.5371 0 0 7.092 0 15.8401c0 5.5527 3.4417 10.4345 8.6471 13.2632.0083.0091.0221.0182.0434.0277.8433.3798.41 1.6817-.5651 2.8751-.742.9083-2.1668 1.8444-1.6251 1.8444.8667 0 2.7535-.4018 3.94-1.0597 1.7586-.9752 2.9897-1.8141 4.5758-1.469l-.0013-.0035a22.867 22.867 0 0 0 4.0527.3619c10.5309 0 19.0676-7.0916 19.0676-15.8401C38.1351 7.0921 29.5984 0 19.0675 0z',
    tag: null
  },
  {
    name: 'bird',
    viewBox: [0, 0, 512, 512],
    path: null,
    tag: `
  <g fill="#77433f">
    <path d="M339.324 512a7.499 7.499 0 0 1-7.5-7.5v-71.717c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5V504.5c0 4.143-3.357 7.5-7.5 7.5zM303.305 512a7.499 7.499 0 0 1-7.5-7.5v-78.49c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v78.49a7.5 7.5 0 0 1-7.5 7.5z" />
  </g>
  <path
    d="M193.342 229.141v41.166h-9.024s-29.271 2.413-45.718 13.192c-1.359.89-3.153-.114-3.09-1.737.301-7.66 2.204-24.144 12.762-30.309a1.996 1.996 0 0 0 .001-3.458c-10.558-6.169-12.462-22.653-12.762-30.314-.064-1.623 1.731-2.628 3.09-1.737 16.448 10.784 45.718 13.197 45.718 13.197h9.023z"
    fill="#fac55a"
  />
  <path
    d="M480.906 300.135c2.917-.688 5.574 1.835 5.02 4.771-5.173 27.455-32.75 135.377-146.602 135.377-181.403 0-155.344-211.978-154.477-225.651 1.987-31.353 25.616-56.849 57.175-56.69 31.42.159 56.42 26.175 56.589 57.49.655 121.022 150.129 92.289 182.295 84.703z"
    fill="#34b2cc"
  />
  <g fill="#2e9eb5">
    <path d="M267.376 211.826c.393 72.622 54.372 91.311 104.436 93.012-38.967-8.214-72.889-31.894-73.2-89.406-.17-31.314-25.17-57.331-56.589-57.489a56.328 56.328 0 0 0-9.739.806c20.6 8.713 34.963 29.372 35.092 53.077zM480.906 300.135c-5.753 1.357-15.273 3.389-27.01 5.121-6.896 32.535-36.82 131.421-145.808 131.421-2.67 0-5.292-.049-7.873-.14 11.826 2.429 24.823 3.745 39.109 3.745 113.853 0 141.429-107.922 146.602-135.377.554-2.936-2.103-5.458-5.02-4.77z" />
  </g>
  <path
    d="M426.149 356.921c10.101.958 15.666 12.167 10.3 20.75-17.735 28.361-58.761 75.403-128.477 56.76-6.995-1.871-27.995-6.113-43.367-19.459-15.858-14.225-23.314-36.609-17.407-58.549 8.383-31.139 40.507-49.602 71.75-41.248 6.346 1.697 24.114 14.153 27.94 16.869 23.746 16.934 57.667 22.83 79.261 24.877z"
    fill="#fac55a"
  />
  <path
    d="M368.6 1.763c25.946 8.351 32.101 34.099 32.101 34.099s20.103-17.296 46.049-8.945c23.132 7.446 31.916 34.672 23.578 60.404-9.545 29.457-42.078 57.41-106.975 70.084a4.025 4.025 0 0 1-3.689-1.189c-45.199-48.109-55.182-89.745-45.637-119.202 8.338-25.733 31.44-42.696 54.573-35.251z"
    fill="#dc527c"
  />
  <path
    d="M446.75 26.917c-6.223-2.003-12.103-2.521-17.457-2.165 12.743 11.849 16.54 32.629 10.093 52.525-8.716 26.898-36.608 52.539-90.798 66.44a283.177 283.177 0 0 0 11.078 12.5 4.019 4.019 0 0 0 3.686 1.188c64.898-12.673 97.431-40.627 106.976-70.084 8.338-25.732-.445-52.958-23.578-60.404z"
    fill="#bf476c"
  />
  <path
    d="M42.4 58.187c19.49-9.941 37.654 1.195 37.654 1.195s1.561-21.198 21.051-31.139c17.377-8.863 37.875 1.625 47.801 20.955 11.331 22.066 8.829 56.218-20.565 99.963a4.022 4.022 0 0 1-3.46 1.768c-52.796-1.823-82.055-19.776-93.386-41.843C21.57 89.756 25.023 67.05 42.4 58.187z"
    fill="#dc527c"
  />
  <path
    d="M148.906 49.198c-9.926-19.329-30.424-29.818-47.801-20.955A37.219 37.219 0 0 0 88.102 39.18c13.182.605 26.056 9.991 33.3 24.097 10.146 19.759 9.187 49.213-12.226 86.563 4.99.525 10.217.897 15.707 1.088a4.016 4.016 0 0 0 3.458-1.767c29.394-43.745 31.895-77.897 20.565-99.963z"
    fill="#bf476c"
  />
  <path
    d="M204.187 2.888c15.131-.945 23.578 11.128 23.578 11.128S234.633.986 249.764.041c13.491-.843 23.599 11.462 24.543 26.469 1.071 17.024-9.841 37.866-40.196 57.441a3.995 3.995 0 0 1-3.878.243c-32.57-15.644-46.008-34.965-47.079-51.989-.945-15.008 7.542-28.474 21.033-29.317z"
    fill="#34b2cc"
  />
  <path
    d="M274.306 26.51C273.362 11.503 263.254-.801 249.763.041c-7.664.479-13.205 4.058-16.81 7.473 5.95 4.797 9.843 12.847 10.411 21.881.891 14.17-6.524 30.983-26.536 47.511 4.055 2.498 8.51 4.935 13.405 7.287a3.991 3.991 0 0 0 3.876-.243c30.356-19.574 41.268-40.416 40.197-57.44z"
    fill="#2e9eb5"
  />
  <g fill="#f0a835">
    <path d="M385.029 382.213c-63.503 0-94.849-29.895-96.285-31.3a7.5 7.5 0 0 1 10.472-10.74c.42.401 35.322 33.064 105.717 26.025a7.486 7.486 0 0 1 8.209 6.717 7.5 7.5 0 0 1-6.717 8.209 215.209 215.209 0 0 1-21.396 1.089zM352.086 408.822c-45.515 0-76.784-19.514-78.482-20.597a7.5 7.5 0 0 1-2.29-10.356 7.5 7.5 0 0 1 10.35-2.295c.749.471 49.967 30.769 112.427 12.022a7.505 7.505 0 0 1 9.34 5.027 7.502 7.502 0 0 1-5.027 9.34c-16.514 4.957-32.113 6.859-46.318 6.859z" />
  </g>
  <ellipse cx="231.94" cy="213.66" rx="7.735" ry="7.726" fill="#77433f" />
    `
  }
];

export default { list: list, type: 'user' };
