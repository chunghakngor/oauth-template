# Basic Template for OAuth using Express/MongoDB/PassportJS

## Project is currently still under development
### Being rebuilt from previous project!!

### Requirements
```
ejs
dotenv
body-parser
mongoose
express
express-session
passport
passport-local
passport-local-mongoose
```

.ENV Template
```
MONGO_CONNECTION: <mongodb connection string>
MONGO_PASSWORD: <mongodb password>
AUTH_SECRET: <secret used for the session>
```

### To-do List:
- [ ] Remove EJS Engine
- [ ] Removal of Mongoose Requirement
- [ ] Change to RESTful implementation
- [ ] Rewrite middlewear function to check AUTH
- [ ] Update to BCrypt with JWT implementation instead of PassportJS
- [ ] Support for SQL Database

