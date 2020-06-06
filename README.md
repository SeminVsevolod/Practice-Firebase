# Quasar App

# Exercise 4. Practice Firebase

✔ 1) Create a new Firebase project called "Foods" and enable Email / Password authentication within Firebase

✔ 2) Add the Firebase package to the project and create a boot file which makes the auth and database API's available within your app. Hint: you'll need to register a web app on Firebase

✔ 3) Create an auth Vuex store file with empty state, mutations, actions & getters objects and import the Firebase Auth API

✔ 4) Add the ability to register a user

✔ 5) Add the ability to login a user

✔ 6) Hide the Login button when the user is logged in

✔ 7) Add a Logout button which only displays when the user is logged in. Log the user out when this is clicked

✔ 8) Redirect the user to appropriate pages when they log in or log out

✔ 9) Prevent the user from reaching the Foods page when not logged in

✔ 10) Add some data for one of your users to the Realtime Database, based on the data in store-foods.js

✔ 11) Add the ability to read the current user's food data from Firebase and display it within the app - whenever a food item is added, updated or deleted within Firebase

✔ 12) Add the ability to write data to Firebase whenever a food item is added, updated or deleted within the app

how it works:
![G4fxLj3D3m](https://user-images.githubusercontent.com/35951053/83946944-ab04f180-a81c-11ea-8d88-ca2ac9e8cbf1.gif)

✔ 13) Ensure that multiple users can log in and log out without seeing another user's data in the app

how it works:
![heC64yLIy3](https://user-images.githubusercontent.com/35951053/83947140-e6ec8680-a81d-11ea-864c-023fdd1c449c.gif)

✔ 14) Add database rules to Firebase to ensure that each user can only read or write to their own data

✔ 15) Display a nice error notification whenever there is an auth or database error

✔ 16) Display the logged in user's email address within the logout button, e.g "Logout test@test.com"
