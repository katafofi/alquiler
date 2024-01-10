const URL = "http://localhost:";
const PORT = "3003";

export const handleDeleteById = async (id, form) => {
  try {
    const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
      method: "DELETE",
    });
    const data = response.json()
    return data
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteM = async (ids, form) => {
  try {
    const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });
    const data = response.json()
    return data
  } catch (error) {
    console.log(error);
  }
};

