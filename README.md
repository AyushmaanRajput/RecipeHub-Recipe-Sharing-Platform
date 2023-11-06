# concerned-picture-9849
# RecipeHub

RecipeHub is a user-friendly culinary hub that offers a wealth of features for food enthusiasts of all skill levels. This online platform is designed to inspire, connect, and share the joy of cooking with a community of like-minded individuals.

With RecipeHub, you can explore a diverse array of recipes, save your favorite ones, and create personalized feeds filled with mouthwatering dishes that match your tastes and dietary preferences. The platform makes it easy to connect with fellow foodies through a convenient messaging system, allowing you to exchange cooking tips, recommendations, and ideas in a friendly and engaging environment.

One of the standout features of RecipeHub is its ability to post your own culinary creations, similar to the way you'd share photos on Instagram. You can showcase your cooking prowess by uploading your recipes, complete with mouthwatering images, step-by-step instructions, and ingredient lists. Whether you're a seasoned chef or just starting your culinary journey, RecipeHub is the perfect digital kitchen companion, offering you a place to discover, share, and communicate with a vibrant community of fellow food enthusiasts.

Live : [https://concerned-picture-9849-frontend.vercel.app/]

## Key Features

- **User Registration and Authentication**:
  - Create an easy-to-use registration and login system.
  - Ensure secure account creation and login processes.

- **User Profiles**:
  - Enable users to personalize their profiles with pictures and personal information.

- **Post Creation and Sharing**:
  - Allow users to create, edit, and share posts with text, images, and links.
  - Implement tagging, hashtags, and location tagging features.

- **News Feed**:
  - Develop a dynamic news feed displaying posts from friends and the global recipe feed from the backend.

- **User Interaction**:
  - Include like, comment, and share functionalities to encourage user engagement.

- **Friend Management**:
  - Create features for sending, accepting, or rejecting friend requests.
  - Implement tools to manage friends.

- **Private Messaging**:
  - Set up a messaging system for sending and receiving private messages.

- **Recipe Management**:
  - Utilize backend capabilities for users to create, edit, and share recipes, as well as view recipes from others.

- **Notification System**:
  - Notify users about friend requests, likes, comments, and messages to keep them engaged.

- **User Search**:
  - Implement a search functionality for finding friends and recipes easily.

- **User Settings**:
  - Allow users to customize account settings, privacy settings, and notification preferences.

- **Logout and Account Deletion**:
  - Enable users to log out and delete their accounts when needed.

- **Responsive Design**:
  - Ensure that the UI is responsive and functions well on various devices, including mobile and desktop.

- **Data Security**:
  - Implement security measures to protect user data, including encryption and secure connections.

- **Error Handling**:
  - Provide clear error messages and graceful handling of exceptions to enhance the user experience.

- **Documentation and Help**:
  - Offer user guides or tooltips to assist users in navigating and understanding the platform.

- **Testing and Debugging**:
  - Conduct thorough testing to identify and resolve any issues, bugs, or performance concerns.



## Tech Stack

- Frontend: React.js
- Backend: Node.js
- Database: MongoDB
  <br>![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

# Different Pages of Website






## Backend Application Routes, Endpoints and Usage

- Backend Link :[https://concerned-picture-9849-jcof.onrender.com/]

The backend is built on Node.js.This documentation outlines the available routes and endpoints for the backend application. These routes are responsible for handling various operations, including user authentication, recipe management, user management, and comment handling.
| Route                        | Use Case                               | Access               |
| ----------------------------- | -------------------------------------- | -------------------- |
| **Authentication Routes**    |                                        |                      |
| POST `/auth/signup`          | Create a new user with a profile image | User registration    |
| POST `/auth/login`           | Log in a user                          | User login credentials |
| GET `/auth/logout`           | Log out a user                         | No authentication required |
| **Fetch All Recipes**        |                                        |                      |
| GET `/recipe/feed`           | Retrieve user's feed of recipes       | No authentication required |
| **Private Routes (Authentication Required)** |                                |                      |
| GET `/recipe/getMyRecipe`    | Retrieve user's recipes                | User authentication  |
| GET `/recipe/getSingleRecipe/:id` | Retrieve a single recipe by ID  | User authentication  |
| GET `/recipe/getAllRecipe`   | Retrieve all available recipes         | User authentication  |
| PATCH `/recipe/update/:id`   | Update a recipe by ID                  | User authentication  |
| **User Routes (Authentication Required)** |                              |                      |
| GET `/users/requests`        | Retrieve user friend requests         | User authentication  |
| GET `/users/friends`         | Retrieve user's friends                | User authentication  |
| GET `/users/notfriends`      | Retrieve users who are not friends    | User authentication  |
| GET `/users/:id`             | Retrieve a single user by ID          | User authentication  |
| GET `/users/`                | Retrieve the profile of the logged-in user | User authentication  |
| PATCH `/users/update/:id`    | Update user information by ID         | User authentication  |
| PATCH `/users/addFriend/:id` | Add a friend to the user's friend list | User authentication  |
| DELETE `/users/delete/:id`   | Delete a user by ID                    | User authentication  |
| **Comment Routes**           |                                        |                      |
| GET `/`                      | Retrieve all comments                  | No authentication required |
| POST `/add`                  | Add a new comment to a recipe          | User authentication  |
| PATCH `/update/:id`          | Update a comment by ID                 | User authentication  |
| DELETE `/delete/:id`         | Delete a comment by ID                 | User authentication  |


### Login, Register, and Logout Routes

#### POST `/auth/signup`

- Creates a new user with a profile image.
- Requires user registration information.
- Example usage: `/auth/signup`

#### POST `/auth/login`

- Logs in a user.
- Requires user login credentials.
- Example usage: `/auth/login`

#### GET `/auth/logout`

- Logs out a user.
- No additional parameters are required.
- Example usage: `/auth/logout`

### Fetch All Recipes

#### GET `/recipe/feed`

- Retrieves the user's feed of recipes.
- Example usage: `/recipe/feed`


#### Private Routes (Authentication Required)

#### GET `/recipe/getMyRecipe`

- Retrieves the recipes created by the authenticated user.
- Example usage: `/recipe/getMyRecipe`

#### GET `/recipe/getSingleRecipe/:id`

- Retrieves a single recipe by its ID.
- Requires user authentication.
- Example usage: `/recipe/getSingleRecipe/:id`

#### GET `/recipe/getAllRecipe`

- Retrieves all available recipes.
- Requires user authentication.
- Example usage: `/recipe/getAllRecipe`

#### PATCH `/recipe/update/:id`

- Updates a recipe by its ID.
- Requires user authentication.
- Example usage: `/recipe/update/:id`
  
### User Routes (Authentication Required)

#### GET `/users/requests`

- Retrieves user friend requests.
- Requires user authentication.
- Example usage: `/requests`

#### GET `/users/friends`

- Retrieves the user's friends.
- Requires user authentication.
- Example usage: `/users/friends`

#### GET `/users/notfriends`

- Retrieves users who are not yet friends with the authenticated user.
- Requires user authentication.
- Example usage: `/users/notfriends`

#### GET `/users/:id`

- Retrieves a single user by their ID.
- Requires user authentication.
- Example usage: `/users/:id`

#### GET `/users/`

- Retrieves the profile of the currently logged-in user.
- Requires user authentication.
- Example usage: `/users/`

#### PATCH `/users/update/:id`

- Updates a user's information by their ID.
- Requires user authentication.
- Example usage: `/update/:id`

#### PATCH `/users/addFriend/:id`

- Adds a friend to the authenticated user's friend list.
- Requires user authentication.
- Example usage: `/users/addFriend/:id`

#### DELETE `/users/delete/:id`

- Deletes a user by their ID.
- Requires user authentication.
- Example usage: `/delete/:id`

### Comment Routes

#### GET `/`

- Retrieves all comments.
- No authentication required.
- Example usage: `/`

#### POST `/add`

- Adds a new comment to a recipe.
- Requires user authentication.
- Example usage: `/add`

#### PATCH `/update/:id`

- Updates a comment by its ID.
- Requires user authentication.
- Example usage: `/update/:id`

#### DELETE `/delete/:id`

- Deletes a comment by its ID.
- Requires user authentication.
- Example usage: `/delete/:id`


Please ensure that proper authentication and authorization mechanisms are in place for private routes, as they require user authentication.

## Getting Started

To run RecipeHub locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/recipehub.git`
2. Install dependencies: `npm install`
3. Set up the database and configure environment variables.
4. Start the development frontend-app: `npm start`
5. Start the development server: `npm run server`
# Some sample pictures of our Website
### Home Page
<img width="948" alt="Home Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b01m52i5a9xqgxa0pg7x.png">
<img width="948" alt="Home Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mqd16nnp4xip5kqhyivj.png">
<img width="948" alt="Home Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1jc1g173lgjzotaef23b.png">
<img width="948" alt="Home Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fvk4twvz5okc5dxi6eh4.png">

### Login and Register Pages
<img width="948" alt="Login Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6tswhv6n1yeqgyy08cgv.png">
<img width="948" alt="Register Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuprnumy262g7rb42gw6.png">

### Explore Page
<img width="948" alt="Explore Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/120l1mkq8c6wwc6jd4io.png">
<img width="948" alt="Explore Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pu2o5rjqwli7fkbpgt9p.png">

### Feed Page
<img width="948" alt="Feed Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iv2453qehp2ir903stfs.png">

### Single Post Page
<img width="948" alt="Single Post Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kc56huk0ba1mlackhc1s.png">

### Account Page
<img width="948" alt="Account Page" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/896c1v3u0r881s1qhdh4.png">



## Contributors

RecipeHub is a teamwork project. Meet our awesome teammates:
- Ayushmaan Rajput(team lead) - Email: ayushmaanrajput25feb@gmail.com
- Nishant Singh - Email: nishantkr488@gmail.com
- Ranvijay Tiwari - Email: ranvijaytiwari0000@gmail.com
- Vamshikrishna Bejjarapu - Email: vamshikrishna99089@gmail.com

*Note: This group project was developed in 5 days.*
<br>
-------------------------------Thank You😊-----------------------------------------
