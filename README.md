# Todos App
Todos app written with Vue, Vuetify and Firebase.

## Usage
Create `./firebase.creds.js`, fill in your creds there and export it (it's `import`ed by `./firebase.js`). It should look something like this:
```js
export const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: ""
}
```

Finally install the deps and spin up the dev server: 
```sh
yarn && yarn dev
```
		