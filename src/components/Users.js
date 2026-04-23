import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "../graphql";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [showItem, setShowItem] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const editId = watch("id");

  if (loading) return <p className="p-5 text-gray-500">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error...</p>;

  const onSubmit = async ({ id, name, email }) => {
    if (id) {
      await updateUser({ variables: { id, name, email } });
    } else {
      await addUser({ variables: { name, email } });
      reset();
      await refetch();
      localStorage.setItem("token", "fake-token-123");
      return navigate("/success");
    }

    reset();
    refetch();
  };

  const handleEdit = (user) => {
    setValue("id", user.id);
    setValue("name", user.name);
    setValue("email", user.email);
  };

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-5">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">GraphQL CRUD App</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-6">
        <input type="hidden" {...register("id")} />
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              className="input-field w-full"
              placeholder="Name"
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="flex-1">
            <input
              className="input-field w-full"
              placeholder="Email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <button onClick={() => setShowItem(!showItem)} className="mb-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
        {showItem ? (
          <><svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path d="M5 12h14" /></svg>Hide</>
        ) : (
          <><svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>Show</>
        )}
      </button>

      {showItem && <table className="w-full bg-white border rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.allUsers.map((user) => (
            <tr key={user.id} className="border-b last:border-0">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(user)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
