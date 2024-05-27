const Users = () => {

    function handleUserCreate(event) {
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
            })
    }
    return (
        <div>
            <h1>Users</h1>

            <form onSubmit={handleUserCreate}>
                <input type="text" name="name" id="" placeholder="Name" />
                <input type="email" name="email" id="" placeholder="Email" />
                <input type="submit" value="Create User" />
            </form>
        </div>
    );
};

export default Users;