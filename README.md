# E Learning Platform
![Image of Yaktocat](https://i.imgur.com/ztLtPUU.png)
## Built With

* NodeJs, Express
* MongoDB
* Vue & Vuetify

## Features
* Users authentication,
* Users roles and permissions,
* CRUD func for bootcamps with photo upload,
* Create courses for bootcamps (crud)


### Installing

Navigate to the root folder and run

```
npm install
```

Navigate to /client and run

```
npm install
```

Create a ````config.env```` file in the ````config```` folder. Specify the following proprieties:


````
JWT_SECRET=
JWT_EXPIRE=
MONGO_URI=
GEOCODER_PROVIDER=
GEOCODER_API_KEY=
IMAGE_UPLOAD_PATH= ./uploads/images/
PDF_UPLOAD_PATH= ./uploads/documents/
JWT_COOKIE_EXPIRE=
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=
FROM_NAME=E-learning API
````


