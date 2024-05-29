import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    const [updatedUser, setUpdatedUser] = useState({});

    console.log(users);

    function handleCreateUser(event) {
        event.preventDefault();

        // const form = new FormData(event.currentTarget);
        // const name = form.get("name");
        // const email = form.get("email");


        const name = event.target.name.value;
        const email = event.target.email.value;
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
                    const newUsers = [user, ...users];
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

    // update user
    function handleUserUpdateForm(event) {
        event.preventDefault();

        // const form = new FormData(event.currentTarget);
        // const name = form.get("name");
        // const email = form.get("email");

        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email }
        console.log(user);

        fetch(`http://localhost:5000/user/${updatedUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged === true) {
                    alert(`${user.name} is update successfully`);

                    const preUpdatedUsers = users.filter(user => user._id !== updatedUser._id)
                    user._id = updatedUser._id;
                    const newUpdatedUsers = [user, ...preUpdatedUsers]
                    setUsers(newUpdatedUsers);

                    // clear form
                    // const temp = { name: "", email: "" }
                    setUpdatedUser({});
                    event.target.defaultValue.reset();
                } else {
                    alert(`${user.name} doesn't update successfully`);
                }
            })

    }

    function handleUserUpdate(id) {
        console.log(id);

        fetch(`http://localhost:5000/user/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdatedUser(data);
                console.log("updatedUser: ", updatedUser);
            })
    }

    return (
        <div>
            <h1>{`Users: ${users.length}`}</h1>

            {/* create user form */}
            <section>
                <form onSubmit={handleCreateUser}>
                    <input type="text" name="name" id="" placeholder="Name" />
                    <input type="email" name="email" id="" placeholder="Email" />
                    <input type="submit" value="Create User" />
                </form>
            </section>

            {/* update user form */}
            <section>
                <form onSubmit={handleUserUpdateForm}>
                    <input type="text" name="name" id="" defaultValue={updatedUser?.name} />
                    <input type="email" name="email" id="" defaultValue={updatedUser?.email} />
                    <input type="submit" value="Update User" />
                </form>
            </section>

            {/* display usera */}
            <section>
                {
                    users.map(user => <div
                        key={user._id}>
                        <p>
                            {`${user.name} | ${user.email} [${user._id}]`}
                            <button onClick={() => handleUserUpdate(user._id)}>update</button>
                            <button onClick={() => handleDeleteUser(user._id)}>X</button>
                        </p>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Users;