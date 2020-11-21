import { createConnection, Connection } from 'typeorm'
import { Users } from '../models/User';

// createConnection().then(async connection => {

//     const user = new Users()
//     user.email = "matheus@test.com";
//     user.password = 'senha';

//     await connection.mongoManager.save(user);
//     console.log("Post has been saved: ", user);

//     const loadedPosts = await connection.mongoManager.find(Users);
//     console.log("Loaded posts from the database: ", loadedPosts);

// }).catch(error => console.log("Error: ", error));

let conn: Promise<Connection>;
export function returnConnection(): Promise<Connection> {
    if(!!conn) return conn
    return createConnection()
}