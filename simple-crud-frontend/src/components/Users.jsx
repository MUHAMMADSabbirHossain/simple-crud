import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    console.log(users);

    function handleCreateUser(event) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const user = { name, email }
        console.log(user);

        fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged === true) {
                    alert("User is successfully created");

                    user._id = data.insertedId;
                    // display new users
                    const newUsers = [...users, user];
                    setUsers(newUsers);
                    // clear form
                    event.target.reset();
                }
            })
    }

    function handleDeleteUser(id) {
        console.log(id);

        // delete user
        fetch(`http://localhost:5000/user/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.deletedCount === 1) {
                    alert("Successfully deleted");

                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                } else {
                    alert("No documents matched the query. Deleted 0 documents.");
                }
            })
    }

    return (
        <div>
            <h1>{`Users: ${users.length}`}</h1>

            <section>
                <form onSubmit={handleCreateUser}>
                    <input type="text" name="name" id="" placeholder="Name" />
                    <input type="email" name="email" id="" placeholder="Email" />
                    <input type="submit" value="Create User" />
                </form>
            </section>

            <section>
                {
                    users.map(user => <div
                        key={user._id}>
                        <p>
                            {`${user.name} | ${user.email} [${user._id}]`} <button onClick={() => handleDeleteUser(user._id)}>X</button>
                        </p>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Users;