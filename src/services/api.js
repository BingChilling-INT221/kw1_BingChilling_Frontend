export const fetched_api = async (role, category, mode, page, pageSize) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  console.log("fetched_api");
  try {
    const selectCategory = () => {
      return category !== "" ? `&category=${category}` : "";
    };
    const modeFetch = () => {
      if (role === "admin") {
        return "";
      }
      return mode !== "" ? `&mode=${mode}` : "";
    };
    console.log(accesstoken);
    return await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`,
      {
        headers: {
          Authorization: `${accesstoken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
    // window.location.reload();
  }
};

export const fetchCate = async () => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  try {
    console.log(accesstoken);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
      headers: {
        Authorization: `${accesstoken}`,
      },
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (err) {
    throw err;
  }
};

export const fetchCountParam = async (route, count) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}announcements/${route}?count=${count}`,
    {
      headers: {
        Authorization: `${accesstoken}`,
      },
    }
  );
};

export const fetchCateForMod = async () => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
    headers: {
      Authorization: `${accesstoken}`,
    },
  });
};

export const fetchCreate = async (sendPackage) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}announcements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendPackage),
  });
};

export const fetchCreateUser = async (sendPackage) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendPackage),
  });
};

export const fetchUpdate = async (sendPackage, route) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendPackage),
    }
  );
};

export const fetchUpdateUser = async (sendPackage, route) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}users/${route.params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendPackage),
    }
  );
};

export const fetchShowEdit = async (route) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}announcements/${route}`);
};

export const fetchDelete = async (id) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}announcements/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchDeleteUser = async (id) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchUser = async () => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
    headers: {
      Authorization: `${accesstoken}`,
    },
  });
};

export const fetchUserEdit = async (route) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}users/${route}`, {
    headers: {
      Authorization: `${accesstoken}`,
    },
  });
};

export const fetchMatch = async (sendData) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}users/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
};
export const fetchCreateToken = async (sendData) => {
  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  return await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
};
// export default fetched_api;
