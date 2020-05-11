| End Point Name              | Method     | Category                                    | EndPoint                                           | Description                                   |
| --------------------------- | ---------- | ------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| Register User               | **POST**   | Users                                       | `/api/v1/auth/signup`                              | This registers a users to the system          |
| Login User                  | **POST**   | Users                                       | `/api/v1/auth/sigin`                               | This signs in a user to the system            |
| Sign out                    | **POST**   | Users                                       | `/api/v1/auth/signout`                             | Logs out signed in user                       |
| Social login/ Sign up       | **GET**    | Users                                       | `api/v1/auth/facebook`                             | Log in and sign up user via facebook account  |
| Social login/ Sign up       | **GET**    | Users                                       | `api/v1/auth/google`                               | Log in and sign up user via facebook account  |
| Checks user token           | **GET**    | Users                                       | `api/v1/auth/check-user`                           | Checks user token                             |
| Verify User                 | **PATCH**  | Users                                       | `/api/v1/auth/verify?token=`                       | User verify account                           |
| Forgot password             | **POST**   | Users                                       | `api/v1/auth/forgot-password`                      | if user forget password                       |
| Resets password             | **PUT**    | `api/v1/auth/reset-password/:userId/:token` | rests user password                                |
| Update User Role            | **PUT**    | Users                                       | `/api/v1/auth/update-role`                         | Manager can update user roles                 |
| Adds accommodation supplier | **POST**   | Users                                       | `/api/v1/auth/add-user`                            | Admin can add accommodation supplier          |
| Email Preferences           | **PATCH**  | Users                                       | `/api/v1/auth/email-preferences`                   | Change email notification preferences         |
| Unsubscribe                 | **PATCH**  | Users                                       | `/api/v1/auth/unsubscribe`                         | Unsubscribe from email notifications          |
| Get UserProfile             | **GET**    | Users                                       | `/api/v1/profile/`                                 | Gets the user profile                         |
| Update UserProfile          | **PATCH**  | Users                                       | `/api/v1/profile`                                  | Updates user profile                          |
| One Way Request             | **POST**   | Requests                                    | `/api/v1/requests/oneway`                          | Creates a oneway request                      |
| Return Request              | **POST**   | Requests                                    | `/api/v1/requests/oneway`                          | Creates a oneway request                      |
| Multicity Request           | **POST**   | Requests                                    | `/api/v1/requests/multi_city`                      | Creates a oneway request                      |
| Pending Requests            | **GET**    | Requests                                    | `/api/v1/requests/`                                | Manager get all pending requests              |
| Search Requests             | **GET**    | Requests                                    | `/api/v1/requests?{params}`                        | Users can search through requests             |
| Approve Request             | **PATCH**  | Requests                                    | `/api/v1/requests/approve/{id}`                    | Manager Approve request using Request Id      |
| Reject Request              | **PATCH**  | Requests                                    | `/api/v1/requests/reject/{id}`                     | Manager Reject request using Request Id       |
| Get one request             | **GET**    | Requests                                    | `/api/v1/requests/{id}`                            | Manager and request owner can get it by id    |
| All accommodations          | **GET**    | Accommodations                              | `/api/v1/accommodations`                           | Get all accommodations                        |
| Accommodation by ID         | **GET**    | Accommodations                              | `/api/v1/accommodations/{id}`                      | Get accommodation by ID                       |
| Add accommodation           | **POST**   | Accommodations                              | `/api/v1/accommodations`                           | Create accommodation                          |
| Rate accommodation          | **POST**   | Accommodations                              | `/api/v1/accommodations/{id}/ratings`              | Rate an accommodation                         |
| Review accommodation        | **POST**   | Accommodations                              | `/api/v1/accommodations/{id}/feedback`             | Add feedback to an accommodation              |
| Review accommodation        | **GET**    | Accommodations                              | `/api/v1/accommodations/{id}/feedback`             | Get feedback for an accommodation             |
| Like/Unlike                 | **PATCH**  | Accommodations                              | `/api/v1/accommodations/{id}/like`                 | User to like/unlike accommodation             |
| Add Room                    | **POST**   | Accommodations                              | `/api/v1/accommodations/createroom`                | Travel Admin to add rooms to an accommodation |
| Get all rooms               | **GET**    | Accommodations                              | `/api/v1/accommodations/getallrooms`               | Get all rooms for all accommodation           |
| Get all rooms               | **GET**    | Accommodations                              | `/api/v1/accommodations/getrooms?accommodationid=` | Get all rooms for an accommodation            |
| Update Room                 | **PATCH**  | Accommodations                              | `/api/v1/accommodations/rooms/{id}`                | Update details of a accommodation's room      |
| Add comment                 | **POST**   | Comments                                    | `/api/v1/request/{id}/comment`                     | User can comment on Requests by Id            |
| Requests Comments           | **GET**    | Comments                                    | `/api/v1/request/{id}/comment`                     | User get all comments they added to requests  |
| Update comment              | **PATCH**  | Comments                                    | `/api/v1/requests/comments/{id}`                   | User update comment by Id                     |
| Delete comment              | **DELETE** | Comments                                    | `/api/v1/requests/comments/{id}`                   | User delete comment by Id                     |

This is just a schema of what it will look like, and actually, these are not all the endpoints
