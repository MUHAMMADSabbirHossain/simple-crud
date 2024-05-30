import { useLoaderData } from "react-router-dom";

const User = () => {

    const loadedUser = useLoaderData();
    console.log(loadedUser);

    const handleUpdate = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updatedUser = { name, email }

        fetch(`http://localhost:5000/user/${loadedUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert("User updated successfully.");
                }
            })
    }

    return (
        <div>
            <h3>{`User information of: ${loadedUser.name}`}</h3>

            <form onSubmit={handleUpdate}>
                <input type="text" name="name" id="" defaultValue={loadedUser?.name} />
                <br />
                <input type="email" name="email" id="" defaultValue={loadedUser?.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default User;