// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:4200',
  // API_URL: 'http://192.168.1.117:8091',
   API_URL: "http://192.168.1.50:8086", // new Dev
   backend:"http://localhost:44301",
  //API_URL: 'http://192.168.1.117:8050',  // Harshit sir
  // API_URL: 'http://192.168.1.117:8050',
  // API_URL: 'http://192.168.1.50:8086',
  // API_URL: 'https://emossybackend.moreyeahs.in',
  // local
  // API_URL: 'https://devbackend.emossy.com',// Dev
  // clientId: '16c5d82b-d666-4c09-a093-cb3a994dc6a0',
  // redirectUrl: 'http://localhost:4200',
  // UAT
  clientId: "82deaf2c-374c-489f-b909-17a661fd1348",
  redirectUrl: "https://tsf.moreyeahs.in",
  URL:"https://emossyutilities.emossy.com",
  UtiltyURL:"https://emossyutilities.emossy.com",
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  firebase: {
    apiKey: "AIzaSyAbqzFmIICpccJdV1CziigCPbBINmE2gbA",
    authDomain: "testing-firebase-e02bb.firebaseapp.com",
    projectId: "testing-firebase-e02bb",
    storageBucket: "testing-firebase-e02bb.appspot.com",
    messagingSenderId: "414614663820",
    appId: "1:414614663820:web:c86ee5f86177976ed681a9",
    vapidKey:
      "BD5cZq2AgzewZ6-S0dpH81vZ3Hbgavpg2Zpv5bOLMpGFovbauWC8kUXHReFGhoadEbAa9D3WJz5S2FUxbEZG_GY",
  },
};
