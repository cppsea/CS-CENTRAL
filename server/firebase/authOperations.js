const admin = require('./firebaseConfig');

const newUser = {
    //need to get email and password from frontend
    email: 'user@example.com',
    password: 'securepassword'
}

const createUser = (newUser) =>{
    return admin.auth.createUser(newUser);
};

createUser(newUser)
    .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid)
    })
    .catch((error) => {
        console.error('Error creating new user', error);
    });

const verifyIdToken = (idToken) => {
    return admin.auth().verifyIdToken(idToken);
};

const deleteUser = (uidToDelete) => {
    return admin.auth().deleteUser(uidToDelete);
};

module.exports = {
    createUser,
    verifyIdToken,
    deleteUser,
}